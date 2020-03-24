var width = document.body.getBoundingClientRect().width,height = 675;

var svg = d3.select(".corona-container").attr("id", "svg-corona-virus").append("svg").attr("width", width).attr("height", height);
var g = svg.append("g").attr("class", "ncov-19");

// var TooltipHidden = true;
var LegendHidden = true;
var node, idText;

var groupCluster = d3.scaleOrdinal().domain([1, 2, 3, 4, 5, 6]).range([20, 70, 120, 170, 220, 270])

var graph;

var radioValue;

var radius = 16;

var simulation = d3.forceSimulation();

var tooltip = d3.select("body").append("div").attr("class", "tooltip")

var url = "indonesia-corona.json";

function forceNormal() {
	simulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y+50);
	simulation.force("charge")
		.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        .x(width * forceProperties.forceX.x);

    var domain = [1,2,3,4];
    var warnaStatus = d3.scaleOrdinal().domain(domain).range(["#36aa01","#ffc904","#fe0a0a","#767974"]);
    node.attr("r", radius).style("fill", function(d) {return warnaStatus( d.statusid );}).style("stroke", "white").style("stroke-width", 3)
};

function forceAge() {
	var div = 400
	var scale = width/div/1.5;
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));

	var scaleCat = d3.scaleQuantile()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y+50);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.9)
        .y(function(d){ return scaleCat(d.umur) } );
        
    var domain = [0,10,20,30,40,50,60,70,80,90,100];
    var warnaAge = d3.scaleQuantile().domain(domain).range(['#2d16b9', '#3f23b2', '#4c2fac', '#5639a5', '#5d439e', '#644c98', '#695591', '#6e5e8a', '#716783', '#74707b', '#767974']);
    node.attr("r", radius).style("fill", function(d) {return warnaAge(d.umur);}).style("stroke", "white").style("stroke-width", 3)
}

function forceGender() {
	var div = 15;
	var scale = width/div/1.5;
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y+50);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.7)
        .y(function(d){ return scaleCat(d.genderid) } );
    var domain = [1,2,3];
    var warnaGender = d3.scaleOrdinal().domain(domain).range(["#f513f2","#1328f5","#767974"]);
    node.attr("r", radius).style("fill", function(d) {return warnaGender( d.genderid );}).style("stroke", "white").style("stroke-width", 3)
}

function forceCluster() {
	var div = 20;

	var scale = width/div/1.5;
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y+50);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.9)
        .y(function(d){ return scaleCat(d.klasterid) } );
    
    var domain = [1,2,3,4,5,6,7,8,9];
    var warnaKlaster = d3.scaleOrdinal().domain(domain).range(["#fb0a0a","#fb0ad0","#1b0afb","#0afbed","#0afb21","#f9fc1d","#fc9b1d","#767974","#1db0fc"]);
    node.attr("r", radius).style("fill", function(d) {return warnaKlaster( d.klasterid );}).style("stroke", "white").style("stroke-width", 3)
}

//load data
d3.json(url).then(function(_graph) {
	graph = _graph;
	initializeDisplay();
	initializeSimulation();

});

//set up simulation to update location after each tick
function initializeSimulation() {
	simulation.nodes(graph.nodes);
	initializeForce();
	simulation.on("tick", ticked);
}

//values of all force
forceProperties = {
	center: {
		x: 0.5,
		y: 0.5
	},
	charge: {
		enabled: true,
		strength: -40,
		distanceMin: 1,
		distanceMax: 2000
	},
	collide: {
		enabled: true,
		strength: 10,
		iterations: 1,
		radius: 5
	},
	forceX: {
		enabled: true,
		strength: 0.1,
		x: .5
	},
	forceY: {
		enabled: true,
		strength: .1,
		y: .5
	}
}

//add force to simulations
function initializeForce() {
	//add force and associate each with a name
	simulation
		.force("charge", d3.forceManyBody())
		.force("collide", d3.forceCollide())
		.force("center", d3.forceCenter())
		.force("forceX", d3.forceX())
		.force("forceY", d3.forceY());
	//apply properties to each force
	updateForces();
}

//apply new force properties
function updateForces() {
	//get radio button value
	if ( document.getElementById("normal").selected ) {
        forceNormal();
        $('.legends').hide()
        $('#normals').show()
	} else if ( document.getElementById("cluster").selected ) {
        forceCluster();
        $('.legends').hide()
        $('#klaster').show()
	} else if ( document.getElementById("gender").selected ) {
        forceGender();
        $('.legends').hide()
        $('#jeniskelamin').show()
	} else if ( document.getElementById("umur").selected) {
        forceAge();
        $('.legends').hide()
        $('#usia').show()
	}
	simulation.alpha(1).restart();
}

function initializeDisplay() {

	//set the data and properties of the node circle
	node = g
		.append("g")
		.style("z-index","5")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graph.nodes)
		.enter()
        .append("circle")
        .attr("id", function(d) {return "nodes-"+d.id;})
        .attr("r", radius)
        .style("z-index","6")
        .style("cursor", "pointer")
        .style("stroke", "white")
		.style("stroke-width", 3)
		.on("mouseover", function(d) {
            node.style("stroke-opacity", '0.1').style('fill-opacity','0.1'),
            d3.select('#nodes-'+d.id).style("stroke-opacity", '1').style('fill-opacity','1'),
            tooltip.html(`
                    <div>
                    <h4 class='kasus'>Kasus #` + d.id + `</h4>
                    <h4>` + d.gender + `</h4>
                    <h4>` + d.umurtext + ` TAHUN</h4>
                    <h4>`+ d.klaster + `</h4></div>
                `).style('visibility','visible').style("left", ((d3.event.pageX)+10) + "px").style("top", (d3.event.pageY - 28) + "px")
		})
		.on("mouseout", function(d) {
            node.style("stroke-opacity", '1').style('fill-opacity','1'),
			tooltip.style('visibility','hidden');
		})

	//text on node
	idText = g
		.append("g")
		.style("z-index","7")
		.selectAll("text")
		.data(graph.nodes)
		.enter()
		.append("text")
			.style("z-index","8")
			.attr("class",".text")
			.attr("text-anchor", "middle")
			.attr("dy", ".35em")
			.text(function(d) { return d.id })
			.style("font-family","Montserrat")
			.style("font-size", 11)
            .style("fill","#fff")
            .style("cursor", "pointer")
			.on("mouseover", function(d) {
                node.style("stroke-opacity", '0.1').style('fill-opacity','0.1'),
                d3.select('#nodes-'+d.id).style("stroke-opacity", '1').style('fill-opacity','1'),
                tooltip.html(`
                    <div>
                    <h4 class='kasus'>Kasus #` + d.id + `</h4>
                    <h4>` + d.gender + `</h4>
                    <h4>` + d.umurtext + `</h4>
                    <h4>`+ d.klaster + `</h4><br/></div>
                `).style('visibility','visible').style("left", ((d3.event.pageX)+10)+ "px").style("top", (d3.event.pageY - 28) + "px");
			})
			.on("mouseout", function(d) {
                node.style("stroke-opacity", '1').style('fill-opacity','1'),
				tooltip.style('visibility','hidden');
			})
			
	//node tooltip
	node.append("title").text(function(d) { return d.kasus; });
    
}

// convenience function to update everything (run after UI input)
function updateAll() {
    updateForces();
};

//update the position after each simulation tick
function ticked() {
	node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

	idText.attr("x", function(d){ return d.x; })
		  .attr("y", function(d){ return d.y; });
};