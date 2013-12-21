window.onload=function () {
	var w = 960,
		    h = 500;

		var color = d3.scale.category20();

		var force = d3.layout.force()
		    .charge(-120)
		    .linkDistance(30)
		    .size([w, h]);

		var s = d3.select("body").append("svg")
		    .attr("width", w)
		    .attr("height", h);

		d3.json("js/miserables.json", function(error, graph) {
		  force
		      .nodes(graph.nodes)
		      .links(graph.links)
		      .start();

		  var link = s.selectAll(".link")
		      .data(graph.links)
		    .enter().append("line")
		      .attr("class", "link")
		      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

		  var node = s.selectAll(".node")
		      .data(graph.nodes)
		    .enter().append("circle")
		      .attr("class", "node")
		      .attr("r", 5)
		      .style("fill", function(d) { return color(d.group); })
		      .call(force.drag);

		  node.append("title")
		      .text(function(d) { return d.name; });

		  force.on("tick", function() {
		    link.attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    node.attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });
		  });
		});
}