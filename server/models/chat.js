// @flow

import uuid from 'uuid/v4';
import {playerRepository} from '../repositories';
import Player from './player';
import Message from './message';

class Chat {
  /* eslint-disable lines-between-class-members */
  _id: string;
  _player1: Player;
  _player2: Player;
  _messages: Array<Message>;
  /* eslint-enable lines-between-class-members */

  constructor(player1: Player, player2: Player) {
    this._id = uuid();

    this._player1 = player1.id;
    this._player2 = player2.id;
    this._messages = [];
  }

  postMessage(sender: Player, content: string) {
    const {id} = sender;
    const msg = new Message(id, content);

    this._messages.push(msg);

    const receiver = this.player1.id === sender.id ? this.player1 : this.player2;
    receiver.emitToMe({
      event: 'chatReceive',
      payload: msg.serialize()
    });
  }

  get id(): string {
    return this._id;
  }

  get player1(): Player {
    return playerRepository.find(this._player1);
  }

  get player2(): Player {
    return playerRepository.find(this._player2);
  }

  get messages(): Array<Message> {
    return this._messages;
  }
}

export default Chat;
