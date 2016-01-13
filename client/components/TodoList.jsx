//class that represents a todo list
TodoList = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  getInitialState() {
    return {};
  },
  getMeteorData() {
    //default params for retriving list of todos
    const incompleteTodosParams = { checked: false, deleted: undefined };
    const completeTodosParams   = { checked: true, deleted: undefined };
    
    //if we're confucting a search, also filter by regex matches against text
    if(this.state.query) {
      incompleteTodosParams.text = completeTodosParams.text = { $regex : ".*"+this.state.query+".*", '$options' : 'i' };
    }
    
    return {
      incompleteTodos: Todos.find(incompleteTodosParams, {sort: {createdAt: -1}}).fetch(),
      completeTodos:   Todos.find(completeTodosParams,   {sort: {updatedAt: -1}}).fetch()
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
  onSearch() {
    //clean up the query
    let query = ReactDOM.findDOMNode(this.refs.query).value.trim();
    query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    
    //update our state to search
    this.setState({
      query: query
    });
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
        <section>
          <input className="form-control" placeholder="Search..." ref="query" onChange={this.onSearch} />
        </section>
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