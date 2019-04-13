// @flow

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../routes/home';

import Game from '../routes/game';
import CreateGame from '../routes/game/create';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>

      <Route exact path="/game/create" component={CreateGame}/>
      <Route path="/game/:id" component={Game}/>
    </Switch>
  </main>
);

export default Main;
