/**
 * A module used to clean data being passed to the API
 * @module controllers/clean
 * @author Jonathan Martin
 */

/**
 * Cleans Data
 * @param {string} Data A long string of all the data being passed in that call to the API
 * @returns {boolean} a boolean indicator of if the data is clean or not
 */
exports.clean=function clean(data){
	//console.log(data)
	const Blacklist=[" ","(",")","'",'"',"--","#"]
	Return =true;
	var dataString=String(data)
	for(var item in Blacklist){
		//console.log(item)
		if(dataString.includes(Blacklist[item])){
			//console.log(item)
			Return=false;
		}
	}
	return Return;
}
