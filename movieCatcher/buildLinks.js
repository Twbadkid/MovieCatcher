function build(){
	var pStr = document.getElementById("myjson").innerHTML;
	var pStrg = "";
	var pStrb = "";
	var jsonStr = JSON.parse(pStr);
	var jsonStrg;
	var jsonStrb;

	//sort nodes
	jsonStr.nodes.sort(function(a,b){
		if(a.name < b.name ) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	});
	pStr = JSON.stringify(jsonStr);
	pStr = pStr.slice(pStr.indexOf('{"name'),pStr.lastIndexOf("}")+1);
	pStr = '{"nodes":[{"name":"???","user":"???"},' + pStr;
	pStrg = pStrb = '{"nodes":[{"name":"???","user":"???"},';
	jsonStr = JSON.parse(pStr);
	pStr = pStr.slice(0,pStr.lastIndexOf("]"));

	//generate links  
	var num = new Array;
	var numg = new Array;
	var numb = new Array;
	var sum = 1;
	var sumg = 1;
	var sumb = 1;
	var gi = 0;
	var bi = 0;
	num[0] = 0;
	numg[0] = 0;
	numb[0] = 0;

	//countnum
	for(var i=1, current=0;i<jsonStr.nodes.length;i++){
		if(jsonStr.nodes[i].name == jsonStr.nodes[i-1].name){
			if(jsonStr.nodes[i].gender == "female"){
				numg[gi]>0?numg[gi]++:numg[gi] = 1;
				pStrg = pStrg + '{"name":"' + jsonStr.nodes[i].name + '","id":' + jsonStr.nodes[i].id + ',"user":"' + jsonStr.nodes[i].user + '","gender":"' + jsonStr.nodes[i].gender + '"},';
			}else if(jsonStr.nodes[i].gender == "male"){
				numb[bi]>0?numb[bi]++:numb[bi] = 1;
				pStrb = pStrb + '{"name":"' + jsonStr.nodes[i].name + '","id":' + jsonStr.nodes[i].id + ',"user":"' + jsonStr.nodes[i].user + '","gender":"' + jsonStr.nodes[i].gender + '"},';
			}
			num[current]>0?num[current]++:num[current] = 1;
		}else{
			if (numg[gi]>=0) gi++;
			if (numb[bi]>=0) bi++;
			if(jsonStr.nodes[i].gender == "female"){
				numg[gi]>0?numg[gi]++:numg[gi] = 1;
				pStrg = pStrg + '{"name":"' + jsonStr.nodes[i].name + '","id":' + jsonStr.nodes[i].id + ',"user":"' + jsonStr.nodes[i].user + '","gender":"' + jsonStr.nodes[i].gender + '"},';
			}else if(jsonStr.nodes[i].gender == "male"){
				numb[bi]>0?numb[bi]++:numb[bi] = 1;
				pStrb = pStrb + '{"name":"' + jsonStr.nodes[i].name + '","id":' + jsonStr.nodes[i].id + ',"user":"' + jsonStr.nodes[i].user + '","gender":"' + jsonStr.nodes[i].gender + '"},';
			}
			current++;
			num[current] = 1;
		}
		//console.log(numg[gi]);
	}
	pStrg = pStrg + '],"links":[]}';
	pStrb = pStrb + '],"links":[]}';
	pStrg = pStrg.replace(",]," , "],");
	pStrb = pStrb.replace(",]," , "],");
	//console.log(pStrg);
	jsonStrg = JSON.parse(pStrg);
	jsonStrb = JSON.parse(pStrb);
	pStrg = pStrg.slice(0,pStrg.lastIndexOf("]"));
	pStrb = pStrb.slice(0,pStrb.lastIndexOf("]"));
	//console.log(pStrg);

	//sum
	for(var i = 1;i<num.length;i++){
		sum += num[i];
		//alert(num[i]);
	}
	for(var i = 1;i<numg.length;i++){
		sumg += numg[i];
		//alert(numg[i]);
	}
	for(var i = 1;i<numb.length;i++){
		sumb += numb[i];
		//alert(numb[i]);
	}
	//alert(sumb);
	
	//var graph = new Array([]);
	var graph = new Array(sum);
	var graphg = new Array(sumg);
	var graphb = new Array(sumb);
	for (var i = 0 ; i < sum ; i++) {
		graph[i] = new Array(sum);
	}
	for (var i = 0 ; i < sumg ; i++) {
		graphg[i] = new Array(sumg);
	}
	for (var i = 0 ; i < sumb ; i++) {
		graphb[i] = new Array(sumb);
	}

	//graph inti
	for(var i = 0;i<sum;i++){
		for(var j = 0;j<sum;j++){
			graph[i][j] = "0";
		}
	}
	for(var i = 0;i<sumg;i++){
		for(var j = 0;j<sumg;j++){
			graphg[i][j] = "0";
		}
	}
	for(var i = 0;i<sumb;i++){
		for(var j = 0;j<sumb;j++){
			graphb[i][j] = "0";
		}
	}
	//alert(graphg[0][1]);
	
	//into
	for(var i = 1;i<sum;i++){
		graph[i][0]=graph[0][i]=jsonStr.nodes[i].name;
		//alert(graph[i][0]);
	}
	for(var i = 1;i<sumg;i++){
		graphg[i][0]=graphg[0][i]=jsonStrg.nodes[i].name;
		//alert(graphg[i][0]);
	}
	for(var i = 1;i<sumb;i++){
		graphb[i][0]=graphb[0][i]=jsonStrb.nodes[i].name;
		//alert(graphb[i][0]);
	}

	//samemovie
	var index = 0;
	for(var i = 1;i<num.length-1;i++){
		index = index + num[i-1];
		for(var j = 1;j<num[i];j++){
			for(var z=j;z<num[i];z++){
				graph[index+j][index+z+1]="1";
			}
		}
	}
	index = 0;
	for(var i = 1;i<numg.length-1;i++){
		index = index + numg[i-1];
		for(var j = 1;j<numg[i];j++){	
			for(var z=j;z<numg[i];z++){
				graphg[index+j][index+z+1]="1";
			}
		}
	}
	index = 0;
	for(var i = 1;i<numb.length-1;i++){
		index = index + numb[i-1];
		for(var j = 1;j<numb[i];j++){
			for(var z=j;z<numb[i];z++){
				graphb[index+j][index+z+1]="1";
			}
		}
	}

	//diffmovie
	for(var i = 1;i<sum;i++){
		for(var j = i+1;j<sum;j++){
			if(jsonStr.nodes[i].user == jsonStr.nodes[j].user){
				if(jsonStr.nodes[i].gender == "female"){			
					graph[i][j] = "2";					//female
				}else if(jsonStr.nodes[i].gender == "male"){	
					graph[i][j] = "3";					//male
				}else{										
					graph[i][j] = "4";					//unknown
				}
				break;
			}
		}
	}
	for(var i = 1;i<sumg;i++){
		for(var j = i+1;j<sumg;j++){
			if(jsonStrg.nodes[i].user == jsonStrg.nodes[j].user){
				graphg[i][j] = "2";					//female
				break;
			}
		}
	}
	for(var i = 1;i<sumb;i++){
		for(var j = i+1;j<sumb;j++){
			if(jsonStrb.nodes[i].user == jsonStrb.nodes[j].user){
				graphb[i][j] = "3";					//male
				break;
			}
		}
	}

	//changjson
	pStr = pStr + '{"source":0,"target":0,"color":"n0"},{"source":0,"target":0,"color":"2"},{"source":0,"target":0,"color":"n2"},{"source":0,"target":0,"color":"0"},{"source":0,"target":0,"color":"n3"},{"source":0,"target":0,"color":"n4"},{"source":0,"target":0,"color":"n5"},{"source":0,"target":0,"color":"n1"},{"source":0,"target":0,"color":"n6"},{"source":0,"target":0,"color":"1"},';
	pStrg = pStrg + '{"source":0,"target":0,"color":"n0"},{"source":0,"target":0,"color":"2"},{"source":0,"target":0,"color":"n2"},{"source":0,"target":0,"color":"0"},{"source":0,"target":0,"color":"n3"},{"source":0,"target":0,"color":"n4"},{"source":0,"target":0,"color":"n5"},{"source":0,"target":0,"color":"n1"},{"source":0,"target":0,"color":"n6"},{"source":0,"target":0,"color":"1"},';
	pStrb = pStrb + '{"source":0,"target":0,"color":"n0"},{"source":0,"target":0,"color":"2"},{"source":0,"target":0,"color":"n2"},{"source":0,"target":0,"color":"0"},{"source":0,"target":0,"color":"n3"},{"source":0,"target":0,"color":"n4"},{"source":0,"target":0,"color":"n5"},{"source":0,"target":0,"color":"n1"},{"source":0,"target":0,"color":"n6"},{"source":0,"target":0,"color":"1"},';
	for(var i = 1;i<sum;i++){
		for(var j = 1;j<sum;j++){
			if(graph[i][j] == "1"){
				pStr = pStr + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":2' + '},';
			}else if(graph[i][j] == "2"){
				pStr = pStr + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":0' + '},';
			}else if(graph[i][j] == "3"){			
				pStr = pStr + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":1' + '},';
			}else if(graph[i][j] == "4"){
				pStr = pStr + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":2' + ',"color":"n2"' + '},';
			}
		}
	}
	for(var i = 1;i<sumg;i++){
		for(var j = 1;j<sumg;j++){
			if(graphg[i][j] == "1"){
				pStrg = pStrg + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":2' + '},';
			}else if(graphg[i][j] == "2"){
				pStrg = pStrg + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":0' + '},';
			}
		}
	}
	//console.log(pStrg);
	for(var i = 1;i<sumb;i++){
		for(var j = 1;j<sumb;j++){
			if(graphb[i][j] == "1"){
				pStrb = pStrb + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":2' + '},';
			}else if(graphb[i][j] == "3"){			
				pStrb = pStrb + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":3' + ',"color":1' + '},';
			}
		}
	}
	//console.log(pStrb);

	//pStr fix 
	pStr = pStr + "]}";
	pStrg = pStrg + "]}";
	pStrb = pStrb + "]}";
	pStr = pStr.slice(pStr.indexOf(',{"name')+1,pStr.lastIndexOf("}")+1);
	pStrg = pStrg.slice(pStrg.indexOf(',{"name')+1,pStrg.lastIndexOf("}")+1);
	pStrb = pStrb.slice(pStrb.indexOf(',{"name')+1,pStrb.lastIndexOf("}")+1);
	pStr = '{"nodes":[' + pStr;
	pStrg = '{"nodes":[' + pStrg;
	pStrb = '{"nodes":[' + pStrb;
	pStr = pStr.replace("},]" , "}]");
	pStrg = pStrg.replace("},]" , "}]");
	pStrb = pStrb.replace("},]" , "}]");
	//console.log(pStr);
	//console.log(pStrg);
	//console.log(pStrb);
	document.getElementById("myjson").innerHTML = pStr;
	document.getElementById("allok").innerHTML = pStrg;
	document.getElementById("seeyou").innerHTML = pStrb;
	//document.getElementById("myjson").innerHTML = JSON.stringify(jsonStr);
}
