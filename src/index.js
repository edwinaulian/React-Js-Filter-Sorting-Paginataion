import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'));


serviceWorker.unregister();
// reportWebVitals();
