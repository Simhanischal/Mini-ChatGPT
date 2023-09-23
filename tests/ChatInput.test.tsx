import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInput from '../src/components/chat/chatInput/ChatInput';

const input = 'test';
const handleInputChange = jest.fn();
const handleEnter = jest.fn();
const handleSend = jest.fn();

test('displays the send icon when input prop string length is gretaer than 0', async () => {
  render(<ChatInput input={input} handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} />);
  await screen.findByTestId('TelegramIcon');
  expect(screen.getByTestId('TelegramIcon')).toBeVisible();
});

test('does not display the send icon when input prop string length is 0', async () => {
  render(<ChatInput input="" handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} />);
  expect(screen.queryByTestId('TelegramIcon')).toBeNull();
});

test('calls the event handler upon clicking on send button', async () => {
  render(<ChatInput input={input} handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} />);
  await screen.findByTestId('TelegramIcon');
  fireEvent.click(screen.getByTestId('TelegramIcon'));
  expect(handleSend).toHaveBeenCalledTimes(1);
});

test('calls the event handler upon clicking on enter in keyboard', async () => {
  render(<ChatInput input={input} handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} />);
  await screen.findByTestId('TelegramIcon');
  fireEvent.keyDown(screen.getByTestId('chat-text-area'), {key: 'Enter'});
  expect(handleEnter).toHaveBeenCalledTimes(1);
});