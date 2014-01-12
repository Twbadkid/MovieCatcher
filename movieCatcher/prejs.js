var word ;
var page = 0;
var ii;
var count = 0;
var next,previous;
window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
            appId      : '1434150786800444',              // App ID from the app dashboard
            cookie     : true,                                 // Allowed server-side to fetch fb auth cookie
            status     : true,                                 // Check Facebook Login status
            xfbml      : true,                                 // Look for social plugins on the page
            oauth      : true
        });
        window.fbLoaded();
    };
    (function(d, s, id){
    	var js, fjs = d.getElementsByTagName(s)[0];
    	if (d.getElementById(id)) {return;}
    	js = d.createElement(s); js.id = id;
    	js.src = "//connect.facebook.net/en_US/all/debug.js";
    	fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    function set_cookie(k, v) {
    	document.cookie = k + "=" + v;
    }
    fb_login_scopes = [
    "read_stream",
    "read_friendlists",
    "publish_stream",
    "user_actions.video",
    "user_videos",
    "user_friends",
    "friends_actions.video"
    ];
    window.fbLoaded = function(){
            FB.Event.subscribe('auth.login', function(response) {
                var msg = "You're logged in.";
                $("#my-login-message").html(msg);
                console.log("Your login response:");
                console.log(response);
            });
            FB.login(function(response){
                    if (response.authResponse) {
                    	var accessToken = response.authResponse.accessToken;
                    	set_cookie('fb_access_token', accessToken);
                    }
                }, {
                	'scope': fb_login_scopes.join(",")
                });
        };
window.onload=function() {
	word = document.getElementById('page0').innerHTML;
	ii = document.getElementById('page0').id;
	typeWrite(ii);

	next = document.getElementById('next');
	next.setAttribute("onclick","nextListener(this);");
}

function loading(){

 	if(count<=word.length){
 		document.getElementById(ii).innerHTML=word.substring(0,count);
  		count++;
  		if(count>=8){
  			setTimeout("loading()",400);
  		}else{
  			setTimeout("loading()",40);
  		}
 	}
}


function typeWrite(){

 	if(count<=word.length){
 		document.getElementById(ii).innerHTML=word.substring(0,count);
  		count++;
  		setTimeout("typeWrite()",40);
 	}
}

function nextListener(g) {
	if (page==0) {
		next = document.getElementById("page1");
		document.getElementById("img1").setAttribute("class","imgclass");
		word = next.innerHTML;
		count = 0;
		typeWrite(ii);
		page++;
	}else if(page==1){
		next = document.getElementById("page2");
		document.getElementById("img2").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==2){
		next = document.getElementById("page3");
		document.getElementById("img3").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==3){
		next = document.getElementById("page4");
		document.getElementById("img4").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==4){
		next = document.getElementById("page5");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==5){
		next = document.getElementById("page6");
		// document.getElementById("img5").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==6){
		next = document.getElementById("page7");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==7){
		next = document.getElementById("page8");
		document.getElementById("img6").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==8){
		next = document.getElementById("page9");
		document.getElementById("img7").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
	}else if(page==9){
		next = document.getElementById("page9");
		next.innerHTML = "Are you READY?"
		document.getElementById("img8").setAttribute("class","imgclass");
		word=next.innerHTML;
		count=0;
		typeWrite(ii);
		page++;
		document.getElementById('next').innerHTML = '<a href="/h">GO!!</a>';
	}else if(page==10){
		next = document.getElementById("page9");
		next.innerHTML = "Loading. . . . . . <br>. . . . . . . . . . . . <br>. . . . . . . . . . . . <br>. . . . . . . . . . . . <br>. . . . . . . . . . . . ";
		word=next.innerHTML;
		count=0;
		loading(ii);
		page++;
		document.getElementById("next").innerHTML = "";

	}

}
