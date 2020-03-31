var svg = d3.select(".map-container").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 500').attr('id', 'geo-map')
var g_indonesia = svg.append("g").attr("class", "indonesia")
var g_others = svg.append("g").attr("class", "others")
var g_bubbles = svg.append("g").attr("class", "bubbles")
var tooltip = d3.select("body").append("div").attr("class", "tooltip")

var projection = d3.geoMercator().scale(1200).translate([-1990, 200]);

var path = d3.geoPath().projection(projection);

d3.json("indonesia-map.json",function(json) {
    indonesia = g_indonesia.selectAll("path")
                           .data(json.features).enter()
                           .append("path").attr("d", path)
                           .attr("id", function(d) {return "prov-"+d.properties['id'];})
                           .style("fill", '#b3b3b3')
                           .attr("stroke", "#ffffff")
                           .attr("stroke-width", 0.5)
                           .on("mouseover", function (d) {
                                d3.select(this).transition().style("stroke-width", 1).style('fill-opacity',0.5)
                                loadTooltip(d),
                                tooltip.style('visibility','visible').style("left", ((d3.event.pageX)+10) + "px").style("top", (d3.event.pageY - 28) + "px")
                            })
                            .on("mouseout", function (d) {
                                d3.select(this).transition().style("stroke-width", 0.5).style('fill-opacity',1)
                                tooltip.style('visibility','hidden');
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