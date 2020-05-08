export type NodesRecipients = { [key:string]:string[]} | '*'

export interface InMessageRequest { 
  content:string;
  recipients: NodesRecipients;
}