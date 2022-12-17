import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

if (root) {
    ReactDOM.createRoot(root).render(
        <App />

        /**
         * Strict mode can’t automatically detect side effects for you,
         * but it can help you spot them by making them a little more deterministic.
         * This is done by intentionally double-invoking...
         * 
         */

        // <React.StrictMode>
        //     <App />
        // </React.StrictMode>
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
