/* jshint esversion: 6 */

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
    let fs = require('fs');
    const Anime = require('../js/anime').Anime;

    class AnimeManager {
        constructor() {
            this.records = [];
        }
        
        // reads records from anime.csv file and store each record as an instance of the anime class
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
                } //end if
            } //end for
        } //end readFile

        //used the toHTMLRow method of each instance to create the table HTML string
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
        } //end generateTable

        //Uses the generateTable method and save the code generated to the file "table.html"
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