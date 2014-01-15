var svg;
var mname;
var mlink;
var checkB = 3;
var checkP = 3;
var boy,girl,all;
	var boy_up='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/boy_up.png';
	var boy_opacity='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/boy_opacity.png';
	var boy_black='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/boy_black.png';
	var girl_up='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/girl_up.png';
	var girl_opacity='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/girl_opacity.png';
	var girl_black='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/girl_black.png';
	var all_up='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/all_up.png';
	var all_opacity='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/all_opacity.png';
	var all_black='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/gender/all_black.png';
window.onload=function(){
	build();
	draw();
	$.preload(boy_up,boy_opacity,boy_black,girl_up,girl_opacity,girl_black,all_up,all_opacity,all_black);
};



function draw(){
	document.getElementById("hsix").style.maxWidth = (screen.width)*(0.6)+"px";
	document.getElementById("hsix").style.height = (screen.height)*(0.65)+"px";
	// set h6's width and height


	var x = (screen.width)*0.5,
		y = (screen.height)*0.7;
	//set d3's center


	var color = d3.scale.category20c();
	var colors = d3.scale.category10();

	var force = d3.layout.force()
		.size([x, y])
		.charge(-50)
		.linkDistance(6)
		.on("tick", tick);

	var svg = d3.select("h6").append("svg")
		.attr({
			"width": "100%",
			"height": "100%"
		});
	//fill of the select point

	var link,node;
	var json = document.getElementById("json").innerHTML;
	// d3.json("js/movieList.json", function(error, graph) {
	if(json=="0"){
		var myjson = document.getElementById("myjson").innerHTML;
	}else if(json=="1"){
		var myjson = document.getElementById("seeyou").innerHTML;
	}else{
		var myjson = document.getElementById("allok").innerHTML;
	}

	// console.log(myjson);
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
		.style("stroke",function(d){ return "black";})
		.style("stroke-width",function(d){ return 4;})
		.style("stroke-opacity",function(d){ return 0.8;})
		// .style("fill-opacity",function(d){return 0.8})

		.on("mouseout",mouseOut)
		.on("mouseover",mouseOver)
		.on("dblclick",dbclick)
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
		document.getElementById("mn").innerHTML="<br>";

		d3.select(this).attr("r",7)
			.style("fill-opacity",function(d){return 0.8});

	}

	function mouseOver(d) {
		d3.select(this).attr("r",15)
			.style("fill-opacity",function(d){return 1;})
			d3.select(this).append("title").text(function(d){return d.name;});
		document.getElementById("mn").innerHTML=d.name;
	}

	function dbclick (d) {
		d3.select(this).classed("fixed", d.fixed = false);
	}

	function click(d){
		d3.select(this).classed("fixed", d.fixed = true);
		var x = "http://www.facebook.com.tw/"+d.id;
		var y = "<img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'> Movie : <br>"+d.name;
		var z = "<img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'> Audience : <br>"+d.user;
		mname = d.name;
		mlink = x;
		document.getElementById("Movie").innerHTML=y;
		document.getElementById("audience").innerHTML=z;
		document.getElementById("FP").innerHTML="<a href=" + x + " target='blank'><img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'> FB Fan Page <img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'></a>  ";
	}

	function fp(d){
		var x = "http://facebook.com.tw/"+d.id;
		window.open(x.d.name);
	}

	boy = document.getElementById("boyButton");
	girl = document.getElementById("girlButton");
	all = document.getElementById("unknowButton");

	boy.setAttribute("onclick","change('1');");
	girl.setAttribute("onclick","change('2');");
	all.setAttribute("onclick","change('0');");

	/*if(checkB==3){
		//boy.setAttribute("onmouseover","this.src=boy_up");
		//boy.setAttribute("onmouseout","this.src=boy_opacity");
		//girl.setAttribute("onmouseover","this.src=girl_up");
		//girl.setAttribute("onmouseout","this.src=girl_opacity");
		//all.setAttribute("onmouseover","this.src=all_up");
		//all.setAttribute("onmouseout","this.src=all_opacity");
	}else if(checkB==1){
		boy.setAttribute("onmouseover","");
		boy.setAttribute("onmouseout","");
		girl.setAttribute("onmouseover","this.src=girl_up");
		girl.setAttribute("onmouseout","this.src=girl_opacity");
		all.setAttribute("onmouseover","this.src=all_up");
		all.setAttribute("onmouseout","this.src=all_opacity");
		boy.src=boy_black;
		girl.src=girl_opacity;
		all.src=all_opacity;
	}else if(checkB==2){
		boy.setAttribute("onmouseover","this.src=boy_up");
		boy.setAttribute("onmouseout","this.src=boy_opacity");
		girl.setAttribute("onmouseover","");
		girl.setAttribute("onmouseout","");
		all.setAttribute("onmouseover","this.src=all_up");
		all.setAttribute("onmouseout","this.src=all_opacity");
		boy.src=boy_opacity;
		girl.src=girl_black;
		all.src=all_opacity;
	}else if(checkB==0){
		//boy.setAttribute("onmouseover","this.src=boy_up");
		//boy.setAttribute("onmouseout","this.src=boy_opacity");
		//girl.setAttribute("onmouseover","this.src=girl_up");
		//girl.setAttribute("onmouseout","this.src=girl_opacity");
		//all.setAttribute("onmouseover","");
		//all.setAttribute("onmouseout","");
		//boy.src=boy_opacity;
		//girl.src=girl_opacity;
		//all.src=all_black;
	}*/

	document.getElementById("FP").setAttribute("onclick","fp()");
	document.getElementById("in").setAttribute("onclick","text()");
	document.getElementById("publish").setAttribute("onclick","post()");

}
function post(){
	var body=document.getElementById("in").value+"\n\nWatch Movie with me : "+mname+"\nMovie info : "+mlink+"\nPosted From MovieCatcher :http://moviecatcher.herokuapp.com/" ;
	FB.api('/me/feed', 'post', { message: body }, function(response) {
		//console.log(response);
		if (!response) {
			alert('No response');
		}else if(response.error){
			alert("Push the Button on the top right to login Facebook~");
		} else {
			alert("Post success,Invite more friends to try this~~");
	}
	});
}

