//class that represents a todo list
TodoList = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      todos: Todos.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },
  renderTodos() {
    //render todo list items as Todo components
    return this.data.todos.map((todo, i) => {
      return (<Todo key={i} todo={todo} />);
    });
  },
  render() {
    return (
      <div className="todoListContainer">
        <header>
          <h2>Todos</h2>
        </header>
        <ul className="todoList">
          {this.renderTodos()}
        </ul>
      </div>
    );
  }
})