window.onload=build();
function build(){
	var pStr = document.getElementById("myjson").innerHTML;
	var jsonStr = JSON.parse(pStr);
	pStr = pStr.slice(0,pStr.lastIndexOf("["));
	//sort nodes
	jsonStr.nodes.sort(function(a,b){
		if(a.name < b.name ) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	});
	//generate links  //jsonStr.nodes[0].name;
	//while(1){
	pStr = pStr + '{"source":' + ',"target":' + ',"weight":' + ',"color":';
	//}
	pStr = pStr + "]}";
	document.getElementById("myjson").innerHTML = pStr;
	//document.getElementById("myjson").innerHTML = JSON.stringify(jsonStr);
}
