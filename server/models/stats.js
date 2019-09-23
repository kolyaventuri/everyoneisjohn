// @flow

import Player from './player';

type StatsType = {
  goal: string,
  goalLevel: number,
  skills: Array<string>,
  frozen: boolean,
  willpower: number,
  points: number,
  winner: boolean
};

export type StatsUpdateType = {
  goal?: string,
  goalLevel?: number,
  skills?: Array<string>,
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
      skills: [],
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
    return this.__STATICS__.skills;
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

  addSkill(skill: string) {
    if (this.__STATICS__.frozen) {
      return;
    }

    const {skills} = this.__STATICS__;
    if (skills.length === MAX_SKILLS) {
      return;
    }

    skills.push(skill);

    if (skills.length === MAX_SKILLS) {
      this.willpower = 7;
    }

    this.__STATICS__.skills = skills;

    this.player.emitSkills();
  }

  deleteSkill(index: number) {
    this.__STATICS__.skills.splice(index - 1, 1);

    if (this.__STATICS__.skills.length < MAX_SKILLS) {
      this.willpower = 10;
    }
  }

  updateSkill(index: number, content: string) {
    const adjusted = index - 1;

    if (this.__STATICS__.skills[adjusted]) {
      if (content) {
        this.__STATICS__.skills[adjusted] = content;
        this.player.emitSkills(false);
      } else {
        this.deleteSkill(index);
      }
    }
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

