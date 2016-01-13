Notification = React.createClass({
  propTypes: {
    //todoId to undelete
    todoId: React.PropTypes.string.isRequired
  },
  undoDelete(event) {
    event.preventDefault();
    Meteor.call("undeleteTodo", this.props.todoId, this.props.onUndo);
  },
  render() {
    return (
      <div className="notification alert alert-danger">
        <i>An item was deleted...</i>
        <button className="btn btn-danger pull-right" onClick={this.undoDelete}>Undo</button>
      </div>
    );
  }
})