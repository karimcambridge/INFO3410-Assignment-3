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