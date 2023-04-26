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
$.ajax({
    url: APIURLL,
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      // Loop into the result of the request and create an article tag for each place
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

/*$(function() {
    $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5000/api/v1/views/places_search',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      for (const i in data.places) {
        <article>
          <div class='title_box'>
            <h2>${data[i].name}</h2>
            <div class='price_by_night'>${data[i].price_by_night}</div>
          </div>
          <div class='information'>
            <div class='max_guest'>${data[i].max_guest}</div>
            <div class='number_rooms'>${data[i].number_rooms}</div>
            <div class='number_bathrooms'>${data[i].number_bathrooms}</div>
          </div>
          <div class='user'>
            <b>Owner:</b>${data[i].user.first_name}${data[i].user.last_name}
          </div>
          <div class='description'>
            ${data[i].description}
          </div>
        </article>;
      }
    }
  });
})
*/
const APIURL = 'http://0.0.0.0:5000/api/v1/status';
  $.get(APIURL, function (data, response) {
    if (response === 'success' && data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});