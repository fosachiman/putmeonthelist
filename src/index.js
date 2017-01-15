import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import App from './App';
import '../Style/index.css';
import Homepage from './Homepage';
import CreateEvent from './CreateEvent';

const Root = () => {
  return(
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Homepage} />
          <Match exactly pattern="/create-event" component={CreateEvent} />
        </div>
      </BrowserRouter>
  )
}


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
