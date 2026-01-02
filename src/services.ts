import { Message, Statuses, Roles, APIRequestBody } from './models';
import { GoogleGenAI } from "@google/genai";

const { failed, success} = Statuses; 
const { user } = Roles;

export const fetchResponse = async (
  API_KEY: string,
  apiRequestBody: APIRequestBody,
  messages: Array<Message>,
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>,
  setTypingIndicator: React.Dispatch<React.SetStateAction<boolean>>,
  setStatus: React.Dispatch<React.SetStateAction<Statuses>>,
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: apiRequestBody.model,
      contents: apiRequestBody.messages,
    });
    const reply = response.text;
    const newMessage = { role: Roles.assistant, content: reply as string, datetime: new Date().toLocaleString(), id: response.responseId as string };
    const newMessages = messages.map((message) => {
      if (message.role === user && !message.status) {
        return {...message, status: success};
      } 
      return message;
    });
    newMessages.push(newMessage)
    setMessages(newMessages);
    setTypingIndicator(false);
    setStatus(success);
  } catch (error) {
    setTypingIndicator(false);
    setStatus(failed);
    console.log(error);
  }
}
