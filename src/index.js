import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './App';
import '../Style/index.css';
import Homepage from './Homepage';
import CreateEvent from './CreateEvent';
import EventLandingPage from './EventLandingPage';
import NotFound from './NotFound';
var _reactBootstrap = require('react-bootstrap');


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
            component={({ params }) =>
              <App url={params.id} />
            }
          />
          <Miss
            component={NotFound}
          />
        </div>
      </BrowserRouter>
  )
}


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
