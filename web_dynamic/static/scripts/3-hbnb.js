$(document).ready(function () {
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
  });
  
  const APIURL = 'http://0.0.0.0:5000/api/v1/status';
    $.get(APIURL, function (data, response) {
      if (response === 'success' && data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  
  $.ajax({
    type:'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
        for (i in data.places) {
            <article>
				<div class="title_box">
					<h2>${data[i].name}</h2>
					<div class="price_by_night">${data[i].price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${data[i].max_guest}</div>
					<div class="number_rooms">${data[i].number_rooms}</div>
					<div class="number_bathrooms">${data[i].number_bathrooms}</div>
				</div>
				<div class="user">
					<b>Owner:</b>${data[i].user.first_name}${data[i].user.last_name}</div>
				<div class="description">
					${data[i].description}
				</div>
			</article>
        }
    }
  })