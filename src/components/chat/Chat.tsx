import React, { useState, useRef, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import ChatBanner from "../chat/chatBanner/ChatBanner";
import ChatBubble from "../chat/chatBubble/ChatBubble";
import ChatInput from "../chat/chatInput/ChatInput";
import ChatMessages from "../chat/chatMessages/ChatMessages";
import TypingIndicator from "../chat/typingIndicator/TypingIndicator";
import "../../assets/stylesheets/chat/chat.scss";
import { fetchResponse } from "../../services";
import { url, ChatProps, Roles, Statuses, Message } from '../../constants';

const API_KEY = import.meta.env.VITE_API_KEY;
const { initial, retrying, success } = Statuses;
const { user, assistant } = Roles;

const Chat = ({ messages, setMessages, openWindow, shouldRetrieveBackup }: ChatProps) => {
  const [input, setInput] = useState('');
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [status, setStatus] = useState(initial);
  const [retryMsgId, setRetryMsgId] = useState('');

  const messagesForApiBody = messages.map(({ role, content }) => ({ role, content }));
  const apiRequestBody = useMemo(() => {
    return {
      model: "gpt-3.5-turbo",
      messages: messagesForApiBody,
    }
  }, [messagesForApiBody]);

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
          role: user,
          content: userInput,
          datetime: new Date().toLocaleString(),
          id: uuidv4(),
        },
      ]);
      setTypingIndicator(true);
      setInput("");
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      ((status === initial || status === success) && handleSend());
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

  const handleRetry = async (id: string) => {
    setStatus(retrying);
    setRetryMsgId(id);
    fetchResponse(url, API_KEY, apiRequestBody, messages, setMessages, setTypingIndicator, setStatus);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, openWindow, status]);

  useEffect(() => {
    //store the updated conversation in localstorage whenever messages are updated
    if (messages.length > 1 || !shouldRetrieveBackup)
      window.localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages, shouldRetrieveBackup]);

  useEffect(() => {
    if (messages[messages.length - 1].role === user ) {
      fetchResponse(url, API_KEY, apiRequestBody, messages, setMessages, setTypingIndicator, setStatus);
    }
  }, [messages, setMessages, setTypingIndicator, apiRequestBody]);

  return (
    <>
      {openWindow && (
        <div className="chat-container">
          <ChatBanner />  
          <ChatMessages windowEndRef={windowEndRef}>
            {messages.map((message) => {
              if (message.role === assistant) {
                return (
                  <React.Fragment
                    key={message.datetime.concat(message.content)}
                  >
                    <ChatBubble
                      isBotBubble
                      message={message}
                      handleRetry={handleRetry}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment
                    key={message.datetime.concat(message.content)}
                  >
                    <ChatBubble
                      isBotBubble={false}
                      message={message}
                      status={status}
                      handleRetry={handleRetry}
                      retryMsgId={retryMsgId}
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
            status={status}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
