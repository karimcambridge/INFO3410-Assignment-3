
/* jshint esversion: 6 */

console.log("require is " + typeof require);

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	let AnimeManager = require('../js/animeManager').AnimeManager;

	function insertTblData() {
		AnimeManager.readFile();
		AnimeManager.writeHTML();
	}
}