if (Meteor.isServer) {
  //publish todos to frontend
  Meteor.publish("todos", function () {
    return Todos.find();
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      //creates a new todo
      addTodo: function(text) {
        Todos.insert({
          text: text,
          checked: false,
          createdAt: Date.now()
        });
      },
      //toggles checked on a Todo with id todoId
      toggleTodoChecked: function(todoId) {
        const todo = Todos.findOne(todoId);

        // Set the checked property to the opposite of its current value
        Todos.update(todoId, {
          $set: {
            checked: !todo.checked,
            updatedAt: Date.now(),
          }
        });
      },
      //deleted a Todo with id todoId
      deleteTodo: function(todoId) {
        Todos.update(todoId, {
          $set: {
            deleted: true
          }
        });
      },
      //undelete a Todo with id todoId
      undeleteTodo: function(todoId) {
        Todos.update(todoId, {
          $set: {
            deleted: undefined
          }
        });
      },
    });
  });
}
