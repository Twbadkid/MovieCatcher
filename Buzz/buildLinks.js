window.onload=build();
function build(){
	var pStr = document.getElementById("myjson").innerHTML;
	var jsonStr = JSON.parse(pStr);
	
	//sort nodes
	jsonStr.nodes.sort(function(a,b){
		if(a.name < b.name ) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	});
	pStr = pStr.slice(pStr.indexOf('{"name'),pStr.lastIndexOf("}")+1);
	//document.getElementById("myjson").innerHTML = pStr;
	pStr = '{"nodes":[' + '{"name":"???","group":"???"},' + pStr;
	jsonStr = JSON.parse(pStr);
	pStr = pStr.slice(0,pStr.lastIndexOf("]"));

	//generate links  //jsonStr.nodes[0].name;
	var num = new Array;
	var sum = 1;
	num[0]=0;
	//countnum
	for(var i=1, current=1;i<jsonStr.nodes.length;i++){
		for(var j = i;j<jsonStr.nodes.length;j++){
			if(jsonStr.nodes[i].name == jsonStr.nodes[i-1].name){
				break;
			}else{
				if(jsonStr.nodes[i].name == jsonStr.nodes[j].name){
					num[current]>0?num[current]++:num[current] = 1;
				}else{
					current++;
					break;
				}
			}
		}
		//alert(num[3]);
	}
	for(var i = 1;i<num.length;i++){
		sum += num[i];
		//alert(num[i]);
	}
	//alert(sum);
	//var graph = new Array([]);
	var graph = new Array(sum);
	for (var i = 0 ; i < sum ; i++) {
		graph[i] = new Array(sum);
	}

	for(var i = 0;i<sum;i++){
		for(var j = 0;j<sum;j++){
			graph[i][j] = "0";
			//alert("graph inti");
		}
	}
	//alert(graph[0][1]);
	//into
	for(var i = 1;i<sum;i++){
		graph[i][0]=graph[0][i]=jsonStr.nodes[i].name;
		//alert(graph[i][0]);
	}
	//samemovie
	var index = 0;
	for(var i = 1;i<num.length-1;i++){
		index = index + num[i-1];
		for(var j = 1;j<num[i];j++){
			graph[index+j][index+j+1]="1";
		}
	}
	//diffmovie
	for(var i = 1;i<sum;i++){
		for(var j = i+1;j<sum;j++){
			if(jsonStr.nodes[i].group == jsonStr.nodes[j].group){
				graph[i][j] = "2";
			}
		}
	}
	//changjson
	for(var i = 1;i<sum;i++){
		for(var j = 1;j<sum;j++){
			if(graph[i][j] == "1"){
				pStr = pStr + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":1' + ',"color":' + '},';
			}else if(graph[i][j] == "2"){
				pStr = pStr + '{"source":' + (i-1) + ',"target":' + (j-1) + ',"weight":2' + ',"color":' + '},';
			}
		}
	}
	
	//pStr = pStr + '{"source":' + ',"target":' + ',"weight":' + ',"color":';
	
	pStr = pStr + "]}";
	pStr = pStr.slice(pStr.indexOf(',{"name')+1,pStr.lastIndexOf("}")+1);
	pStr = '{"nodes":[' + pStr;
	pStr = pStr.replace("},]" , "}]");
	document.getElementById("myjson").innerHTML = pStr;
	//document.getElementById("myjson").innerHTML = JSON.stringify(jsonStr);
}

