makePostCall = function(url, data, callback) {
  var json_data = JSON.stringify(data);
    $.ajax({
    type: "POST",
    url: url,
    data: json_data,
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(response) {
      callback(response)
    },
    error: function() {
      alert("Information invalid.  Please try again")
    }
  });
}

makeGetCall = function(url, data, callback) {
  var json_data = JSON.stringify(data);
    $.ajax({
    type: "GET",
    url: url,
    data: data,
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(response) {
      callback(response)
    },
    error: function() {
      alert("Information invalid.  Please try again")
    }
  });
}

makeMailerCall = function(url, data) {
  var json_data = JSON.stringify(data);
    $.ajax({
    type: "POST",
    url: url,
    data: json_data,
    contentType: "application/json;charset=utf-8",
    error: function() {
      alert('Your email is on its way!')
    }
  });
}
