// @flow

import Player from './player';

type StatsType = {
  goal: string,
  goalLevel: number,
  skills: Array<string>,
  frozen: boolean,
  willpower: number,
  points: number
}

export type StatsUpdateType = {
  goal?: string,
  goalLevel?: number,
  skills?: Array<string>,
  frozen?: boolean,
  willpower?: number,
  points?: number
}

const MIN_GOAL = 1;
const MAX_GOAL = 3;
const MAX_SKILLS = 3;

export default class Stats {
  __STATICS__: StatsType;

  player: Player;

  constructor(player: Player) {
    this.player = player;

    this.__STATICS__ = {
      goal: '',
      goalLevel: 1,
      skills: [],
      frozen: false,
      willpower: 10,
      points: 0
    };
  }

  get goal(): string {
    return this.__STATICS__.goal;
  }

  set goal(value: string) {
    if (this.__STATICS__.frozen) {
      return;
    }

    this.__STATICS__.goal = value;
  }

  get goalLevel(): number {
    return this.__STATICS__.goalLevel;
  }

  set goalLevel(value: number) {
    if (value > MAX_GOAL) {
      value = MAX_GOAL;
    }

    if (value < MIN_GOAL) {
      value = MIN_GOAL;
    }

    this.player.handleUpdateStats({goalLevel: value});
    this.__STATICS__.goalLevel = value;
  }

  get skills(): Array<string> {
    return this.__STATICS__.skills;
  }

  get willpower(): number {
    return this.__STATICS__.willpower;
  }

  set willpower(willpower: number): number {
    this.__STATICS__.willpower = willpower;

    this.player.handleUpdateStats({willpower});
    return this.willpower;
  }

  get points(): number {
    return this.__STATICS__.points;
  }

  set points(points: number): number {
    this.__STATICS__.points = points;
    this.player.handleUpdateStats({points});
    return this.points;
  }

  setSkill(index: number, skill: string) {
    if (this.__STATICS__.frozen) {
      return;
    }

    if (index < 1 || index > MAX_SKILLS) {
      return;
    }

    if (index === MAX_SKILLS) {
      this.willpower -= 3;
    }

    this.__STATICS__.skills[index - 1] = skill;
  }

  freeze() {
    this.__STATICS__.frozen = true;
    this.player.handleUpdateStats({frozen: true});
  }

  thaw() {
    this.__STATICS__.frozen = false;
    this.player.handleUpdateStats({frozen: false});
  }
}

