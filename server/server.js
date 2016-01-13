if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      addTodo: function(text) {
        Todos.insert({
          text: text,
          createdAt: Date.now()
        });
      },
      toggleTodoChecked: function(todoId) {
        const todo = Todos.findOne(todoId);

        // Set the checked property to the opposite of its current value
        Todos.update(todoId, {
          $set: {
            checked: !todo.checked,
          }
        });
      }
    });
  });
}
