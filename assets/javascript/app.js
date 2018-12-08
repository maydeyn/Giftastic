$(document).ready(function() {
  // Variables
  var movies = [
    "Bohemian Rhapsody",
    "Venom",
    "Crazy Rich Asians",
    "A Star is Born",
    "Deadpool",
    "Black Panther",
    "Ready Player One"
  ];
  // Functions
  function displayMovieInfo() {
    var movie = $(this).attr("data-name");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      movie +
      "&limit=10&api_key=YzfDBOYxh1fD4LYdSEJB4lrJvZBqzOfU";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#movies-view").text(JSON.stringify(response));

      var gifResponse = response.data;

      for (var i = 0; i < gifResponse.length; i++) {
        var gifPreview = $("<img>");
        gifPreview.addClass("gif");
        gifPreview.attr("src", gifResponse[i].images.fixed_height_still.url);
        gifPreview.attr(
          "data-still",
          gifResponse[i].images.fixed_height_still.url
        );
        gifPreview.attr("data-animate", gifResponse[i].images.fixed_height.url);
        gifPreview.attr("data-state", "still");

        // new div to display gif rating
        var newDiv = $("<div>");

        var gifRated = gifResponse.data[i].Rated;
        var gifRatedDisplay = $("<p>").text("Rating: " + gifRated);

        newDiv.append(gifRatedDisplay);
      }
    });
  }
  // create buttons
  function renderButtons() {
    // deleting previous gifs when new button is clicked
    $("#gifButtonsView").empty();

    for (var i = 0; i < movies.length; i++) {
      var newBtn = $("<button>");
      newBtn.addClass("movie-btn");
      newBtn.addClass("btn btn-primary");
      newBtn.attr("data-name", movies[i]);
      newBtn.text(movies[i]);
      $("#gifButtonsView").append(newBtn);
    }
  }

  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input")
      .val()
      .trim();
    movies.push(movie);
  });

  renderButtons();

  $("#gifsView").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $(document).on("click", ".movie-btn", displayMovieInfo);
  renderButtons();
}); //document ready closing
