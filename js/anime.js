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
        let str = "<tr>";

        //iterating the keys of an object

        for(let key in this){
            str += "<td>"+ this[key] +"</td>"; //access the value of that key in the object
            if(key == "rating"){
                currentRating = parseInt(this[key]);
            }
            //console.log(key);
        }
        if(currentRating >= 7 ) {
            str += "<td><img src='happyface.png' alt='' border=3 height=20 width=20></img> </td>";
        } else if (currentRating >= 5){
            str += "<td><img src='neutralface.png' alt='' border=3 height=20 width=20></img> </td>";
        } else if (currentRating >= 1){
            str += "<td><img src='frownface.png' alt='' border=3 height=20 width=20></img> </td>";
        } else {
            str += "<td><img src='thinkingface.png' alt='' border=3 height=20 width=20></img> </td>";
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