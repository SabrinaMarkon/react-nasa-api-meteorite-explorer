import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, describe, it } from 'enzyme';

// components
import App from '../components/App';
import Nav from '../components/Nav';

function setup () {
    const wrapper = shallow(<App />);
    return wrapper;
}

describe('Testing Nav component', () => {
    it('renders the navigation', () => {
        const nav = document.createElement('nav');
        ReactDOM.render(<Nav />, nav);
        ReactDOM.unmountComponentAtNode(nav);
    });
});
