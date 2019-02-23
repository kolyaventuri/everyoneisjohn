// @flow

type StaticsType = {
  goal: string,
  goalLevel: number,
  skills: Array<string>,
  frozen: boolean
}

const MIN_GOAL = 1;
const MAX_GOAL = 3;
const MAX_SKILLS = 3;

export default class Stats {
  points: number;

  willpower: number;

  __STATICS__: StaticsType;

  constructor() {
    this.points = 0;
    this.willpower = 10;

    this.__STATICS__ = {
      goal: '',
      goalLevel: 1,
      skills: [],
      frozen: false
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

    this.__STATICS__.goalLevel = value;
  }

  get skills(): Array<string> {
    return this.__STATICS__.skills;
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
  }

  thaw() {
    this.__STATICS__.frozen = false;
  }
}

