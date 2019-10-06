// @flow

import uuid from 'uuid/v4';

type Serialized = {|
  sender: string,
  content: string,
  timestamp: Date
|};

class Message {
  /* eslint-disable lines-between-class-members */
  _id: string;
  _sender: string;
  _content: string;
  _timestamp: Date;
  /* eslint-enable lines-between-class-members */

  constructor(sender: string, content: string) {
    this._id = uuid();
    this._sender = sender;
    this._content = content;
    this._timestamp = new Date();
  }

  serialize(): Serialized {
    const {sender, content, timestamp} = this;

    return {
      sender,
      content,
      timestamp
    };
  }

  get id() {
    return this._id;
  }

  get sender(): string {
    return this._sender;
  }

  get content(): string {
    return this._content;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}

export default Message;
