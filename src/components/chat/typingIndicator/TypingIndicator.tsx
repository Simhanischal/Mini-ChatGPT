import Image from "../../../assets/images/logo192.png";
import "../../../assets/stylesheets/chat/typingIndicator.scss";

interface TypingIndicatorProps {
  typingIndicator: boolean;
}

const TypingIndicator = ({ typingIndicator }: TypingIndicatorProps) => {
  let display;
  if (typingIndicator) {
    display = (
      <div className="typing-indicator-container">
        <img className="chatAvatar" alt="Avatar" src={Image} />
        <span id="text">GPT is typing.....</span>
      </div>
    );
  } else {
    display = <div></div>;
  }
  return <>{display}</>;
};

export default TypingIndicator;