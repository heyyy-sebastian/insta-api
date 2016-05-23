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
        var long = results[0].geometry.bounds.j.H;
        var access_token_js = $('#access_token_for_js').val();

        //ajax call to instagram
        //lat/long params
        //success = display photos

        $.ajax({
          method: "GET",
          // url: "https://api.instagram.com/v1/tags/shakeshack/media/recent?access_token="+access_token_js,
          url: "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+long+"&access_token="+access_token_js,
          //insert hidden access token
          dataType: "jsonp",
          success: function(data){
            console.log(data);
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
      geocodeAddress(new google.maps.Geocoder());
    });


});//end wrapper function



