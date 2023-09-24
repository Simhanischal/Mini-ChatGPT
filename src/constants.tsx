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

export interface ChatInputProps {
  input: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleEnter: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
  status: string;
}

export interface ChatBubbleProps {
  isBotBubble: boolean;
  message: Message;
  status?: string;
  handleRetry: (id: string) => void;
  retryMsgId?: string;
}

export interface ChatMessagesProps {
  windowEndRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export interface ErrorTextProps {
  handleRetry: (id:string) => void;
  id: string;
}

export interface TypingIndicatorProps {
  typingIndicator: boolean;
}

export interface BackupAlertProps {
  openAlert: boolean;
  handleRestore: () => void;
  handleNewConvo: () => void;
}

export interface WelcomeBubbleProps {
  welcomeMessage: boolean;
  closeWelcomeMessage: () => void;
  handleChangeIcon: () => void;
}

export interface WelcomeCircleProps {
  changeIcon: boolean;
  welcomeMessage: boolean;
  handleChangeIcon: () => void;
  image: string;
  width: number;
}

export interface HomeProps {
  changeIcon: boolean;
  openAlert: boolean;
  welcomeMessage: boolean;
  closeWelcomeMessage: () => void;
  handleChangeIcon: () => void;
  handleNewConvo: () => void;
  handleRestore: () => void;
}

export interface APIRequestBody {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
}

export enum Statuses {
  initial = '',
  failed = 'failed',
  retrying = 'retrying',
  success = 'success',
  sending = 'sending',
}

export enum Roles {
  user = 'user',
  assistant = 'assistant',
}
