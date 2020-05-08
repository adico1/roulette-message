import { InMessageRequest, NodesRecipients } from "./request";
import { InMessageResponse } from "./response";
const config = require('../../../config');

export class InMessageUseCase {
  async exec(request: InMessageRequest): Promise<InMessageResponse> {
    console.log(`[server][InMessageUseCase][exec]`, JSON.stringify(request));
    let inMessageResponse: InMessageResponse;

    if( request.recipients === '*' ) {
      inMessageResponse = {
        recipients: request.recipients,
        content: request.content
      } as InMessageResponse;

      return inMessageResponse;
    }

    if (config.NODE_ID in request.recipients) {
      inMessageResponse = {
        recipients: request.recipients[config.NODE_ID],
        content: request.content
      } as InMessageResponse;

      return inMessageResponse;
    }

    return {
      recipients: [],
      content: ''
    } as InMessageResponse;
  }
}