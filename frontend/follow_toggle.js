function FollowToggle($el, options) {
  this.$el = $el;
  // debugger;
  this.userId = this.$el.attr("user-id") || options.userId;
  this.followState = this.$el.attr("initial-follow-state") || options.followState;

  this.render();
  this.handleClick();
}

FollowToggle.prototype.render = function () {
  this.$el.attr("initial-follow-state", `${this.followState}`);
  this.$el.prop("disabled", false);
  if (this.followState === 'true') {
    this.$el.text("unfollow");
  }
  else if (this.followState === 'false'){
    this.$el.text("follow");
  }
  else {
    this.$el.prop("disabled", true);
  }
};

FollowToggle.prototype.handleClick = function () {
  let self = this;
  this.$el.on("click", () => {
    event.preventDefault();
    self.render();
    if (this.followState === 'true') {
        this.followState = 'pending';
      $.ajax({
        url: `/users/${this.userId}/follow.json`,
        type: "DELETE",
        success: function() {
          self.followState = 'false';
          self.render();
        }
      });
    } else if (this.followState === 'false'){
        this.followState = 'pending';
      $.ajax({
        url: `/users/${this.userId}/follow.json`,
        type: "POST",
        success: function() {
          self.followState = 'true';
          self.render();
        }
      });
    }
  });
};

module.exports = FollowToggle;
