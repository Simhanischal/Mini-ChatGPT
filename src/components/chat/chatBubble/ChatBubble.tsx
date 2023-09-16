import Image from '../../../assets/images/logo192.png';
import '../../../assets/stylesheets/chat/chatBubble.scss';

interface ChatBubbleProps {
  isBotBubble: boolean;
  message: string;
  dateTime: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  const { isBotBubble, message, dateTime } = props;

  return (
    <>
      <div className={ isBotBubble ? "bot-bubble-div" : "user-bubble-div" }>
        {isBotBubble && <img alt="Chat Avatar" className="chat-avatar" src={Image} />}
        <div className={ isBotBubble ? "bot-bubble" : "user-bubble" } id="bubble">
          {message}
        </div>
        <br />
        <div className={ isBotBubble ? "bot-date-time" : "user-date-time" } id="datetime">
          {dateTime}
        </div>
        <br/>
      </div>
    </>
  );
}

export default ChatBubble;