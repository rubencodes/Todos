//class that represents a todo item
Todo = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    todo: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li className="todo">{this.props.todo.text}</li>
    );
  }
})