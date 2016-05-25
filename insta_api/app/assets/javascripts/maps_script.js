$(function() {
  console.log( "ready!" );



//create a new geocoder object and add click function to trigger
//ajax call to google maps api
  // function initMap() {
  //   var geocoder = new google.maps.Geocoder();
  // }
  // initMap()

//latitude/longitude extraction triggers ajax call
  function geocodeAddress(geocoder) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);
        console.log(results[0].geometry.bounds.H.H);//extracts latitude
        console.log(results[0].geometry.bounds.j.H);//extracts longitude
        var lat = results[0].geometry.bounds.H.H;
        var lng = results[0].geometry.bounds.j.H;
        var access_token_js = $('#access_token_for_js').val();

        //ajax call to instagram
        //lat/long params
        //success = display photos

        url = "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+lng+"&access_token="+access_token_js

        $.ajax({
          method: "GET",
          // url: "https://api.instagram.com/v1/tags/shakeshack/media/recent?access_token="+access_token_js,
          url: url,
          //insert hidden access token
          dataType: "jsonp",
          success: function(data){
            var stuff = data['data'];
            var response = data;
          console.log(response);
          $('.grid').empty();
            for (i = 0; i < response['data'].length; i++){
              $('.grid').append("<img class='img-pad' src=" + '"' + response['data'][i]['images']['low_resolution']['url']+ '"' + ">")
              // $('.thebody').append("<img src=" + '"' + response['data'][i]['images']['standard_resolution']['url']+ '"' + ">")
             }//end for loop
            //data.forEach(function(entry){
            //})//end function to pull out img urls


            // masonry
            var $grid = $('.grid').masonry({
              itemSelector: 'img',
              columnWidth: 320,
            });
            // layout Masonry after each image loads
            $grid.imagesLoaded().progress( function() {
              $grid.masonry('layout');
            });
          }//end success function

        });//end ajax call

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }




//create a new geocoder object and add click function to trigger
//ajax call to google maps api
    document.getElementById('submit').addEventListener('click', function() {
      var g = new google.maps.Geocoder();
      geocodeAddress(g);
    });


});//end wrapper function



