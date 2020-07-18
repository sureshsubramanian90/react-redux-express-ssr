import React from 'react';
import Route from 'react-router/lib/Route';
import App from './containers/App';


const routes = (
    <Route >
        <Route path='/' exact component={App} />
    </Route>
);

export default routes;
