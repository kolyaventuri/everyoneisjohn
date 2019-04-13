// @flow

import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Everyone is John</h1>
    <Link to="/game/create">Start a Game</Link>
  </div>
);

export default Home;
