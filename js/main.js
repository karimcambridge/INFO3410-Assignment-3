<<<<<<< HEAD
if (typeof global !== "undefined" && typeof require !== "undefined"){ // to accomodate difference between node and the browser
    const fs = require('fs');
    const AnimeManager = require('animeManger').AnimeManager;
=======
/* jshint esversion: 6 */
>>>>>>> bdbec1c66fca10eb878e2bc713105d6c568357a9

console.log(typeof global);

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	let AnimeManager = require('animeManger').AnimeManager;

	function insertTblData() {
		AnimeManager.readFile();
		AnimeManager.writeHTML();
	}
}