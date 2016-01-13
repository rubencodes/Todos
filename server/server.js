if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      addTodo: function(text) {
        Todos.insert({
          text: text,
          createdAt: Date.now()
        });
      }
    });
  });
}
