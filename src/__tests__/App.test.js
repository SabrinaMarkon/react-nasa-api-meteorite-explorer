import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

// components
import App from '../containers/App';

function setup() {
  const wrapper = shallow(<App />);
  //return { wrapper, props }
  return wrapper;
}

describe('Testing main App container', () => {
  it('Renders the main App component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should have text in the main div', () => {
    const wrapper = setup();
    const hastext = wrapper.find('div');
    expect(hastext).toBeDefined();
  });

  it('Should have the right text', () => {
    const wrapper = setup();
    const findit = wrapper.find('div').text();
    expect(findit).toEqual('Main App Component');
  });
});


