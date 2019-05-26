// @flow

import Player from './player';

type StatsType = {
  goal: string,
  goalLevel: number,
  skill1: string,
  skill2: string,
  skill3: string,
  frozen: boolean,
  willpower: number,
  points: number,
  winner: boolean
};

export type StatsUpdateType = {
  goal?: string,
  goalLevel?: number,
  skill1?: string,
  skill2?: string,
  skill3?: string,
  frozen?: boolean,
  willpower?: number,
  points?: number,
  winner?: boolean
};

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
      skill1: '',
      skill2: '',
      skill3: '',
      frozen: false,
      willpower: 10,
      points: 0,
      winner: false
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
    this.player.emitUpdate();
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

    this.__STATICS__.goalLevel = value;
    this.player.emitUpdate();
  }

  get skills(): Array<string> {
    const {skill1, skill2, skill3} = this.__STATICS__;
    return [skill1, skill2, skill3];
  }

  get willpower(): number {
    return this.__STATICS__.willpower;
  }

  set willpower(willpower: number): number {
    this.__STATICS__.willpower = willpower;

    this.player.emitUpdate();
    return this.willpower;
  }

  get points(): number {
    return this.__STATICS__.points;
  }

  get frozen(): boolean {
    return this.__STATICS__.frozen;
  }

  set points(points: number): number {
    this.__STATICS__.points = points;
    this.player.emitUpdate();
    return this.points;
  }

  get winner(): boolean {
    return this.__STATICS__.winner;
  }

  set winner(value: boolean): boolean {
    this.__STATICS__.winner = value;
    this.player.emitUpdate();
    return value;
  }

  setSkill(index: number, skill: string) {
    if (this.__STATICS__.frozen) {
      return;
    }

    if (index < 1 || index > MAX_SKILLS) {
      return;
    }

    this.__STATICS__[`skill${index}`] = skill;

    if (index === MAX_SKILLS) {
      if (skill) {
        this.willpower = 7;
      } else {
        this.willpower = 10;
      }
    }

    this.player.emitSkill(index - 1);
  }

  deleteSkill(index: number) {
    this.setSkill(index, '');
    this.player.emitDelete({
      type: 'skill',
      index: index - 1
    });
  }

  deleteGoal() {
    this.goal = '';
  }

  freeze() {
    this.__STATICS__.frozen = true;
    this.player.emitUpdate(false);
  }

  thaw() {
    this.__STATICS__.frozen = false;
    this.player.emitUpdate(false);
  }
}

