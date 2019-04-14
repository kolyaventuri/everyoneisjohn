// @flow

type GameStateType = {[string]: any};

type Action = {
  type: string,
  payload: {[string]: any}
};

const GameReducer = (state: GameStateType = {}, action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_GAME_GM':
      return {
        ...state,
        gameId: payload.gameId,
        isGm: true
      };
    default:
      return state;
  }
};

export default GameReducer;
