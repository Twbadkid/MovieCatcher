
var svg ;

window.onload=function(){
  var w = 1200,
      h = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        // .gravity(0)
        .charge(-120) //node之間的電荷，+代表相吸 -相斥( -120)
        .linkDistance(30) //link的長度( 30)
        .size([w, h]);

    var s = d3.select("h6").append("svg")
        .attr("width", w)
        .attr("height", h);




    d3.json("js/jsontest.json", function(error, graph) {
      force
          .nodes(graph.nodes) 
          .links(graph.links)
          .start();

      var link = s.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class","link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });
          // .style("fill", function(d) { return color(d.group); });

        // s.attr("class","link");
        

      var node = s.selectAll(".node")
          .data(graph.nodes)
        .enter().append("circle")
          .attr("class", "node")
          .attr("r", 5) //node的半徑 ( 5)
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
// force






  // circle
    var width = Math.max(960, innerWidth),
    height = 460;

 i = 0;

 svg = d3.select("h4").append("svg")
    .attr("width", width)
    .attr("height", height);
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);
    //circle
}


function particle() {
  var m = d3.mouse(this);

  svg.insert("circle", "rect")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 1e-6)
      .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
      .style("stroke-opacity", 1)
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 100)
      .style("stroke-opacity", 1e-6)
      .remove();

  d3.event.preventDefault();
}