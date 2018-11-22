$(document).ready(function() {

    // Variables
    var movies = ["Bohemian Rhapsody", "Venom", "Crazy Rich Asians", "A Star is Born", "Deadpool", "Black Panther", "Ready Player One"];


    // Function
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < movies.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("movie");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", movies[i]);
            gifButton.text(movies[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new movie button
        $("#addGif").on("click", function(event){
            event.preventDefault();

        var movie = $("#movie-input").val().trim();
        if (movie == ""){
          return false;
        }
        movies.push(movie);
    
        displayGifButtons();

    });

    function displayGifs(){
        var movie = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results === ""){
              alert("We couldn't find any Gifs! :(");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                // gifDiv.addClass("gifDiv");

                // rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.prepend(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 

                //image state
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.prepend(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); 
    // addNewButton();


    // pausing Gifs
    $(document).on("click", ".movie", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).data('state');
        if ( state === 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    
});