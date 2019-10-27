import test from 'ava';

import reducer from '../../../client/reducers/game';

test('it should return the default state', t => {
  const result = reducer(undefined, {});

  t.deepEqual(result, {});
});

test('SET_GAME_GM should be able to set the game GM', t => {
  const gameId = 'ABCDEF';

  const expected = {
    gameId,
    isGm: true
  };

  const result = reducer({}, {
    type: 'SET_GAME_GM',
    payload: {gameId}
  });

  t.deepEqual(result, expected);
});

test('SET_GAME_ID should be able to set the game id', t => {
  const gameId = 'ABCDEF';

  const expected = {
    gameId,
    isGm: false
  };

  const result = reducer({}, {
    type: 'SET_GAME_ID',
    payload: {gameId}
  });

  t.deepEqual(result, expected);
});

test('SET_PLAYERS should be able to set the games players', t => {
  const players = [1, 2, 3];

  const expected = {
    players
  };

  const result = reducer({}, {
    type: 'SET_PLAYERS',
    payload: {players}
  });

  t.deepEqual(result, expected);
});

test('SET_PLAYER_INFO should be able to update a specific player', t => {
  const players = [
    {
      id: 1,
      name: 'A'
    },
    {
      id: 2,
      name: 'B'
    }
  ];

  const updatedPlayers = [
    players[0],
    players[1]
  ];
  updatedPlayers[1].name = 'C';

  const expected = {
    players: updatedPlayers
  };

  const result = reducer({players}, {
    type: 'SET_GAME_PLAYER_INFO',
    payload: {
      id: 2,
      name: 'C'
    }
  });

  t.deepEqual(result, expected);
});

test('SET_GAME_MODE should be able to define the game mode', t => {
  const mode = 'VOTING';

  const expected = {
    mode
  };

  const result = reducer({}, {
    type: 'SET_GAME_MODE',
    payload: {mode}
  });

  t.deepEqual(result, expected);
});

test('SET_GAME_PLAYER_INFO, when passed a skill array, should not merge the arrays', t => {
  const skills = ['skilla'];
  const newSkills = ['skillb'];
  const players = [
    {
      id: 1,
      skills
    },
    {
      id: 2,
      skills
    }
  ];

  const updatedPlayers = [...players];
  updatedPlayers[0].skills = newSkills;

  const expected = {
    players: updatedPlayers
  };

  const result = reducer({players}, {
    type: 'SET_GAME_PLAYER_INFO',
    payload: {id: players[0].id, skills: newSkills}
  });

  t.deepEqual(result, expected);
});

test('ADD_MESSAGE should append the serialized message to the state', t => {
  const message = {
    timestamp: new Date(),
    content: 'abc123'
  };

  const messages = [message];
  const expected = {
    messages
  };

  const result = reducer({messages: []}, {
    type: 'ADD_MESSAGE',
    payload: {message}
  });

  t.deepEqual(result, expected);
});
