import Express from "express";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import { END } from "redux-saga";
import match from "react-router/lib/match";
import App from "./containers/App";
import RootReducer from "./reducers";
import RootSaga from "./sagas";
import routes from "./routes";
import { getApplicationContext } from "./ContextLoader";
import StoreFactory from "./redux/storeFactory";
const app = Express();
const port = 3000;
//Serve static files
app.use(Express.static("public"));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res, next) {
  const initialState = { context: getApplicationContext() };
  const store = StoreFactory(RootReducer, initialState, RootSaga);
  match(
    {
      routes,
      location: req.url
    },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // Grab the initial state from our Redux store
        const html = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        );
        const preloadedState = store.getState();
        try {
          renderFullPage(html, store.getState());
          const tasks = store.tasks;
          store.dispatch(END);
          const pendingApiTasks = tasks.map(task => task.toPromise());
          Promise.all(pendingApiTasks).then(() => {
            // Send the rendered page back to the client
            res.send(renderFullPage(html, store.getState()));
            next();
          });
        } catch (e) {
          console.log("error in handler", e);
        }
      }
    }
  );
}

function renderFullPage(html, preloadedState) {
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
            "\\u003c"
          )}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);
