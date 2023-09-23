import { ErrorText, RetryText } from '../errorAndRetry/ErrorText';
import Image from '../../../assets/images/logo192.png';
import '../../../assets/stylesheets/chat/chatBubble.scss';

interface Message {
  role: string;
  content: string;
  datetime: string;
  id: string;
  status?: string;
}

interface ChatBubbleProps {
  isBotBubble: boolean;
  message: Message;
  status?: string;
  handleRetry: (id: string) => void;
  retryMsgId?: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  let classNameText;
  const { isBotBubble, message, handleRetry, retryMsgId, status } = props;
  const { datetime, status: msgStatus, id, role, content } = message;

  if (isBotBubble) {
    classNameText = "bot";
  } else {
    classNameText = "user";
  }

  return (
    <div className={`${classNameText}-bubble-div`}>
      {isBotBubble && <img alt="Chat Avatar" data-testid="bubble-avatar" className="chat-avatar" src={Image} />}
      <div className={`${classNameText}-bubble`} data-testid="bubble-message" id="bubble">
        {message}
      </div>
      <br />
      <div className={`${classNameText}-date-time`} data-testid="bubble-datetime" id="datetime">
        {datetime}
      </div>
      <br/>
      
      {(status === 'failed' && role === 'user' && msgStatus !== 'success') ? (
        <ErrorText handleRetry={handleRetry} id={id} />
      ) : (status === 'retrying' && id === retryMsgId) && <RetryText />
      }
    </div>
  );
}

export default ChatBubble;