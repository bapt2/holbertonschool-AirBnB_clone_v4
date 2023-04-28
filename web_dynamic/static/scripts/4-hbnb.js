$(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    if ($(this).prop('checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    let text = '';
    for (const amenity in amenities) {
      text += amenities[amenity] + ', ';
    }
    text = text.slice(0, -2); // remove last comma and space
    $('div.amenities h4').text(text);
  });

  const APIURLL = 'http://0.0.0.0:5000/api/v1/places_search';
  function searchPlaces() {
    $.ajax({
      url: APIURLL,
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: 'application/json',
      success: function (data) {
        $('section.places').empty();
        data.forEach(function (place) {
          const article = $('<article>').addClass('place');
          const title = $('<h2>').text(place.name);
          const price = $('<div>').addClass('price_by_night').text(`$${place.price_by_night}`);
          const info = $('<div>').addClass('information');
          const maxGuests = $('<div>').addClass('max_guest').text(`${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}`);
          const numberRooms = $('<div>').addClass('number_rooms').text(`${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}`);
          const numberBathrooms = $('<div>').addClass('number_bathrooms').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}`);
          const description = $('<div>').addClass('description').text(place.description);
          info.append(maxGuests, numberRooms, numberBathrooms);
          article.append(title, price, info, description);
          $('section.places').append(article);
        });
      }
    });
  }

  $('button').click(searchPlaces);

  const APIURL = 'http://0.0.0.0:5000/api/v1/status';
  $.get(APIURL, function (data, response) {
    if (response === 'success' && data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
