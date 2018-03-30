
/* jshint esversion: 6 */

console.log("require is " + typeof require + "   global is " + typeof global);

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	const AnimeManager = require('../js/animeManager.js').AnimeManager;

	let testManager = new AnimeManager();

	console.log("AnimeManager is " + typeof testManager + "   testManager is " + testManager);

	testManager.readFile();
	testManager.writeHTML();
	console.log("written to html");
}