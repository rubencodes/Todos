TodoList = React.createClass({
  getDummyTodos() {
    return [
      {
        text: "Example Todo 1"
      },
      {
        text: "Example Todo 2"
      },
      {
        text: "Example Todo 3"
      }
    ];
  },
  renderTodos() {
    return this.getDummyTodos().map((todo, i) => {
      return (<Todo key={i} text={todo.text} />);
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