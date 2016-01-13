//class that represents a todo item
Todo = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    todo: React.PropTypes.object.isRequired
  },
  toggleCheck() {
    //toggle the todo
    Meteor.call("toggleTodoChecked", this.props.todo._id);
  },
  deleteTodo() {
    Meteor.call("deleteTodo", this.props.todo._id);
  },
  render() {
    const todo = this.props.todo;
    let timestamp; //shows completed at time
    if(todo.checked) {
      timestamp = (
        <small className="timestamp">
          <span className="fa fa-check-circle-o"/>&nbsp;{(new Date(todo.updatedAt)).toDateString()}
        </small>
      );
    }
    
    return (
      <li className="todo list-group-item">
        <span className={todo.checked ? "checked" : ""}>{todo.text}</span>
        <section className="options pull-right">
          <span className={"fa "+(todo.checked ? "fa-undo" : "fa-check")} onClick={this.toggleCheck}></span>
          <span className="fa fa-close" onClick={this.deleteTodo}></span>
        </section>
        {timestamp}
      </li>
    );
  }
})