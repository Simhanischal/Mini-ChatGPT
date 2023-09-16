import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TelegramIcon from '@material-ui/icons/Telegram';
import '../../../assets/stylesheets/chat/chatInput.scss';

interface ChatInputProps {
  input: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  handleInputChange: () => void;
  handleEnter: () => void;
  handleSend: () => void;
}

const ChatInput = (props: ChatInputProps) => {
  const { input, inputRef, handleInputChange, handleEnter, handleSend } = props;

  useEffect(() => {
    //if the device is not a mobile, then autofocus
    //this case is being handled because of keyboard popping up
    //in mobile devices as soon as the text area is focused
    if (window.screen.width > 500)
      inputRef.current?.focus();
  });

  return (
    <>
      <div className='chat-input-container'>
        <textarea
          className='chat-text-area'
          placeholder="Ask me anything!"
          value={input}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        />
        {
          input.length > 0 &&
          <IconButton id="iconbutton" onClick={() => handleSend()}>
            <TelegramIcon className='chat-send' />
          </IconButton>
        }
      </div>
    </>
  );
}

export default ChatInput;