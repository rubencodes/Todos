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
    return (
      <li className={"todo list-group-item "+(todo.checked ? "checked" : "")}>
        {todo.text}
        <span className="pull-right fa fa-close" onClick={this.deleteTodo}></span>
        <span className={"pull-right fa "+(todo.checked ? "fa-undo" : "fa-check")} onClick={this.toggleCheck}></span>
      </li>
    );
  }
})