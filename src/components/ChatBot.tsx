import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Home from './home/Home';
import Chat from './chat/Chat';

const ChatBot = () => {
  const localMessages = window.localStorage.getItem("messages");
  const defaultMessages = [{
    'role': 'assistant',
    'content': 'Hey there, welcome back! Anything I can help you with?',
    'datetime': new Date().toLocaleString(),
    'id': uuidv4(),
  }];
  const [changeIcon, setChangeIcon] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [openWindow, setOpenWindow] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [shouldRetrieveBackup, setShouldRetrieveBackup] = useState(true);
  const [messages, setMessages] = useState(
    shouldRetrieveBackup && localMessages && JSON.parse(localMessages) !== null
      ? JSON.parse(localMessages)
      : defaultMessages);

  const closeWelcomeMessage = () => {
    setWelcomeMessage(false); //hides the welcome bubble
  }

  const handleChangeIcon = () => {
    //if the icon is 'x', change it to chat icon
    if (changeIcon) {
      setChangeIcon(false);
      setOpenWindow(false);
    }
    //if the icon is chat icon, close welcome bubble
    else {
      closeWelcomeMessage();
      setChangeIcon(true);
      if (firstClick
        && localMessages && JSON.parse(localMessages) !== null
        && JSON.parse(localMessages).length > 1
      ) {
        setOpenAlert(true);
      }
      else {
        setOpenWindow(true);
      }
      //set the first click to false on clicking it the first time to open the restore backup alert
      setFirstClick(false);
    }
  }

  const handleRestore = () => {
    setShouldRetrieveBackup(true);
    setOpenAlert(false);
    setOpenWindow(true);
  }

  const handleNewConvo = () => {
    setShouldRetrieveBackup(false);
    localStorage.clear();
    setMessages(defaultMessages);
    setOpenAlert(false);
    setOpenWindow(true);
  }

  return (
    <>
      <Home
        changeIcon={changeIcon}
        handleChangeIcon={handleChangeIcon}
        welcomeMessage={welcomeMessage}
        closeWelcomeMessage={closeWelcomeMessage}
        openAlert={openAlert}
        handleRestore={handleRestore}
        handleNewConvo={handleNewConvo}
      />
      <Chat
        messages={messages}
        setMessages={setMessages}
        openWindow={openWindow}
        shouldRetrieveBackup={shouldRetrieveBackup}
      />
    </>
  );
}

export default ChatBot;