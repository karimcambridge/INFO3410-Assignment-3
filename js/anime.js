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