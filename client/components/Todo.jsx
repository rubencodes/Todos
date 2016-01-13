//class that represents a todo item
Todo = React.createClass({
  propTypes: {
    //todo to display
    todo: React.PropTypes.object.isRequired
  },
  toggleCheck() {
    //toggle the todo's checked status
    Meteor.call("toggleTodoChecked", this.props.todo._id);
  },
  deleteTodo() {
    //delete todo
    Meteor.call("deleteTodo", this.props.todo._id, this.props.onDelete.bind(null, this.props.todo._id));
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