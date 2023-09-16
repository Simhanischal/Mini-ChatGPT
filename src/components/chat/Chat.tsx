import React, { useState, useRef, useEffect } from "react";
import ChatBanner from "../chat/chatBanner/ChatBanner";
import ChatBubble from "../chat/chatBubble/ChatBubble";
import ChatInput from "../chat/chatInput/ChatInput";
import ChatMessages from "../chat/chatMessages/ChatMessages";
import TypingIndicator from "../chat/typingIndicator/TypingIndicator";
import "../../assets/stylesheets/chat/chat.scss";

interface Message {
  role: string;
  content: string;
  datetime: string;
}

interface ChatProps {
  messages: Array<Message>;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
  openWindow: boolean;
  shouldRetrieveBackup: boolean;
}

const API_KEY = import.meta.env.VITE_API_KEY; 

const Chat = ({ messages, setMessages, openWindow, shouldRetrieveBackup }: ChatProps) => {
  console.log('messages', messages)
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);

  //creating a refernce for the end of chat window
  const windowEndRef: React.RefObject<HTMLDivElement> = useRef(null);

  //creating a refernce for chat input to focus upon render
  const inputRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSend = (userInput = input) => {
    if (userInput !== "") {
      setMessages((oldMessages: Array<Message>) => [
        ...oldMessages,
        {
          role: "user",
          content: userInput,
          datetime: new Date().toLocaleString(),
        },
      ]);
      setTypingIndicator(true);
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
    if (messages.length > 1 || !shouldRetrieveBackup)
      window.localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages, shouldRetrieveBackup]);

  useEffect(() => {
    const messagesForApiBody = messages.map(({role, content}) => ({role, content}));
    console.log(messagesForApiBody);
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: messagesForApiBody,
    };
    
    const fetchResponse = () => {
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
      .then((response) => response.json())
      .then((message) => {
        const reply = message.choices[0].message;
        const newMessage = {...reply, datetime: new Date().toLocaleString()}
        setMessages([...messages, newMessage]);
        setTypingIndicator(false);
      });
    }

    if (messages[messages.length - 1].role === 'user') {
      fetchResponse();
    }
  }, [messages, setMessages]);

  return (
    <>
      {openWindow && (
        <div className="chat-container">
          <ChatBanner />
          <ChatMessages windowEndRef={windowEndRef}>
            {messages.map((message) => {
              if (message.role === "assistant") {
                return (
                  <React.Fragment
                    key={message.datetime.concat(message.content)}
                  >
                    <ChatBubble
                      isBotBubble
                      message={message.content}
                      datetime={message.datetime}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment
                    key={message.datetime.concat(message.content)}
                  >
                    <br />
                    <ChatBubble
                      isBotBubble={false}
                      message={message.content}
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