var flag=true;
function text(x){
	if(flag){
		document.getElementById("in").value="";
		flag=false;
	}

}
function change(d){

	if(d==1){
		checkB = 1;
		boy.setAttribute("class","boy-but-press");
		girl.setAttribute("class","girl-but");
		all.setAttribute("class","all-but");
	}else if(d==2){
		checkB = 2;
		boy.setAttribute("class","boy-but");
		girl.setAttribute("class","girl-but-press");
		all.setAttribute("class","all-but");
	}else if(d==0){
		checkB = 0;
		boy.setAttribute("class","boy-but");
		girl.setAttribute("class","girl-but");
		all.setAttribute("class","all-but-press");
	}


	document.getElementById("hsix").innerHTML="";	
	if(d=='0'){
		document.getElementById("json").innerHTML="0";
	}else if(d=='1'){
		document.getElementById("json").innerHTML="1";
	}else{
		document.getElementById("json").innerHTML="2";
	}
	
	draw();
}

//FB login test start
window.fbAsyncInit = function() {
	// init the FB JS SDK
	FB.init({
		appId		:'207835636074455',                        // App ID from the app dashboard
		cookie		:true,                                 // Allowed server-side to fetch fb auth cookie
		status		:true,                                 // Check Facebook Login status
		xfbml		:true,                                  // Look for social plugins on the page
		oauth		:true
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

function login(){
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
}
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
	document.getElementById("hi").innerHTML="Hi!";
};
// alert("fbLoaded has been running");
window.fbLoaded = function () {
	//$("#FB-login-button").on("click",login);
	login();
}
//FB login test end

