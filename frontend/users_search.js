const FollowToggle = require("./follow_toggle.js");

function UsersSearch($el) {
  this.userId = $el.attr("user-id");
  this.input1 = $("nav input");
  this.$el = $el;
  this.$ul = $("nav ul");

  this.handleInput();
}

UsersSearch.prototype.handleInput = function () {

  this.$el.on("input", () => {
    let input = $(this.input1).val();
    $.ajax({
      url: "/users/search.json",
      type: "GET",
      data: {query: input},
      success: this.RenderResults.bind(this)
    });
  });
};

UsersSearch.prototype.RenderResults = function (users) {
  this.$ul.empty();
  for (let i = 0; i < users.length; i++){
    let user = users[i];
    let $li = $("<li>");
    console.log(user);
    let $a = $(`<a href='/users/${user.id}'>${user.username}</a>`);
    $li.append($a);

    let button = $("<button>");

    let follow_state = user.followed ? 'true' : 'false';

    new FollowToggle(button, {userId: user.id, followState: follow_state});

    $li.append(button);

    this.$ul.append($li);
  }
};


module.exports = UsersSearch;
