
var svg ;

window.onload=function(){
	build();
  var width = 1300,
    height = 400;

        var color = d3.scale.category20c();
    var colors = d3.scale.category10();


var force = d3.layout.force()
    .size([width, height])
    .charge(-120)
    .linkDistance(30)
    .on("tick", tick);

// var drag = force.drag()
//     .on("dragstart", dragstart);

var svg = d3.select("h6").append("svg")
    .attr("width", width)
    .attr("height", height);

  var link,node;

// d3.json("js/movieList.json", function(error, graph) {
  var myjson = document.getElementById("myjson").innerHTML;
    graph= JSON.parse( myjson );
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

link = svg.selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .style("stroke",function(d){return colors(d.color);}) //set color, by ds.scale.category10(), one by one
        .style("stroke-width", function(d,i) { return d.weight });

node = svg.selectAll("node")
          .data(graph.nodes)
          .enter().append("circle")
          .attr("class", "node")
          .attr("r", 7) //node的半徑 ( 5)
          .attr("src","https://github.com/favicon.ico")

          .style("fill", function(d) { return color(d.name); })
          .style("fill-opacity",function(d){return 0.8})

          // .style("stroke",function(d){return "black"})
          // .style("stroke-width",function(d){return 3;})
          // .style("stroke-opacity",function(d){return 0.8;})
          .on("mouseout",mouseOut)
          .on("mouseover",mouseOver)
          // .on("dblclick",dbclick)
          .on("click",click)

          .call(force.drag);
// });

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // node.attr("cx", function(d) { return d.x; })
  //     .attr("cy", function(d) { return d.y; });
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

}

function mouseOut(d) {
  // d3.select(this).classed("fixed", d.fixed = false);
  document.getElementById("detail").innerHTML="<br>";
  d3.select(this).attr("r",7)
  .style("fill-opacity",function(d){return 0.8});
  
}

function mouseOver(d) {
  // d3.select(this).classed("fixed", d.fixed = true);
  d3.select(this).attr("r",15)
  .style("fill-opacity",function(d){return 1;})
  d3.select(this).append("title").text(function(d){return d.name;});
  document.getElementById("detail").innerHTML=d.name;
}

function dbclick (d) {
  // alert(d.name);
  var x = "http://www.facebook.com.tw/"+d.id;
  window.open(x, d.name);
}

function click(d){
  var x = "http://www.facebook.com.tw/"+d.id;
  var y = "<img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'> Movie : "+d.name;
  document.getElementById("Movie").innerHTML=y;
  document.getElementById("FP").innerHTML="<a href=" + x + " target='blank'><img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'>FB Fan Page<img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'></a>  ";
}

function fp(d){
  var x = "http://facebook.com.tw/"+d.id;
  window.open(x.d.name);
}

document.getElementById("FP").setAttribute("onclick","fp()");




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
            },{scope:''});

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

