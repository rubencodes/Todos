describe("Todo Component", function() {
  var defProps, renderWithProps, component, el, $el;
 
  beforeEach(function() {
    uncheckedProps = {
      todo: {
        text: "My example todo!",
        createdAt: Date.now()
      }
    };
    checkedProps = {
      todo: {
        text: "My example todo!",
        checked: true,
        updatedAt: Date.now(),
        createdAt: Date.now()
      }
    };
    renderWithProps = function(props) {
      component = renderComponent(Todo, props);
      el = ReactDOM.findDOMNode(component);
      $el = $(el);
    };
  });
 
  it("should render a todo item", function() {
    renderWithProps(uncheckedProps);
    
    //validate correct classes
    expect($el[0].className).toEqual('todo list-group-item');
    
    //validate text showing up right
    expect($el[0].textContent).toEqual(uncheckedProps.todo.text);
    
    //validate correct child classes
    expect($el[0].children[0].className).toEqual("");
  });
  
  it("should render a checked todo item", function() {
    renderWithProps(checkedProps);
    
    //validate correct classes
    expect($el[0].className).toEqual('todo list-group-item');
    
    //validate text showing up right
    expect($el[0].textContent.startsWith(checkedProps.todo.text)).toEqual(true);
    
    //validate date showing up right
    expect($el[0].textContent.endsWith((new Date(checkedProps.todo.createdAt).toDateString()))).toEqual(true);
    
    //validate correct child classes
    expect($el[0].children[0].className).toEqual("checked");
  });

  it("should show options", function() {
    renderWithProps(checkedProps);
    
    var opts = $($el[0]).find("section.options");
    expect(opts).not.toBe(null);
  });
});