exports.clean=function clean(data){
	console.log(data)
	const Blacklist=[" ","(",")","'",'"',"--","#"]
	Return =true;
	var dataString=String(data)
	for(var item in Blacklist){
		console.log(item)
		if(dataString.includes(Blacklist[item])){
			console.log(item)
			Return=false;
		}
	}
	return Return;
}
