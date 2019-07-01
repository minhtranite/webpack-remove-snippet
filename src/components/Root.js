import { hot } from 'react-hot-loader/root';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PageHome from './PageHome';
import PageNotFound from './PageNotFound';

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Fragment>
          <Switch>
            <Route path="/" exact component={PageHome} />
            <Route component={PageNotFound} />
          </Switch>
        </Fragment>
      </Provider>
    );
  }
}

export default hot(Root);
