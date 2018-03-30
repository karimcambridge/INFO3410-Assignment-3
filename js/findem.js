(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
(function (global){
/* jshint esversion: 6 */

class Anime{
	constructor(anime_id, name, genre, type, episodes, rating, members){
		this.anime_id = anime_id;
		this.name = name;
		this.genre = genre;
		this.type = type;
		this.episodes = episodes;
		this.rating = rating;
		this.members = members;
	}

	toHTMLRow(){
        let str = "<tr>";

        //iterating the keys of an object
        for(let key in this){
            str += "<td>"+ this[key] +"</td>"; //access the value of that key in the object
        }
        str += "</tr>";
        return str;
    }
}

if(global && module && module.exports){
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
        
        // reads records from pokemon.csv file and store each record as an instance of the Pokemon class
        // Each instance will be stored in the records attribute of the PKManager object
        readFile() {
            const raw_data = fs.readFileSync("assets/anime.csv");
            const raw_records_row = raw_data.split("\n");

            for(let i = 1; i < raw_record_rows.length; i+= 1){
                const rec = raw_record_rows[i];
                const comp = rec.split(",");

                if(comp.length > 5){
                    let p = new Anime(comp[0], comp[1], comp[2], comp[3], comp[4], comp[5], comp[6]);
                    this.records.push(p);
                } //end if
            } //end for
        } //end readFile

        //used the toHTMLRow method of each instance to create the table HTML string
        generateTable() {
            if(this.records.length < 1)
                this.readFile();
            
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
        } //end generateTable

        //Uses the generateTable method and save the code generated to the file "table.html"
        writeHTML() {
            let htmlStr = this.generateTable();
            fs.writeFileSync("table.html", htmlStr);
        }
    }
    module.exports = {
        AnimeManager: AnimeManager
    };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../js/anime":1,"fs":4}],3:[function(require,module,exports){
(function (global){

/* jshint esversion: 6 */

console.log("require is " + typeof require);

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	let AnimeManager = require('../js/animeManager').AnimeManager;

	function insertTblData() {
		AnimeManager.readFile();
		AnimeManager.writeHTML();
	}
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../js/animeManager":2}],4:[function(require,module,exports){

},{}]},{},[3]);
