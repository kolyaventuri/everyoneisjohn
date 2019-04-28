// @flow

import React from 'react';
import cx from 'classnames';
import {Grid, Col, Row} from 'react-flexbox-grid';

import globalStyles from '../sass/global.scss';
import styles from './rules.scss';

const Separator = () => (
  <Row className={styles.pad}>
    <Col xs={12}>
      <hr/>
    </Col>
  </Row>
);

const Rules = () => (
  <Grid fluid>
    <Row>
      <Col xs={12} className={styles.heading}>
        <h1 className={styles.title}>Everyone is John</h1>
        <p className={styles.subtitle}>A game about being completely insane.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className={styles.container}>
        <Row>
          <Col xs={12} lg={6}>
            <h2>Summary (How does this work?)</h2>
            <p>
              Meet <span className={styles.bold}>John!</span> He&apos;s your average everyday Joe. And by average we mean completely and utterly insane. John is an idiot. He can&apos;t do much on his own.
            </p>
            <p>
              John needs help from the <span className={styles.bold}>voices</span> in his head to do pretty much anything. Here&apos;s the catch. The voices in John&apos;s head are trying to get John to do something that they want. The best part? The voices can make him want to do anything. We really do mean <span className={styles.bold}>ANYTHING</span>. Seriously. We once had John lick things. Constantly.
            </p>
            <p>
              The game starts when John wakes up. Where is up to the game master (GM). It could be anywhere. In a nice comfy bed in his New York penthouse suite. Maybe he wakes up on an airplane. Heck, even North Korea. From that point on, each <span className={styles.bold}>test for control determines what voices controls John.</span>
            </p>
          </Col>
        </Row>
        <Separator/>
        <Row>
          <Col xs={12} md={6} lg={4} className={styles.block}>
            <h2>Willpower</h2>
            <p>
              Willpower is what allows John to do things. Each <span className={styles.bold}>voice</span> starts the game with <span className={styles.bold}>10</span> willpower, which they can spend/bid to take control of John. Voices may also spend willpower when they have control of John to increase the chance of a successful action. Willpower fluctuates during the game, so we keep track of it for you.
            </p>
          </Col>
          <Col xs={12} md={6} lg={4} className={styles.block}>
            <h2>Skills</h2>
            <p>
              Each voice has two or three skills. Skills are generally simple such as &quot;strong&quot; or &quot;persuasive&quot; but they can be as off the wall as you want. You are allowed to give John <span className={styles.bold}>two</span> skills by default. If you have a third skill, you must start with <span className={styles.bold}>7 willpower</span> instead of the usual 10.
            </p>
          </Col>
          <Col xs={12} md={6} lg={4} className={styles.block}>
            <h2>Obsessions</h2>
            <p>
              Obsessions are each <span className={styles.bold}>voice&apos;s</span> ultimate goal for John. This obsession can be as mundane or insane as your heart desires. As calm as &quot;buy milk&quot; or as wacky as &quot;throw tourists off the Eiffel Tower.&quot; The game master (GM) will assign your obsession a point value, of 1, 2, or 3. The harder your obsession is to complete, the more points you will recieve for completing it.
            </p>
          </Col>
        </Row>
        <Separator/>
        <Row>
          <h2>How To Play</h2>
          <p>
            The game will begin when John wakes up. This could be anywhere. In a nice comfy bed in his New York penthouse suite. Maybe he wakes up on an airplane. Heck, even North Korea. John wakes up in weird places. In turn, this activates the first <span className={styles.bold}>test for control</span>.
          </p>
        </Row>
        <Row>
          <h2>Turn Structure</h2>
          <p>
            Every turn starts with a <span className={styles.bold}>test for control</span>, where it decided upon which voice gets to control John by bidding willpower against each other. This voice now has total dominion over John and can bend and shape his life to their will. If John wants to attack his neighbor with a squirrel, he shall. This being said however,  John can be a bit of a numbskull. If the voice in charge wishes John to do anything where any reasonable person might fail, a <span className={styles.bold}>roll for success</span> occurs. If John succeeds, the turn continues. If he does not, a <span className={styles.bold}>test for control</span> is initiated.
          </p>
          <p>
            One voice cannot have control of John forever. If John is doing something where he will be idle for more than <span className={styles.bold}>10 minutes</span>, the game master (GM) rolls a die. If a <span className={styles.bold}>4</span> or higher is rolled, John falls asleep and a <span className={styles.bold}>test for control</span> occurs. When John falls asleep, all voices <span className={styles.bold}>gain one willpower</span>.
          </p>
        </Row>
        <Separator/>
        <Row>
          <Col xs={12}>
            <h2 className={cx(globalStyles.center, styles.muted)}>What is a...</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <h2>Test For Control</h2>
            <p>
              A test for control occurs whenever John falls asleep, completes (or fails to complete) an obsession, or hurts himself. During a test for control, the game will go into a <span className={styles.bold}>bidding phase</span>. It is in this phase that you can bid willpower points in order to gain control of John. Although bidding more willpower points increases your chance of having control, keep in mind that if you have <span className={styles.bold}>0 willpower</span> you can no longer take control of John. As well, you are <span className={styles.bold}>not required</span> to bid anything. Zero is a completely valid bid. If there is a tie, it will be handled with wizardry.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <h2>Roll For Success</h2>
            <p>
              John is an idiot. Therefore, whenever he wants to do something that any reasonable person could possible fails at doing, a <span className={styles.bold}>roll for success</span> occurs. Whichever voice has control of John must roll a single d6 (that is a standard 6 sided die, for those of you who play exclusively Monopoly&reg;). If the voice has a <span className={styles.bold}>skill</span> that satisfies the action, a <span className={styles.bold}>3</span> or higher must be rolled. In all other cases, the voice must roll a 6. However, the voice may spend any number of willpower to add +1 per point to the roll, increasing the chance of success. <span className={styles.bold}>Failing</span> the roll for success immediately ends the voices turn, and initiates a <span className={styles.bold}>test for control</span>.
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default Rules;
