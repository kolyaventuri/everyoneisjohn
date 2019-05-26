import test from 'ava';
import proxyquire from 'proxyquire';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

const ReactGA = {
  initialize: stub()
};

const path = '../../client/app';

test('it renders a RouteController', t => {
  let res;
  proxyquire(path, {
    'react-ga': {default: ReactGA},
    'react-dom': {
      render: stub().callsFake(component => {
        res = component;
      })
    }
  });

  const wrapper = shallow(res).shallow();
  const controller = wrapper.find('RouteController');

  t.is(controller.length, 1);
});

test('it initialized Google Analytics', t => {
  const tracking = 'UA-FAKE-TRACKING';
  process.env.GA_TRACKING = tracking;

  proxyquire(path, {
    'react-ga': {default: ReactGA},
    'react-dom': {
      render: stub()
    }
  });

  t.true(ReactGA.initialize.calledWith(tracking));
});

