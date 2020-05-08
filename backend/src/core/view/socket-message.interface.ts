import { InMessageResponse } from "../../modules/roulette-notifier/in-message/response";

export interface ISocketMessage {
  render(response: InMessageResponse): void
}