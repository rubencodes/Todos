//class that represents a todo list
TodoList = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
    incompleteTodos: Todos.find({ checked: false, deleted: undefined }, {sort: {createdAt: -1}}).fetch(),
      completeTodos: Todos.find({ checked: true, deleted: undefined }, {sort: {updatedAt: -1}}).fetch()
    };
  },
  renderIncompleteTodos() {
    //render todo list items as Todo components
    return this.data.incompleteTodos.map((todo, i) => {
      return (<Todo key={i} todo={todo} />);
    });
  },
  renderCompleteTodos() {
    //render todo list items as Todo components
    return this.data.completeTodos.map((todo, i) => {
      return (<Todo key={i} todo={todo} />);
    });
  },
  render() {
    return (
      <div className="todoListContainer">
        <header>
          <h2>Todos</h2>
        </header>
        <ul className="todoList list-group">
          {this.renderIncompleteTodos()}
          {this.renderCompleteTodos()}
        </ul>
      </div>
    );
  }
})