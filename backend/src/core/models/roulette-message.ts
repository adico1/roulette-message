export class RouletteMessage {
  content: string;
  recipients: string;

  constructor(content: string, recipients: string) {
    this.content = content;
    this.recipients = recipients;
  }

  static create(content: string, recipients: string): RouletteMessage {
    return new RouletteMessage(content, recipients);
  }
}