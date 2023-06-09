/**
 * A module used for all calls to the table purchases in the database
 * Uses setup in /helpers/database for this function
 * @module models/purchases
 * @author Jonathan Martin
 * @see helpers/database for the models that require this module
 */

const db = require('../helpers/database');

/**
 * adds a new purchases to the database
 * @param {string} currency 3 letter code for the currency
 * @param {number} amount the amount of currency being added
 * @param {date|string} DoP Date of Purchase
 * @param {string|number} portid portid the purchase belongs to
 * @returns {object} object containing success message
 */
exports.add=async function add(currency,amount,DoP,portid){
	let query="insert INTO purchases(currency,amount,DoP,portid) values(?,?,?,?)"
	let values=[currency,amount,DoP,portid];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * gets purchases by portid
 * @param {string|number} PortId portid of the purchases
 * @returns {object} object of all purchases found
 */
exports.getbyportid=async function getbyportid(PortId){
	let query="select * from purchases where portid =?";
	let values=[PortId];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * deletes purchases by id
 * @param {string|number} PurId id of the purchase
 * @returns {object} object containing success message
 */
exports.deletePur=async function deletePur(PurId){
		let query="DELETE from purchases where id =?"
	let values=[PurId]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * deletes purchases by PortId
 * @param {string|number} PortId portid of the purchases
 * @returns {object} object containing success message
 */
exports.deletePurByPortId=async function deletePurByPortId(PortId){
		let query="DELETE from purchases where portid =?"
	let values=[PortId]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * updates purchase
 * @param {string} currency 3 letter code for the currency
 * @param {number} amount the amount of currency being added
 * @param {date|string} DoP Date of Purchase
 * @param {string|number} id id of the purchase
 * @returns {object} object containing success message
 */
exports.UpdatePur=async function UpdatePur(currency,amount,DoP,id){
	let query="UPDATE purchases set currency=?, amount=?, DoP=? WHERE id=?";
	let values=[currency,amount,DoP,id]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * gets purchases by id
 * @param {string|number} id id of the purchase
 * @returns {object} object of all purchases found
 */
exports.GetById=async function GetById(id){
	let query="select * from purchases where id =?";
	let values=[id]
	let data = await db.run_query(query, values);
	return data;

}