import React, { useState, useRef, useEffect } from "react";
import ChatBanner from "../chat/chatBanner/ChatBanner";
import ChatBubble from "../chat/chatBubble/ChatBubble";
import ChatInput from "../chat/chatInput/ChatInput";
import ChatMessages from "../chat/chatMessages/ChatMessages";
import TypingIndicator from "../chat/typingIndicator/TypingIndicator";
import "../../assets/stylesheets/chat/chat.scss";

interface Message {
  type: string;
  message: string;
  datetime: string;
}

interface ChatProps {
  messages: Array<Message>;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
  openWindow: boolean;
  backup: boolean;
}

const Chat = ({ messages, setMessages, openWindow, backup }: ChatProps) => {
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);

  //creating a refernce for the end of chat window
  const windowEndRef: React.RefObject<HTMLDivElement> = useRef(null);

  //creating a refernce for chat input to focus upon render
  const inputRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  //takes the message user inputs in the chat and makes a POST API call to the server
  //to get the corresponding reply from the bot
  //repalce the placeholder method definition with the actual API call
  const fetchBotReply = () => {
    setTimeout(() => {
      setMessages((oldMessages: Array<Message>) => [
        ...oldMessages,
        {
          type: "bot",
          //default message
          message:
            "Sorry, I dont understand that! Please connect me to a ChatBot API to get proper responses! Have a good day!",
          datetime: new Date().toLocaleString(),
        },
      ]);
      setTypingIndicator(false);
    }, 2000);
  };

  const handleSend = (userInput = input) => {
    if (userInput !== "") {
      setMessages((oldMessages: Array<Message>) => [
        ...oldMessages,
        {
          type: "user",
          message: userInput,
          datetime: new Date().toLocaleString(),
        },
      ]);
      setTypingIndicator(true);
      fetchBotReply();
      setInput("");
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    if (windowEndRef.current) {
      const scrollHeight = windowEndRef.current.scrollHeight;
      const height = windowEndRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      windowEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, openWindow]);

  useEffect(() => {
    //store the updated conversation in localstorage whenever messages are updated
    if (messages.length > 1 || !backup)
      window.localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages, backup]);

  return (
    <>
      {openWindow && (
        <div className="chat-container">
          <ChatBanner />
          <ChatMessages windowEndRef={windowEndRef}>
            {messages.map((message) => {
              if (message.type === "bot") {
                return (
                  <React.Fragment
                    key={message.datetime.concat(message.message)}
                  >
                    <ChatBubble
                      isBotBubble
                      message={message.message}
                      datetime={message.datetime}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment
                    key={message.datetime.concat(message.message)}
                  >
                    <br />
                    <ChatBubble
                      isBotBubble={false}
                      message={message.message}
                      datetime={message.datetime}
                    />
                  </React.Fragment>
                );
              }
            })}
          </ChatMessages>
          <TypingIndicator typingIndicator={typingIndicator} />
          <ChatInput
            input={input}
            inputRef={inputRef}
            handleInputChange={handleInputChange}
            handleSend={handleSend}
            handleEnter={handleEnter}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
