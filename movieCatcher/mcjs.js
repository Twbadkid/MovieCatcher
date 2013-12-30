
var svg ;

window.onload=function(){
  var w = 1200,
      h = 500;

    var color = d3.scale.category20();
    var colors = d3.scale.category10();

    var force = d3.layout.force()
        // .gravity(0)
        .charge(-120) //node之間的電荷，+代表相吸 -相斥( -120)
        .linkDistance(30) //link的長度( 30)
        .size([w, h]);


    var s = d3.select("h6").append("svg")
        .attr("width", w)
        .attr("height", h);



    d3.json("js/movieList.json", function(error, graph) {
    // d3.json("js/jsontest.json", function(error, graph) {
      force
          .nodes(graph.nodes) 
          .links(graph.links)
          .start();

      var link = s.selectAll("line")
        .data(graph.links)
        .enter().append("line")
        // .attr("class","link")
        .style("stroke",function(d){return colors(d.color);}) //set color, by ds.scale.category10(), one by one
        .style("stroke-width", function(d,i) { return d.weight });

      var node = s.selectAll(".node")
          .data(graph.nodes)
        .enter().append("circle")
          .attr("class", "node")
          .attr("r", 5) //node的半徑 ( 5)
          .style("fill", function(d) { return color(d.group); })
          // .style("stroke",function(d){return colors(d.color)})
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



//FB login test start
window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
        appId      : FacebookAppId,                        // App ID from the app dashboard
        cookie     : true,                                 // Allowed server-side to fetch fb auth cookie
        status     : true,                                 // Check Facebook Login status
        xfbml      : true,                                  // Look for social plugins on the page
        oauth:true
        });

        // Additional initialization code such as adding Event Listeners goes here
        window.fbLoaded(); // to line 87
        // alert("The fbLoaded function has been runned"); //test line
    };

    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        //js.src = "//connect.facebook.net/en_US/all.js";
        // Debug version of Facebook JS SDK
        js.src = "//connect.facebook.net/en_US/all/debug.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

        // alert("fbLoaded has been running");
        window.fbLoaded = function () {

            FB.login(function(response){
                //check if user already login,
                if(response.authResponse){
                    fetch_my_profile();
                }else{ //if user has not login, will pop to ask
                    FB.Event.subscribe('auth.login',function(response){
                        // if(response.authResponse){
                            fetch_my_profile();
                        // }
                    });
                }
            },{scope:'email,publish_stream'});

              function fetch_my_profile() {
                FB.api('/me', function(response) {
                    var my_name = response.name;
                    var my_gender = response.gender;
                    var my_username = response.username;
                    var my_facebook_id = response.id;

                    $("#my-profile-name").html(my_name);
                    $("#my-profile-gender").html(my_gender);
                    $("#my-profile-username").html(my_username);
                    $("#my-profile-facebook-id").html(my_facebook_id);
                });

                FB.api('/me/picture?width=50', function(response) {
                    var my_picture_url = response.data.url;
                
                    $("#my-profile-picture").attr('src', my_picture_url);

                });
            };

        }
//FB login test end






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