import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectFour from './connect-four';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ConnectFour />, document.getElementById('root'));
registerServiceWorker();
