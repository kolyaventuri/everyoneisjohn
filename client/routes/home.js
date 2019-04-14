// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import JoinInput from '../components/join-input';

const Home = () => (
  <div>
    <h1>Everyone is John</h1>
    <Link to="/game/create">Start a Game</Link>
    <JoinInput/>
  </div>
);

export default Home;
