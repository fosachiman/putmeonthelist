import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import App from './App';
import '../Style/index.css';
import Homepage from './Homepage';
import CreateEvent from './CreateEvent';
import EventLandingPage from './EventLandingPage';

const Root = () => {
  return(
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Homepage} />
          <Match exactly pattern="/create-event" component={CreateEvent} />
          <Match
            exactly
            pattern="/event/:id"
            component={({ params }) =>
              <EventLandingPage url={params.id} />
            }
          />
          <Match
            exactly
            pattern="/event/admin/:id"
            component={App}
          />
        </div>
      </BrowserRouter>
  )
}


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
