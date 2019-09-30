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
    const {number, content} = skill;
    if (player.stats.skills[number - 1]) {
      player.stats.updateSkill(number, content);
      return;
    }

    player.stats.addSkill(content);
  }
};

export default updateStats;
