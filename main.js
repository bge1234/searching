$("#searchTrigger").click(function() {
  var searching = $("#searchTerm").val();
  var address = "https://www.reddit.com/subreddits/search.json?q="
  address += searching;
    var getter = $.ajax({
      url: address,
      method: "GET",
      dataType: "json"
    });

    getter.done(function(response) {
      var excl = $("#searchExclusion").val();

      for (var i = 0; i < response["data"]["children"].length; i++) {
        if(excl.length === 0)
          $("#tabl").append("<tr><td><a href='http://reddit.com" + response["data"]["children"][i]["data"]["url"] + "'>" + response["data"]["children"][i]["data"]["title"] + "</a></td><td><img src='" + response["data"]["children"][i]["data"]["header_img"] + "'></td><td>" + response["data"]["children"][i]["data"]["display_name"] + "</td></tr>");
        else if (response["data"]["children"][i]["data"]["title"].toLowerCase().indexOf(excl.toLowerCase()) === -1)
          excl = "";

        //Replace non-existent images with placeholders.
        if(response["data"]["children"][i]["data"]["header_img"] === null) {
          $("tr:last-child").remove();
          $("#tabl").append("<tr><td><a href='http://reddit.com" + response["data"]["children"][i]["data"]["url"] + "'>" + response["data"]["children"][i]["data"]["title"] + "</a></td><td><img src=\"http:\/\/placehold.it/100x100\"></td><td>" + response["data"]["children"][i]["data"]["display_name"] + "</td></tr>");
        };

        //Check predictions against actual and dispay winbox
        var predicted = parseInt($("#prediction").val());
        var actual = $('#tabl tr').length;
        console.log(actual);
        if (predicted === actual)
          $("#winbox").append("<table><tr><td style=\"color:white; font-size: 24px; background-color:red;\">You won!</td></tr></table>");
      };
  });

  $("#removeTrigger").click(function() {
    var removal = $("#removeText").val();
    $("tr:contains(" + removal + ")").html("");
  });

  $("#findTrigger").click(function() {
    var target = $("#findText").val();
    $("tr:contains(" + target + ")").css({"background-color": "yellow"});
  });

  $("#cleanTrigger").click(function() {
    $("tr:not(:first-child)").remove();
    $("#winbox").remove();
    actual = 0;
  });

  getter.fail(function(response) {
    alert("Failed to get data!");
  });
});
