import React from 'react';
import './style/App.scss';
import {Header} from './components/Header';

import IndexPage from './routes/IndexPage/IndexPage';

function App() {
    return (
        <div className='app'>
            <Header />
            <IndexPage />
        </div>
    );
}

export default App;
