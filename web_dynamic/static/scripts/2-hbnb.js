$(document).ready(function() {
    let amenities = {};
  
    $('input[type="checkbox"]').change(function() {
      if ($(this).prop('checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      let text = '';
      for (let amenity in amenities) {
        text += amenities[amenity] + ', ';
      }
      text = text.slice(0, -2); // remove last comma and space
      $('div.amenities h4').text(text);      
    });
  });

  $(document).ready(function() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if($(data.status = 'OK')) {
          ('DIV#api_status').addClass('available')
        } else {
          ('DIV#api_status').removeClass('available')
        }
      })
  });
