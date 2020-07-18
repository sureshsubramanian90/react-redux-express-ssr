import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import match from 'react-router/lib/match';
import App from './containers/App';
import RootReducer from './reducers';
import RootSaga from './sagas';
import routes from './routes'
import { getApplicationContext } from './ContextLoader';
import StoreFactory from './redux/storeFactory';
const app = Express();
const port = 3000;
//Serve static files
app.use(Express.static('public'))

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  const initialState = { context: getApplicationContext() };
  const store = StoreFactory(RootReducer, initialState, RootSaga);
match({ 
    routes, 
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const tasks = store.tasks;
      console.log('taskstaskstasks', tasks);
      Promise.all(tasks.map(task => task.done)).then(() => {
        console.log('kghjhjghi')
        // Grab the initial state from our Redux store
        const html = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        )
        const preloadedState = store.getState();
        // Send the rendered page back to the client
        res.send(renderFullPage(html, preloadedState));
      })
    }
  });
}

function renderFullPage(html, preloadedState) {
  console.log('*******preloadedState', preloadedState);
    return `
    <!doctype html>
    <html>
      <head>
        <base href="/" />
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)