$(document).ready(function() {

var horrorStuff = ["Friday the 13th", "Cabin in the Woods", "Slither", "Halloween", "Evil Dead", "Phantasm", "Nightmare on Elm Street"];


function makeButtons() {
    $("#buttonsHere").empty();
    for (var i = 0; i < horrorStuff.length; i++) {
        var b = $("<button>");
        b.attr("id", "horrorBtn");
        b.attr("data-name", horrorStuff[i]);
        b.text(horrorStuff[i]);
        $("#buttonsHere").append(b);
    }

    $("button").on("click", function() {
        // console.log("I work");
        $("#gifsHere").empty();
        var name = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=DrOwP7rdNFPPf0xwpmQKJNw9HmfY0Oa3&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
         .then(function(response) {
            //  console.log(response);
             var results = response.data;
                for(var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var horrorImg = $("<img>");
                    horrorImg.attr("data-animate", results[i].images.fixed_height.url);
                    horrorImg.attr("data-still", results[i].images.fixed_height_still.url);
                    horrorImg.attr("src", results[i].images.fixed_height_still.url);
                    horrorImg.attr("data-state", "still");
                    horrorImg.addClass("gif");
                    gifDiv.append(p);
                    gifDiv.append(horrorImg);
                    $("#gifsHere").prepend(gifDiv);
                }

                $(".gif").on("click", function() {
                    console.log("I work")
                   var state = $(this).attr("data-state");
                       if(state === "still") {
                           $(this).attr("src", $(this).attr("data-animate"));
                           $(this).attr("data-state", "animate");
                       }else {
                           $(this).attr("src", $(this).attr("data-still"));
                           $(this).attr("data-state", "still");
                       }
               });
         });
       
    });
};

$("#add-horror").on("click", function(event) {
    event.preventDefault();
    var horror = $("#horror-input").val().trim();
    horrorStuff.push(horror);
    makeButtons();
    $("#horror-input").val("");
});


makeButtons();

})