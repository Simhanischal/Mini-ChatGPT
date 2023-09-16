import Image from '../../../assets/images/logo192.png';
import '../../../assets/stylesheets/chat/chatBubble.scss';

interface ChatBubbleProps {
  isBotBubble: boolean;
  message: string;
  dateTime: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  let bubbleDiv, messageBubbleDiv, dateTimeDiv;
  const { isBotBubble, message, dateTime } = props;

  if (isBotBubble) {
    bubbleDiv = "bot-bubble-div";
    messageBubbleDiv = "bot-bubble";
    dateTimeDiv = "bot-date-time";
  } else {
    bubbleDiv = "user-bubble-div";
    messageBubbleDiv = "user-bubble";
    dateTimeDiv = "user-date-time";
  }

  return (
    <div className={bubbleDiv}>
      {isBotBubble && <img alt="Chat Avatar" className="chat-avatar" src={Image} />}
      <div className={messageBubbleDiv} id="bubble">
        {message}
      </div>
      <br />
      <div className={dateTimeDiv} id="datetime">
        {dateTime}
      </div>
      <br />
    </div>
  );
}

export default ChatBubble;