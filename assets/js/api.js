// get api data from https://data.kemkes.go.id/
var USERNAME = 'covid19'
var PASSWORD = 'Covid19%'
var url="https://data.kemkes.go.id/data/api/analytics.json?";
var colorConfirmed="#76cc8d";var colorRecovered="#2f7ed8";var colorDie="#d43f2f"; var colorTrend="#702870"; var colorActive="#fffc40";

    $(document).ready(function() { 
        boxData();
        chartConfirmed(); 
        // $.when(chartConfirmed()).done(function() {
        //     $(".chart-slider").slick({
        //         dots: false,
        //         arrows:true,
        //         speed: 1000,
        //     });
        // })
    });
    function boxData(){
        var urlChart= url + "dimension=dx:SlMC7W5vVRw;TAqRuO1R1eI;U7BaEXUa1Ii;UEBmmFH8OzT&dimension=pe:THIS_YEAR&filter=ou:amZZzlibrMp&skipData=false&skipMeta=false&includeNumDen=false&displayProperty=SHORTNAME";
        $.ajax({ 
            url: urlChart,
            async: true,
            type:'GET',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic "+btoa(USERNAME+':'+PASSWORD));
            },
            success: function(data) {
                document.getElementById("positif-count").innerHTML = data.rows[2][2].toLocaleString("id-ID",{style:'integer'} );
                document.getElementById("sembuh-count").innerHTML = data.rows[3][2].toLocaleString("id-ID",{style:'integer'} );
                document.getElementById("mati-count").innerHTML = data.rows[1][2].toLocaleString("id-ID",{style:'integer'} );
            },
            error: function(err) {
                    cache: false
                    console.log (err);
            }
        })    
    }

    function chartConfirmed(){
        var urlChart= url + "dimension=dx:U7BaEXUa1Ii&dimension=pe:LAST_14_DAYS;TODAY&filter=ou:amZZzlibrMp&skipData=false&skipMeta=true&includeNumDen=false&displayProperty=SHORTNAME";
        $.ajax({ 
            url: urlChart,
            async: true,
            type:'GET',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic "+btoa(USERNAME+':'+PASSWORD));
            },
            success: function(data) {
                var pe=[]; var val1=[];cumulativeData = [0];
                for (var i=0, len=data.rows.length; i<len; i++) {
                    pe[i]=data.rows[i][1].slice(0,4) + "-" +  data.rows[i][1].slice(4,-2) + "-" + data.rows[i][1].slice(6) ;
                    val1[i]=parseInt(data.rows[i][2]);
                }

                val1.forEach(function(elementToAdd, index) {
                        var newElement = cumulativeData[index] + elementToAdd;
                        cumulativeData.push(newElement);
                });
                
                cumulativeData.shift();
                //highchart
                Highcharts.chart('container_confirmed', {
                    title: { style: {color: '#fff'},text: 'Konfirmasi' },
                    xAxis: {
                        min:0,
                        title: { style: {color: '#fff'},text: 'Periode' },                        
                        categories: pe,
                        labels:{style: {color: '#fff'}},
                    },
                    yAxis: {
                        min: 0,
                        title: { style: {color: '#fff'},text: 'Kasus' },
                        labels: {style: {color: '#fff'},}
                    },
                    exporting:{ enabled:false },
                    credits: { enabled: false },
                    legend: {
                        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#D3412A',
                        borderColor: '#CCC',
                        borderWidth: 0,
                        itemStyle:{color: '#fff'},
                        shadow: false
                    },
                    colors: [colorConfirmed, colorTrend],
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels:{ enabled:true },
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        line:{
                            dataLabels:{enabled:true }
                        }
                    },
                    series: [{
                        type: 'column',
                        name: 'Konfirmasi',
                        data: val1
                    },{
                        type: 'line',
                        name: 'Total',
                        data: cumulativeData
                    }]
                });
                $.when(Highcharts).done(function() {
                    chartRecovered()
                })
            },
            error: function(err) {
                    cache: false
                    console.log (err);
            }
        });
    }

    function chartRecovered(){
        var urlChart= url + "dimension=dx:UEBmmFH8OzT&dimension=pe:LAST_14_DAYS;TODAY&filter=ou:amZZzlibrMp&skipData=false&skipMeta=true&includeNumDen=false&displayProperty=SHORTNAME";
        $.ajax({ 
            url: urlChart,
            async: true,
            type:'GET',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic "+btoa(USERNAME+':'+PASSWORD));
            },
            success: function(data) {
                var pe=[]; var val1=[];cumulativeData = [0];
                for (var i=0, len=data.rows.length; i<len; i++) {
                    pe[i]=data.rows[i][1].slice(0,4) + "-" +  data.rows[i][1].slice(4,-2) + "-" + data.rows[i][1].slice(6) ;
                    val1[i]=parseInt(data.rows[i][2]);
                }
                val1.forEach(function(elementToAdd, index) {
                        var newElement = cumulativeData[index] + elementToAdd;
                        cumulativeData.push(newElement);
                });
                
                cumulativeData.shift();
                //highchart
                Highcharts.chart('container_recovered', {
                    title: { style: {color: '#fff'},text: 'Sembuh', },
                    xAxis: {
                        min:0,
                        title: { style: {color: '#fff'},text: 'Periode' },   
                        labels: {style: {color: '#fff'}},
                        categories: pe
                    },
                    yAxis: {
                        min: 0,
                        title: { style: {color: '#fff'},text: 'Kasus' },
                        labels:{style: {color: '#fff'},}
                    },
                    exporting:{ enabled:false },
                    credits: { enabled: false },
                    legend: {
                        backgroundColor:Highcharts.defaultOptions.legend.backgroundColor || '#D3412A',
                        itemStyle:{color: '#fff'},
                        borderColor: '#CCC',
                        borderWidth: 0,
                        shadow: false
                    },
                    colors: [colorRecovered, colorTrend],
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels:{ enabled:true },
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        line:{
                            dataLabels:{ enabled:true }
                        }
                    },
                    series: [{
                        type: 'column',
                        name: 'Sembuh',
                        data: val1
                    },{
                        type: 'line',
                        name: 'Total',
                        data: cumulativeData
                    }]
                });                
                $.when(Highcharts).done(function() {
                    chartDie()
                })
            },
            error: function(err) {
                    cache: false
                    console.log (err);
            }
        });
    }

    function chartDie(){
        var urlChart= url + "dimension=dx:TAqRuO1R1eI&dimension=pe:LAST_14_DAYS;TODAY&filter=ou:amZZzlibrMp&skipData=false&skipMeta=true&includeNumDen=false&displayProperty=SHORTNAME";
        $.ajax({ 
            url: urlChart,
            async: true,
            type:'GET',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic "+btoa(USERNAME+':'+PASSWORD));
            },
            success: function(data) {
                var pe=[]; var val1=[];cumulativeData = [0];
                for (var i=0, len=data.rows.length; i<len; i++) {
                    pe[i]=data.rows[i][1].slice(0,4) + "-" +  data.rows[i][1].slice(4,-2) + "-" + data.rows[i][1].slice(6) ;
                    val1[i]=parseInt(data.rows[i][2]);
                }
                val1.forEach(function(elementToAdd, index) {
                        var newElement = cumulativeData[index] + elementToAdd;
                        cumulativeData.push(newElement);
                });
                cumulativeData.shift();
                //highchart
                Highcharts.chart('container_die', {
                    title: { style: {color: '#fff'},text: 'Meninggal' },
                    xAxis: {
                        min:0,
                        title: { style: {color: '#fff'},text: 'Periode' },  
                        labels:{style: {color: '#fff'},},
                        categories: pe
                    },
                    yAxis: {
                        min: 0,
                        title: { style: {color: '#fff'},text: 'Kasus' },
                        labels:{style: {color: '#fff'},}
                    },
                    exporting:{ enabled:false },
                    credits: { enabled: false },
                    legend: {
                        backgroundColor:Highcharts.defaultOptions.legend.backgroundColor || '#D3412A',
                        itemStyle:{color: '#fff'},
                        borderColor: '#CCC',
                        borderWidth: 0,
                        shadow: false
                    },
                    colors: [colorDie, colorTrend],
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels:{ enabled:true },
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        line:{
                            dataLabels:{ enabled:true }
                        }
                    },
                    series: [{
                        type: 'column',
                        name: 'Meninggal',
                        data: val1
                    },{
                        type: 'line',
                        name: 'Total',
                        data: cumulativeData
                    }]
                });
                $.when(Highcharts).done(function() {
                    $(".chart-slider").slick({
                        dots: false,
                        arrows:true,
                        speed: 1000,
                    });
                })
            },
            error: function(err) {
                    cache: false
                    console.log (err);
            }
        });
    }

    function renderIcons() {
        // Move icon
        if (!this.series[0].icon) {
            this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                .attr({
                    stroke: colorActive,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    zIndex: 10
                })
                .add(this.series[2].group);
        }
        this.series[0].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
                (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
        );

        // Exercise icon
        if (!this.series[1].icon) {
            this.series[1].icon = this.renderer.path(
                ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                    'M', 8, -8, 'L', 16, 0, 8, 8]
            )
                .attr({
                    stroke: colorRecovered,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    zIndex: 10
                })
                .add(this.series[2].group);
        }
        this.series[1].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
                (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
        );

        // Stand icon
        if (!this.series[2].icon) {
            this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                .attr({
                    stroke: colorDie,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    zIndex: 10
                })
                .add(this.series[2].group);
        }

        this.series[2].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
                (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
        );
    }
