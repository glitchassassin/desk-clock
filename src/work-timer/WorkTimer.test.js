import React from 'react';
import ReactDOM from 'react-dom';
import WorkTimer from './WorkTimer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WorkTimer />, div);
    ReactDOM.unmountComponentAtNode(div);
});
