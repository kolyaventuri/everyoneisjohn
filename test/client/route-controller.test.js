import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import {Provider} from 'react-redux';

const ReactGA = {
  pageview: stub()
};

class App extends React.Component {
  render() {
    return null;
  }
}

proxyquire.noCallThru();
const RouteController = proxyquire('../../client/route-controller', {
  'react-ga': ReactGA,
  './components/app': App
}).default;

const store = {
  getState: () => {},
  subscribe: () => {},
  dispatch: () => {}
};

const render = () => shallow(
  <Provider store={store}>
    <RouteController store={store}/>
  </Provider>
).shallow().shallow();

test('it renders the app and triggers a pageview', t => {
  const wrapper = render();
  const app = wrapper.find('App');

  t.is(app.length, 1);
  t.true(ReactGA.pageview.calledWith(window.location.pathname));
});
