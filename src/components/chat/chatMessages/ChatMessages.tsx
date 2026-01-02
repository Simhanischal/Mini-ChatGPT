import "../../../assets/stylesheets/chat/chatMessages.scss";
import { ChatMessagesProps } from '../../../models';

const ChatMessages = ({ windowEndRef, children }: ChatMessagesProps) => {
  return (
    <div className="messages-container" ref={windowEndRef}>
      {children}
    </div>
  );
};

export default ChatMessages;
