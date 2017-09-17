//==================== Begin Global Variables ====================
$(document).ready(function() {
  var giftasticObj = {
    tvShows: [
      "Dawn of the Dead",
      "Friday the 13th",
      "The Walking Dead",
      "Freddy Krueger",
      "Night of the Living Dead",
      "Resident Evil",
      "Silent Hill",
      "Texas Chainsaw Massacre",
      "Horror",
      "Zombies"
    ],
    currentSelection: "",
    userInput: "",
    giphyApiUrl: "https://api.giphy.com/v1/gifs/search?",
    giphyApiKey: "MhRRd8fi1u0NVdNjVtDWTM4jGx2hvQgX",
    renderButtons: function() {
      $("#buttonsBar").empty();
      for (var i = 0; i < this.tvShows.length; i++) {
        var a = $("<button>");
        a.addClass("buttons btn btn-danger");
        a.attr("data-name", this.tvShows[i]);
        a.text(this.tvShows[i]);
        $("#buttonsBar").append(a);
      }
      $(".buttons").on("click", function() {
        giftasticObj.currentSelection = $(this).attr("data-name");
        giftasticObj.displayGifs();
      });
    },
    displayGifs: function() {
      console.log(this.currentSelection);
      var tvShowToDisplay = this.currentSelection;
      var queryURL =
        this.giphyApiUrl +
        "&q=" +
        tvShowToDisplay +
        "&limit=12&api_key=" +
        this.giphyApiKey;

      //==================== Begin AJAX Query & Response Store ====================
      $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
        console.log(response);
        $("#gifsWindow").empty();
        for (var i = 0; i < response.data.length; i++) {
          var showObject = response.data[i];
          var showStill = response.data[i].images.fixed_height_small_still.url;
          var showMoving = response.data[i].images.fixed_height_small.url;
          var showRating = response.data[i].rating;
          console.log("Object: " + showObject);
          console.log("Still: " + showStill);
          console.log("Moving: " + showMoving);
          console.log("Rating: " + showRating);
          var showDiv = $("<div class='show col-md-4'>");
          var pOne = $("<p>").text("Rating: " + showRating);
          showDiv.append(pOne);
          var image = $("<img>").attr("src", showStill);
          image.addClass("myShowImage");
          image.attr("data-still", showStill);
          image.attr("data-moving", showMoving);
          showDiv.append(image);
          $("#gifsWindow").append(showDiv);
        }
        //==================== End AJAX Query & Response Store ====================

        //==================== Begin Gif Click to Animate ====================
        $(".myShowImage").on("click", function() {
          if ($(this).attr("src") == $(this).attr("data-still")) {
            $(this).attr("src", $(this).attr("data-moving"));
          } else if ($(this).attr("src") == $(this).attr("data-moving")) {
            $(this).attr("src", $(this).attr("data-still"));
          }
        });
        //==================== End Gif Click to Animate ====================
      });
    }
  };

  //==================== Begin Application Settings ====================
  $("#addTvShow").on("click", function() {
    giftasticObj.userInput = $("#tvShowInput")
      .val()
      .trim();
    if (giftasticObj.userInput != "") {
      giftasticObj.tvShows.unshift(giftasticObj.userInput);
      giftasticObj.renderButtons();
    }
    $("input#tvShowInput").val("");
    return false;
  });
  //==================== End Application Settings ====================

  giftasticObj.renderButtons();

  //==================== End Global Variables ====================
});
