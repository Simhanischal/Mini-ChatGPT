import Image from "../../../assets/images/logo192.png";
import '../../../assets/stylesheets/chat/typingIndicator.scss';

interface TypingIndicatorProps {
  typingIndicator: boolean;
}

const TypingIndicator = ({ typingIndicator }: TypingIndicatorProps) => {
  let display;
  if (typingIndicator) {
    display = (
      <div className="container">
        <img className="chatAvatar" alt="Avatar" src={Image} />
        <span id="text">GPT is typing.....</span>
      </div>
    );
  } else {
    display = <div></div>;
  }
  return (
    /*display the typing indicator when the user hits on send or presses Enter key
      and stays there until we get a response from the API
      and it is displayed on the chat window*/
    <>{display}</>
  );
};

export default TypingIndicator;
