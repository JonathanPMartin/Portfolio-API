/**
 * A module used for all encryption used in the coursework
 * @module models/encrypt
 * @author Jonathan Martin
 * @see models/users for the models that require this module
 */

const bcrypt = require('bcrypt');
const db = require('../helpers/database');
/**
 * Generates a hashed password
 * @param {string} password pre-hashed
 * @returns {string}  the hashed password
 */
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