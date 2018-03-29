/* jshint esversion: 6 */

console.log(typeof global);

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	let AnimeManager = require('animeManger').AnimeManager;

	function insertTblData() {
		AnimeManager.readFile();
		AnimeManager.writeHTML();
	}
}