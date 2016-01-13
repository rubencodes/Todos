//class that represents a todo list
TodoList = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  getInitialState() {
    return {};
  },
  getMeteorData() {
    return {
      incompleteTodos: Todos.find({ checked: false, deleted: undefined }, {sort: {createdAt: -1}}).fetch(),
      completeTodos:   Todos.find({ checked: true,  deleted: undefined }, {sort: {updatedAt: -1}}).fetch()
    };
  },
  componentDidMount() {
    //sets up manually sortability
    $( "#sortable-complete,#sortable-incomplete" ).sortable({ 
      axis: "y", 
      containment: "parent", 
      cursor: "move" 
    });
    $( "#sortable-complete,#sortable-incomplete" ).disableSelection();
  },
  renderIncompleteTodos() {
    //render todo list items as Todo components
    return this.data.incompleteTodos.map((todo, i) => {
      return (<Todo key={i} todo={todo} onDelete={this.onTodoDelete} />);
    });
  },
  renderCompleteTodos() {
    //render todo list items as Todo components
    return this.data.completeTodos.map((todo, i) => {
      return (<Todo key={i} todo={todo} onDelete={this.onTodoDelete} />);
    });
  },
  onTodoDelete(todoId) {
    //set this item as just deleted
    this.setState({ justDeleted: todoId });
  },
  onUndoDelete() {
    //we only want to undo one item
    this.setState({ justDeleted: undefined });
  },
  render() {
    let notification; //show notification for undoing
    if(this.state.justDeleted) {
      notification = (<Notification todoId={this.state.justDeleted} onUndo={this.onUndoDelete} />);
    }
    
    return (
      <div className="todoListContainer">
        <header>
          <h2>Todos</h2>
        </header>
        <ul id="sortable-incomplete" className="todoList list-group">
          {this.renderIncompleteTodos()}
        </ul>
        <ul id="sortable-complete" className="todoList list-group">
          {this.renderCompleteTodos()}
        </ul>
        {notification}
      </div>
    );
  }
})