makePostCall = function(url, data, callback) {
  var json_data = JSON.stringify(data);
    return $.ajax({
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
