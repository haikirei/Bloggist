/////////////////////////////////////////////
// HAMBURGER
/////////////////////////////////////////////
/*!
 * Hamburger Animation
 * https://codepen.io/ahmadbassamemran/pen/VQwPGr
 * (c) Ahmad Emran
 */

const icons = document.querySelectorAll('.icon');
icons.forEach (icon => {  
  icon.addEventListener('click', (event) => {
    icon.classList.toggle("open");
  });
});

/////////////////////////////////////////////
// NAVBAR
/////////////////////////////////////////////
/*!
 * Mobile Navbar Toggle
 * https://itnext.io/how-to-build-a-responsive-navbar-using-flexbox-and-javascript-eb0af24f19bf
 * (c) Sukhijinder Arora
 */

let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('active');
});

/////////////////////////////////////////////
// GIPHY API
/////////////////////////////////////////////
/*!
 * GIPHY API
 * https://codepen.io/ATwrx
 * (c) Atwrx
 */

// Initial Search Buttons
var topics = ["Inuyasha", "Game of Thrones", "The Flash"];
function addSearchBtns() {
  $("#buttons").html("");
  for (i = 0; i < topics.length; i++) {
    var $button = $("<input type='button' class='btn btn-sm search-btn' />");
    $button.val(topics[i]);
    $("#buttons").append($button);
  }
}
addSearchBtns();

$(document).on("click", ".btn", function() {
  $("#results").html("");
  // Beginning API call
  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  var query;
  var params = {
    q: query,
    limit: 10,
    api_key: "G30V6OUj5XaGZBzcczNrk3J0p4AINx2Q",
    fmt: "json"
  };
  if ($(this).hasClass("search-btn")) {
    query = $(this).val();
  } else if ($("#user-search").val() !== "") {
    query = $("#user-search").val();
    topics.push(query);
    if (topics.length > 6) {
      topics.shift();
    }
    addSearchBtns();
  }
  params.q = query;

  if ($(this).hasClass("trending")) {
    queryURL = "https://api.giphy.com/v1/gifs/trending?";
    delete params.q;
  }
  $.ajax({
    url: queryURL + $.param(params),
    method: "GET",
    success: function(r) {
      for (i = 0; i < params.limit; i++) {
        var $img = $("<img>");
        var $div = $("<div>");
        var gifObj = r.data[i];
        var gif = gifObj.images;

        // Image builder object
        $img.attr({
          // "width": "200px",
          src: gif.fixed_height.url,
          "data-animate": gif.fixed_height.url,
          "data-still": gif.fixed_height.url,
          "data-state": "animate",
          class: "gif"
        });
        // $div.attr("id", "gif-" + i);
        $div.addClass("gif-box");
        $div.append($img);
        $("#results").append($div);
      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    }
  });
});