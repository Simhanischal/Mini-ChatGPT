import "../../../assets/stylesheets/chat/chatMessages.scss";

interface ChatMessagesProps {
  windowEndRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const ChatMessages = ({ windowEndRef, children }: ChatMessagesProps) => {
  return (
    <div className="messages-container" ref={windowEndRef}>
      {children}
    </div>
  );
};

export default ChatMessages;
