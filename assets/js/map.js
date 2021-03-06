var svg = d3.select(".map-container").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 500').attr('id', 'geo-map')
var g_indonesia = svg.append("g").attr("class", "indonesia")
var g_bubbles = svg.append("g").attr("class", "bubbles")
var tooltip = d3.select("body").append("div").attr("class", "tooltip")
var zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

function zoomed() {
  t = d3.event.transform;
  g_indonesia.attr(
     "transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
  );
  g_bubbles.attr(
    "transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
 );
}

svg.call(zoom)

var projection = d3.geoMercator().scale(6000).translate([-10800, -300]);

var path = d3.geoPath().projection(projection);

d3.json("indonesia-map.json",function(json) {
    indonesia = g_indonesia.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("id", function(d) {return "prov-"+d.properties['id'];}).style("fill", '#b3b3b3').attr("stroke", "#ffffff").attr("stroke-width", 0.5);
});

d3.csv('daftar-rs-rujukan.csv',function(csv){
    g_bubbles.selectAll("circle.seizure-bubble")
    .data(csv, function(d) { return d.id })
    .enter().append("circle")
    .attr('class', 'seizure-bubble')
    .attr("fill", "#f79518")
    .attr("r", 5)
    .attr("cx", function(d) { return projection([+d.long, +d.lat])[0]; })
    .attr("cy", function(d) { return projection([+d.long, +d.lat])[1]; })
    .on("mouseover", function(d) {
        d3.select(this).transition().style("stroke", "#000").style('fill-opacity',1)
        tooltip.html(`
                <div style="max-width:300px">
                <h4 class='kasus' style="padding-bottom:5px">` + d.nama + `</h4>
                <h4 style="font-weight:300">` + d.alamat + `</h4>
                <h4>Telp. ` + d.phone + `</h4>
                </div>
            `).style('visibility','visible').style("left", ((d3.event.pageX)+10) + "px").style("top", (d3.event.pageY - 28) + "px")
    })
    .on("mouseout", function(d) {
        d3.select(this).transition().style("stroke", "none").style('fill-opacity',1)
        tooltip.style('visibility','hidden');
    })
})