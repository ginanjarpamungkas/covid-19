var svg = d3.select(".map-container").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 500').attr('id', 'geo-map')
var g_indonesia = svg.append("g").attr("class", "indonesia")
var g_others = svg.append("g").attr("class", "others")
var tooltip = d3.select(".corona-container").append("div").attr("class", "tooltip")
var zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

function zoomed() {
  t = d3.event.transform;
  g_indonesia.attr(
     "transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
  );
  g_others.attr(
    "transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
 );
}

svg.call(zoom)

var projection = d3.geoMercator().scale(1200).translate([-1990, 200]);

var path = d3.geoPath().projection(projection);

d3.json("indonesia-map.json",function(json) {
    indonesia = g_indonesia.selectAll("path")
                           .data(json.features).enter()
                           .append("path").attr("d", path)
                           .attr("id", function(d) {return "prov-"+d.properties['id'];})
                           .style("fill", '#000')
                           .attr("stroke", "#000")
                           .attr("stroke-width", 1)
                           .attr("stroke-opacity", 0)
                           .on("mouseover", function (d) {
                                d3.select(this).transition().style("stroke-width", 1).attr("stroke", "#000").attr("stroke-opacity", 1)
                                loadTooltip(d),
                                tooltip.style('visibility','visible').style("left", ((d3.event.pageX)+10) + "px").style("top", (d3.event.pageY - 28) + "px")
                            })
                            .on("mouseout", function (d) {
                                d3.select(this).transition().style("stroke-width", 1).attr("stroke", "#000").attr("stroke-opacity", 0)
                                tooltip.style('visibility','hidden');
                            });
    $.when(indonesia).done(function( x ) {
        d3.csv("data-positif-corona-per-provinsi.csv", function (error, data) {
            $.each(data,function(id,value) {
                if (value.Positif >= 900) {
                    d3.select('#prov-'+value.Id).style("fill", '#822804')
                } else if (value.Positif >= 800) {
                    d3.select('#prov-'+value.Id).style("fill", '#9d380c')
                } else if (value.Positif >= 700) {
                    d3.select('#prov-'+value.Id).style("fill", '#b44c1d')
                } else if (value.Positif >= 600) {
                    d3.select('#prov-'+value.Id).style("fill", '#c86333')
                } else if (value.Positif >= 500) {
                    d3.select('#prov-'+value.Id).style("fill", '#d97b4b')
                } else if (value.Positif >= 400) {
                    d3.select('#prov-'+value.Id).style("fill", '#e89468')
                } else if (value.Positif >= 300) {
                    d3.select('#prov-'+value.Id).style("fill", '#f3ae87')
                } else if (value.Positif >= 200) {
                    d3.select('#prov-'+value.Id).style("fill", '#fbc8aa')
                } else if (value.Positif >= 100) {
                    d3.select('#prov-'+value.Id).style("fill", '#ffe4d1')
                } else {
                    d3.select('#prov-'+value.Id).style("fill", '#ffffff')
                }
            })
        })
    });
});
d3.json("country-map.json",function(json) {
    others = g_others.selectAll("path").data(json.features).enter().append("path").attr("d", path).style("fill", '#e0e0e0').attr("stroke", "#ffffff").attr("stroke-width", 0.1);
})

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