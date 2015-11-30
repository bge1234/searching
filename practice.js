var getter = $.ajax({
  url: "https://www.reddit.com/subreddits/search.json?q=banana",
  method: "GET",
  dataType: "json"
});

getter.done(function(response) {
  console.log("We have your cookie. Do not call the police. If you want to see your cookie again, leave $1 under the first bench in Union Station by noon tomorrow, or your cookie will be eaten");
  console.log(response["data"]["children"][0]["data"]["display_name"]);

});

getter.fail(function(response) {
  console.log("Nope!");
});
