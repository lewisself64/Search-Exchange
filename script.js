$(document).ready(function() {
	document.getElementById("answer-container").innerHTML = localStorage.getItem("last_search_answers");
	document.getElementById("search").value = localStorage.getItem("last_search");

	$('#search-button').click(function() {
		// Clear answer container
		$("#answer-container").html();

		// Get the users search request
		var search_term = $('#search').val();

		// Create a new HTTP Request
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var answers = "<h2>Answers</h2>";

				var object = JSON.parse(this.responseText);

				for(var i = 0; i < object.items.length; i++) {
					item = object.items[i];
					var score_color = "";

					if(item.score < 0) {
						score_color = "red";
					} else if (item.score > 5) {
						score_color = "dark green";
					} else {
						score_color = "black";
					}

					answers += "<a href='" + item.link + "' target='_blank'>" + item.title + "</a><br /> ";
					answers += "<table style='width:100%; font-size:100%;'><tr><td>Views: " + item.view_count + "</td><td>Answers: " + item.answer_count  + "</td><td style='color:" + score_color + "'>Score: " + item.score  + "</td></tr><tr><td colspan='3' style='font-weight:bold;'>" + item.owner.display_name + "</td></tr></table>";
					answers += "<hr style='margin:10px 0;' />";
				}

				localStorage.setItem("last_search", search_term);
				localStorage.setItem("last_search_answers", answers);

				document.getElementById("answer-container").innerHTML = answers;
			}
		}

		xhttp.open("GET", "http://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=" + search_term + "&site=stackoverflow", true);
		xhttp.send();
	});
});