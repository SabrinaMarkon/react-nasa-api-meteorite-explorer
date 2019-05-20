import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';

it ('Renders the main App component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});