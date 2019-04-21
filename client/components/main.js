// @flow

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../routes/home';
import Rules from '../routes/rules';

import Game from '../routes/game';
import CreateGame from '../routes/game/create';
import GMPanel from '../routes/game/gm-panel';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/rules" component={Rules}/>

      <Route exact path="/game/create" component={CreateGame}/>
      <Route path="/game/:id/gm" component={GMPanel}/>
      <Route path="/game/:id" component={Game}/>
    </Switch>
  </main>
);

export default Main;
