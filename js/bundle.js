require=(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
(function (global){
/* jshint esversion: 6 */

class Anime {
	constructor(anime_id, name, genre, type, episodes, rating, members){
		this.anime_id = anime_id;
		this.name = name;
		this.genre = genre;
		this.type = type;
		this.episodes = episodes;
		this.rating = rating;
		this.members = members;
	}

	toHTMLRow() {
        let str = "<tr>";

        //iterating the keys of an object
        for(let key in this){
            str += "<td>"+ this[key] +"</td>"; //access the value of that key in the object
        }
        str += "</tr>";
        return str;
    }
}

if(global && module && module.exports) {
    module.exports = {
        'Anime': Anime
    };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
/* jshint esversion: 6 */

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	const fs = require('fs');
	const Anime = require('../js/anime').Anime;

	class AnimeManager {
		constructor() {
			this.records = [];
		}
		
		// Reads records from anime.csv file and store each record as an instance of the anime class
		// Each instance will be stored in the records attribute of the animeManager object
		readFile() {
			let raw_data = fs.readFileSync("assets/anime.csv") + '';
			let raw_records_row = raw_data.split("\n");

			for(let i = 1; i < raw_records_row.length; i++) {
				let rec = raw_records_row[i] + '';
				let comp = rec.split(",");

				if(comp.length > 5) {
					let p = new Anime(comp[0], comp[1], comp[2], comp[3], comp[4], comp[5], comp[6]);
					this.records.push(p);
				} // end if
			} // end for
		} // end readFile

		// used the toHTMLRow method of each instance to create the table HTML string
		generateTable() {
			let htmlStr = "<table>";
			htmlStr += "<thead><tr><th>ID</th><th>Name</th>";
			htmlStr += "<th>Genre</th><th>Type</th><th>Episodes</th>";
			htmlStr += "<th>Rating</th><th>Members</th>";
			htmlStr += "</tr></thead></tbody>";

			this.records.forEach(rec => {
				htmlStr += rec.toHTMLRow();
			});
			htmlStr += "</tbody></table>";
			return htmlStr;
		} // end generateTable

		// Uses the generateTable method and save the code generated to the file "table.html"
		writeHTML() {
			let htmlStr = this.generateTable();
			console.log(htmlStr);
			fs.writeFileSync("table.html", htmlStr);
		}
	}
	module.exports = {
		AnimeManager: AnimeManager
	};
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../js/anime":1,"fs":"browserify-fs"}],3:[function(require,module,exports){
(function (global){

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../js/animeManager.js":2}],"browserify-fs":[function(require,module,exports){

},{}]},{},[3]);
