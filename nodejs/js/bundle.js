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
		let currentRating = 0;
		let str = "<tr data-toggle=\"modal\" data-target=\"#modalAnime\" data-id=\"" + this.anime_id + "\" ";
		str += "data-name=\"" + this.name + "\" ";
		str += "data-genre=\"" + this.genre + "\" ";
		str += "data-type=\"" + this.type + "\" ";
		str += "data-episodes=\"" + this.episodes + "\" ";
		str += "data-rating=\"" + this.rating + "\" ";
		str += "data-members=\"" + this.members + "\"";
		str += ">";
		console.log(str);

		//iterating the keys of an object

		for(let key in this) {
			if(key === "anime_id") {
				str += "<th scope='row'>" + this[key] + "</th>"; // access the value of that key in the object
			} else {
				str += "<td>" + this[key] + "</td>"; // access the value of that key in the object
			}
			if(key == "rating") {
				currentRating = parseInt(this[key]);
			}
			//console.log(key);
		}
		if(currentRating >= 7) {
			str += "<td><img src='happyface.png' alt='' border=3 height=20 width=20></img></td>";
		} else if(currentRating >= 5) {
			str += "<td><img src='neutralface.png' alt='' border=3 height=20 width=20></img></td>";
		} else if(currentRating >= 1) {
			str += "<td><img src='frownface.png' alt='' border=3 height=20 width=20></img></td>";
		} else {
			str += "<td><img src='thinkingface.png' alt='' border=3 height=20 width=20></img></td>";
		}
		str += "</tr>";
		return str;
	}
}

$(document).ready(function() {
	$('#modalAnime').on('show.bs.modal', function(event){
		console.log("show");

		let animeId = $(event.relatedTarget).data("id");
		let name = $(event.relatedTarget).data("name");
		let genre = $(event.relatedTarget).data("genre");
		let type = $(event.relatedTarget).data("type");
		let episodes = $(event.relatedTarget).data("episodes");
		let rating = $(event.relatedTarget).data("rating");
		let members = $(event.relatedTarget).data("members");

		$("#animeId").html('Anime ID: ' + animeId);
		$("#animeName").html('Name: ' + name);
		$("#animeGenre").html('Genre: ' + genre);
		$("#animeType").html('Type: ' + type);
		$("#animeEpisodes").html('Episodes: ' + episodes);
		$("#animeRating").html('Rating: ' + rating);
		$("#animeMembers").html('Members: ' + members);
	});

	$('#modalAnime').on('shown.bs.modal', function () {
	  $('#modalAnime').focus();
		console.log("shown");
	});
});

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
		
		readFile() {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if(xhr.readyState == 4 && xhr.status === 200) {
					this.records = parseArray(xhr.responseText); // Here we call function with parameter "lines*"
					document.getElementById("divTableAnime").innerHTML = generateTable(this.records);
				}
			};
			xhr.open("GET", "assets/anime.csv", true);
			xhr.send();
			return;
		}

		/*// Reads records from anime.csv file and store each record as an instance of the anime class
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

		// Uses the generateTable method and save the code generated to the file "table.html"
		writeHTML() {
			let htmlStr = this.generateTable();
			console.log(htmlStr);
			fs.writeFileSync("table.html", htmlStr);
		}*/
	}

	function parseArray(lines) {
		let raw_records_row = lines.split('\n');
		let records = []; 

		for(let i = 1; i < raw_records_row.length; i++) {
			let rec = raw_records_row[i];
			if(!rec) continue;
			let comp = CSVtoArray(rec);

			let p = new Anime(comp[0], comp[1], comp[2], comp[3], comp[4], comp[5], comp[6]);
			records.push(p);
		}
		return records;

	}

	// Return array of string values, or NULL if CSV string not well formed.
	function CSVtoArray(text) {
		let re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
		let re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
		// Return NULL if input string is not well formed CSV string.
		if(!re_valid.test(text)) return null;
		let a = [];                     // Initialize array to receive values.
		text.replace(re_value, // "Walk" the string using replace with callback.
			function(m0, m1, m2, m3) {
				// Remove backslash from \' in single quoted values.
				if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
				// Remove backslash from \" in double quoted values.
				else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
				else if (m3 !== undefined) a.push(m3);
				return ''; // Return empty string.
			});
		// Handle special case of empty last value.
		if(/,\s*$/.test(text)) a.push('');
		return a;
	}

	// used the toHTMLRow method of each instance to create the table HTML string
	function generateTable(records) {
		console.log('# of records loaded: ' + records.length + '.');

		let htmlStr = "<table id='tableAnime' class='table table-striped table-bordered table-hover'>";
		htmlStr += "<caption>List of anime programmes</caption>";
		htmlStr += "<thead class='thead-dark'><tr>";
		htmlStr += "<th scope='col'>ID</th>";
		htmlStr += "<th scope='col'>Name</th>";
		htmlStr += "<th scope='col'>Genre</th>";
		htmlStr += "<th scope='col'>Type</th>";
		htmlStr += "<th scope='col'>Episodes</th>";
		htmlStr += "<th scope='col'>Rating</th>";
		htmlStr += "<th scope='col'>Members</th>";
		htmlStr += "<th scope='col'>Icon</th>";
		htmlStr += "</tr></thead><tbody>";
		records.forEach(rec => {
			htmlStr += rec.toHTMLRow();
		});
		htmlStr += "</tbody></table>";
		return htmlStr;
	} // end generateTable

	/*
	$(document).ready(function(){
		function myFunction(x) {
			alert("Row index is: ");
		}
	})
	*/
	module.exports = {
		AnimeManager: AnimeManager
	};

}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../js/anime":1,"fs":"browserify-fs"}],3:[function(require,module,exports){
(function (global){

/* jshint esversion: 6 */
//----------------------------------

console.log("require is " + typeof require + "   global is " + typeof global);

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	const AnimeManager = require('../js/animeManager.js').AnimeManager;

	testManager = new AnimeManager();

	console.log("AnimeManager is " + typeof testManager + " | testManager is " + testManager);

	testManager.readFile();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../js/animeManager.js":2}],"browserify-fs":[function(require,module,exports){

},{}]},{},[3]);
