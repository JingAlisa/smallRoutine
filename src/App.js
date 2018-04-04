import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Router } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = createHistory();

/*
 全局导入less
 */
import './app.less';
import * as global from 'actions/global';

import routes from './routes';

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators(global, dispatch)
)
export default class App extends React.Component {

  componentDidMount() {
    window.addEventListener('hashchange', () => {
    });
  }

  render() {
    return (
      <Router history={history}>
        <Route render={({ location }) => {
          {
            return routes.map(route => (
              <Route 
                key={route.path}
                location={location}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ));
          }
        }
        }
        />
      </Router>
    );
  }
};
