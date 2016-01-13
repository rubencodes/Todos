TodoList = React.createClass({
  renderTodos() {
    return (<li className="todo">Example Todo</li>);
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