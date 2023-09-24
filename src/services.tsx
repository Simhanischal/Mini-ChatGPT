import { Message, Statuses, Roles, APIRequestBody } from './constants';

const { failed, success} = Statuses; 
const { user } = Roles;

export const fetchResponse = (
  url: string,
  API_KEY: string,
  apiRequestBody: APIRequestBody,
  messages: Array<Message>,
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>,
  setTypingIndicator: React.Dispatch<React.SetStateAction<boolean>>,
  setStatus: React.Dispatch<React.SetStateAction<Statuses>>,
) => {
  return new Promise(() => {
    fetch(url, {
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
      const newMessage = { ...reply, datetime: new Date().toLocaleString(), id: message.id };
      const newMessages = messages.map((message) => {
        if (message.role === user && !message.status) {
          return {...message, status: success};
        } else {
          return message;
        }
      });
      newMessages.push(newMessage)
      setMessages(newMessages);
      setTypingIndicator(false);
      setStatus(success);
    })
    .catch((error) => {
      setTypingIndicator(false);
      setStatus(failed);
      console.log(error);
    });
  })
};
