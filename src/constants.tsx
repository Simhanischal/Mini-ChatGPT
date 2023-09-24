export const url = "https://api.openai.com/v1/chat/completions";

export interface Message {
  role: string;
  content: string;
  datetime: string;
  id: string;
  status?: string;
}

export interface ChatProps {
  messages: Array<Message>;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
  openWindow: boolean;
  shouldRetrieveBackup: boolean;
}

export enum Statuses {
  initial = '',
  failed = 'failed',
  retrying = 'retrying',
  success = 'success',
}

export enum Roles {
  user = 'user',
  assistant = 'assistant',
}
