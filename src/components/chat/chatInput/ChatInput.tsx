import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import TelegramIcon from '@mui/icons-material/Telegram';
import '../../../assets/stylesheets/chat/chatInput.scss';

interface ChatInputProps {
  input: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleEnter: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
  status: string;
}

const ChatInput = (props: ChatInputProps) => {
  const { input, inputRef, handleInputChange, handleEnter, handleSend, status } = props;

  useEffect(() => {
    //if the device is not a mobile, then autofocus
    //this case is being handled because of keyboard popping up
    //in mobile devices as soon as the text area is focused
    if (window.screen.width > 500)
      inputRef?.current?.focus();
  });

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-text-area"
        data-testid="chat-text-area"
        placeholder="Ask me anything!"
        value={input}
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
      />
      {input.length > 0 && (status === '' || status === 'success') && (
        <IconButton id="iconbutton" onClick={() => handleSend()}>
          <TelegramIcon className="chat-send" />
        </IconButton>
      )}
    </div>
  );
}

export default ChatInput;