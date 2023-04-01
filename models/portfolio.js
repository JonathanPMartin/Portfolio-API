/**
 * A module used for all calls to the table portfolio in the database
 * Uses setup in /helpers/database for this function
 * @module models/portfolio
 * @author Jonathan Martin
 * @see helpers/database for the models that require this module
 */
const db = require('../helpers/database');
/**
 * adds a new portfolio to the database
 * @param {string} Name Name of the portfolio 
 * @param {string|number} UserId userid of the owner of the portfolio
 * @returns {object} object containing success message
 */
exports.add=async function add(Name,UserId){
	let query="insert INTO portfolio(PortName,UserId) values(?,?)"
	let values=[Name,UserId];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * gets portfolio by id
 * @param {string|number} id id of the portfolio
 * @returns {object} portfolio where id = id 
 */
exports.get=async function get(id){
	let query="select * from portfolio where id =?";
	let values=[id];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * gets portfolio by userid
 * @param {string|number} userid id of the user
 * @returns {object} portfolio where UserId = userid 
 */
exports.getbyUser= async function getbyUser(userid){
	let query="select * from portfolio where UserId=?";
	let values=[userid];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * deletes portfolio by id
 * @param {string|number} id id of the portfolio
 * @returns {object} object containing success message
 */
exports.deletePort=async function deletePort(PortId){
		let query="DELETE from portfolio where id =?"
	let values=[PortId]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * deletes portfolio where UserId=userid
 * @param {string|number} userid userid of the portfolio
 * @returns {object} object containing success message
 */
exports.deletePortByUserId=async function deletePortByUserId(UserId){
		let query="DELETE from portfolio where UserId =?"
	let values=[UserId]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * updates portfolio name
 * @param {string} name name of the portfolio
 * @param {string|number} id id of the portfolio
 * @returns {object} object containing success message
 */
exports.update=async function update(name,id){
	let query="update portfolio set PortName=? where id=? "
	let values=[name,id]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * updates portfolio owner
 * @param {string|number} userid userid of the new owner
 * @param {string|number} id id of the portfolio
 * @returns {object} object containing success message
 */
exports.updateOwner=async function updateOwner(userid,id){
	let query="update portfolio set UserId=? where id=? "
	let values=[userid,id]
	let data = await db.run_query(query, values);
  return data;
}