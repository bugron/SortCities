$(document).ready(function() {
  //Make the table sortable
  $(function(){
    $('#keywords').tablesorter(); 
  });
  
  $.each($("td.lalign"), function(i, td) {
    $.ajax(
    {
      type: "GET", 
      // Identify country name using GeoNames API
      url: "http://api.geonames.org/searchJSON?username=demo&formatted=true&name_equals=" +
      $(td).text(),
      async: false,
      success: function(response) {
        var length = response.geonames.length;
        for (var i = 0; i < length; i++) {
          // Check if the current object is a city
          if(response.geonames[i].fclName === "city, village,...") {
            //Write the country name
            $(td).next().text(response.geonames[i].countryName);
            break;
          }
        }
      }
    });
  });

  $("button").click(function() {
    var next = $("td.lalign").next();
    $.each(next, function(i, td) {
      var prevInd = i - 1;
      if($(td).text()) {
        if($(td).text() !== $(next[prevInd]).text()) {
          $("textarea").text($("textarea").text() + "- " + $(td).text()+"\n");
        }
        $("textarea").text($("textarea").text() +
        "  - [" + $(td).prev().text() + "](" +
        $(td).prev().find("a").attr("href") + ")" + "\n");
      }
    });
  });
});
