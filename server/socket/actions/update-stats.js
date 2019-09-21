// @flow

import type {SocketType} from '..';

type SkillType = {
  number: number,
  content: string
};

type Payload = {
  goal?: string,
  skill?: SkillType
};

const updateStats = (socket: SocketType, payload: Payload) => {
  const {player} = socket;

  if (!player) {
    return;
  }

  const {goal, skill} = payload;
  if (goal) {
    player.stats.goal = goal;
  }

  if (skill) {
    const {content} = skill;
    player.stats.addSkill(content);
  }
};

export default updateStats;
