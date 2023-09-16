import Image from '../../../assets/images/logo192.png';
import '../../../assets/stylesheets/chat/chatBubble.scss';

interface ChatBubbleProps {
  isBotBubble: boolean;
  message: string;
  dateTime: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  let classNameText;
  const { isBotBubble, message, dateTime } = props;

  if (isBotBubble) {
    classNameText = "bot";
  } else {
    classNameText = "user";
  }

  return (
    <div className={`${classNameText}-bubble-div`}>
      {isBotBubble && <img alt="Chat Avatar" className="chat-avatar" src={Image} />}
      <div className={`${classNameText}-bubble`} id="bubble">
        {message}
      </div>
      <br />
      <div className={`${classNameText}-date-time`} id="datetime">
        {dateTime}
      </div>
      <br />
    </div>
  );
}

export default ChatBubble;