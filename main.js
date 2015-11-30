var getter = $.ajax({
  url: "https://www.reddit.com/subreddits/search.json?q=ouya",
  method: "GET",
  dataType: "json"
});

getter.done(function(response) {
  $("#searchTrigger").click(function() {
    var searcher = $("#searchTerm").val();
    for (var i = 0; i < response["data"]["children"].length; i++) {
      if (response["data"]["children"][i]["data"]["title"].toLowerCase().indexOf(searcher.toLowerCase()) >= 0)
        $("#tabl").append("<tr><td>" + response["data"]["children"][i]["data"]["title"] + "</td><td><img src=\"" + response["data"]["children"][i]["data"]["header_img"] + "\"></td><td>" + response["data"]["children"][i]["data"]["display_name"] + "</td></tr>");
    };
  });
});

getter.fail(function(response) {
  console.log("Failed to get data!");
});
