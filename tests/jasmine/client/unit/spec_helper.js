TestUtils = React.addons.TestUtils;
Simulate = TestUtils.Simulate;
 
// returns rendered react component
renderComponent = function (comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
};
 
// more terse method of simulating events
simulateClickOn = function($el) {
  React.addons.TestUtils.Simulate.click($el[0]);
};