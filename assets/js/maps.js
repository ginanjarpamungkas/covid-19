var svg = d3.select(".map-container").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 500').attr('id', 'geo-map')
var g_indonesia = svg.append("g").attr("class", "indonesia")
var tooltip = d3.select("body").append("div").attr("class", "tooltip")
var zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

function zoomed() {
  t = d3.event.transform;
  g_indonesia.attr(
     "transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
  );
}

svg.call(zoom)

var projection = d3.geoMercator().scale(2500).translate([-4200, 100]);

var path = d3.geoPath().projection(projection);

d3.json("indonesia-map.json",function(json) {
    indonesia = g_indonesia.selectAll("path")
                           .data(json.features).enter()
                           .append("path").attr("d", path)
                           .attr("id", function(d) {return "prov-"+d.properties['id'];})
                           .style("fill", '#000')
                           .attr("stroke", "#000")
                           .attr("stroke-width", 0.5)
                           .on("mouseover", function (d) {
                                d3.select(this).transition().style("stroke-width", 1).attr("stroke", "#f79518")
                                loadTooltip(d),
                                tooltip.style('visibility','visible').style("left", ((d3.event.pageX)+10) + "px").style("top", (d3.event.pageY - 28) + "px")
                            })
                            .on("mouseout", function (d) {
                                d3.select(this).transition().style("stroke-width", 0.5).attr("stroke", "#000")
                                tooltip.style('visibility','hidden');
                            });
    $.when(indonesia).done(function( x ) {
        d3.csv("data-positif-corona-per-provinsi.csv", function (error, data) {
            $.each(data,function(id,value) {
                if (value.Positif >= 100) {
                    d3.select('#prov-'+value.Id).style("fill", '#682003')
                } else if (value.Positif >= 90) {
                    d3.select('#prov-'+value.Id).style("fill", '#822804')
                } else if (value.Positif >= 80) {
                    d3.select('#prov-'+value.Id).style("fill", '#9d380c')
                } else if (value.Positif >= 70) {
                    d3.select('#prov-'+value.Id).style("fill", '#b44c1d')
                } else if (value.Positif >= 60) {
                    d3.select('#prov-'+value.Id).style("fill", '#c86333')
                } else if (value.Positif >= 50) {
                    d3.select('#prov-'+value.Id).style("fill", '#d97b4b')
                } else if (value.Positif >= 40) {
                    d3.select('#prov-'+value.Id).style("fill", '#e89468')
                } else if (value.Positif >= 30) {
                    d3.select('#prov-'+value.Id).style("fill", '#f3ae87')
                } else if (value.Positif >= 20) {
                    d3.select('#prov-'+value.Id).style("fill", '#fbc8aa')
                } else if (value.Positif >= 10) {
                    d3.select('#prov-'+value.Id).style("fill", '#ffe4d1')
                } else {
                    d3.select('#prov-'+value.Id).style("fill", '#ffffff')
                }
            })
        })
    });
});

function loadTooltip(d){
    var html = "";
    d3.csv("data-positif-corona-per-provinsi.csv", function (error, data) {  
        for (var i in data) {
            if (data[i].Id == d.properties['id']) {
                html += `<div style="max-width:300px">
                <h4 class='kasus' style="padding-bottom:5px">` + data[i].Provinsi + `</h4>
                <h4 style="font-weight:300">Positif :` + data[i].Positif + `</h4>
                <h4 style="font-weight:300">Sembuh :` + data[i].Sembuh + `</h4>
                <h4 style="font-weight:300">Meninggal :` + data[i].Meninggal + `</h4>
                </div>`;
                tooltip.html(html);
            }
        }            
    });
}