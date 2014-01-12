#!/usr/bin/env python
from bottle import Bottle, run, template
from bottle import static_file
from bottle import jinja2_template
from bottle import request
import facebook
import json
import os
FACEBOOK_APP_ID = os.environ['FACEBOOK_APP_ID']
FACEBOOK_SECRET = os.environ['FACEBOOK_SECRET']
fb_access_token = None
fb_graph = None
personal = None
app = Bottle()
@app.route('/')
def login():
    template_data = {
        'facebook_app_id': FACEBOOK_APP_ID
    }
    return jinja2_template('pre.html', **template_data)
@app.route('/cp3')
def cp3():
        global fb_access_token
        fb_access_token = request.cookies['fb_access_token']
        global fb_graph
        fb_graph = facebook.GraphAPI(fb_access_token)
        result = fb_graph.fql("SELECT uid2 FROM friend WHERE uid1 = me()")
        string=json.dumps(result).replace('[{"uid2": "','').replace('"}]','')
        stringlist = string.split('"}, {"uid2": "')
        strprint = ''
        list1=stringlist[0:50]
        strprint = strprint + ''.join(map(getMovie,list1))
        strprint = strprint[1:]
        strprint = strprint + cp2()
        strprint = strprint + '],"links":[]}'
        return '''{"nodes":['''+strprint
def getName(getIn,x):
        return fb_graph.get_object(getIn).get("name",1) + '<br>'
def getMovie(frid):
        result = fb_graph.get_object(frid+"/video.watches")
        global personal
        personal = fb_graph.get_object(frid)
        movielist = result.get("data",1)
        strre = ''
        strre =  strre + ''.join(map(getMovielist,movielist,range(len(movielist))))
        return strre
def getMovielist(movielist,x):
        tem = movielist.get("data",1).get("movie",1)
        if tem ==1:
                ret = ""
        else:
                ret = ''',{"name":"'''+movielist.get("data").get("movie").get("title")+'''","id":'''+movielist.get("data").get("movie").get("id")+''',"user":" '''+personal.get("name","none")+''' ","gender":"'''+personal.get("gender","error")+'''"}'''
        return ret
@app.route('/h')
def h():
        html = '''
<html>
<meta cahrset="utf-8">
<head>
<link rel="shortcut icon" type="image/x-icon" href="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/favicon.ico">
<script src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/secretForHeroku.js"></script>
<script type="text/javascript" src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/mcjs.js"></script>
<script type="text/javascript" src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/buildLinks.js"></script>
<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/mccss.css">
<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/css/bootstrap-theme.css">
<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/css/bootstrap.css">
<script src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/js/jquery.js"></script>
<script type="text/javascript" src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/js/bootstrap.js"></script>
<script src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/js/d3.v3.min.js"></script>
<title>MovieCatcher</title>
</head>
<body class="backblack">
    <div id="left">
    <h6 id="hsix">
    </h6>
    <h4 id="moviename"><p id="mn" class="moviename size"></p></h4>
    </div>
    </div>
    <div id="right">
                <div id="my-login-control" class="ll">
            <img id="my-profile-picture" class="img-thumbnail" src="" alt="">
        <button id="FB-login-button"
        class="btn btn-primary ">
                <dt>Hi!</dt>
                <dd id="my-profile-name"></dd>
        </button>
        <p id="my-login-message"></p>
        <button id="boyButton" class="boyButton">Boy</button>
        <button id="girlButton" class="girlButton">Girl</button>
        <button id="unknowButton" class="unknowButton">Uknow</button>
    <p class="MN " id="Movie"> <img src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png"> Movie : <br><br></p>
    <p class="MN" id="audience"> <img src="https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png"> Audience : <br><br></p>
    <p class="MN node" id="FP">  <img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'> FB Fan Page <img src='https://googledrive.com/host/0B04MUDykjgxRNTRKU1kxdHpyck0/img/logo_small.png'></p>
    <p class="monsfont"><br><br><br><br>WeAreMovieCatcher<br><br><br><br></p>
    <p class="MN cen" color="red">Invited Your Friends Watch Movie Together !</p>
    <input class="size" value="share something!" id="in">
    <p class="moviename node" id="publish">Click to Publish !</p>
    </div>
        <p id="myjson" class="myjson">'''
        html = html +cp3()
        html = html +'''
        </p>
        <p id="allok" class="myjson"></p>
        <p id="seeyou" class="myjson"></p>
        <p id="json" class="myjson">0</p>
</body>
</html>'''
        return html
