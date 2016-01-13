App = React.createClass({
  addNewTodo(event) {
    event.preventDefault();
    
    swal({   
      title: "New Todo",   
      text: "Describe this todo item.",   
      type: "input",   
      showCancelButton: true,   
      closeOnConfirm: false,   
      animation: "slide-from-top",   
      inputPlaceholder: "e.g. 'Water the plants'" 
    }, function(inputValue){   
      if (inputValue === false) return false;      
      if (inputValue === "") {     
        swal.showInputError("You must enter a todo item to continue.");
        return false   
      }      
      
      //success, add the todo to the list
      Meteor.call("addTodo", inputValue);
      
      swal.close();
    });
  },
  render() {
    return (
      <div className="container">
        <TodoList />
        
        <button className="btn btn-primary newTodo" onClick={this.addNewTodo}>
          <span className="fa fa-plus"></span>
        </button>
      </div>
    );
  }
});