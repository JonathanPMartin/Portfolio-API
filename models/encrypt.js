const bcrypt = require('bcrypt');
const db = require('../helpers/database');
exports.genSalt=async function genSalt(password){
	const saltRounds = 10;
	//var salt="rfefetrg";
	/*bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        
    });
		const salt = bcrypt.genSaltSync(saltRounds);
		
const hash = bcrypt.hashSync(password, salt);
return hash
});
*/
const salt = "$2b$10$j4Y.tSOTs7A.Q7W9uBscXe";
console.log(salt);
const hash = bcrypt.hashSync(password, salt);
return hash
//return password;
}
exports.checkSalt=async function checkSalt(password){

}