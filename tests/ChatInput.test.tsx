import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInput from '../src/components/chat/chatInput/ChatInput';
import { Statuses } from '../src/constants';

const { initial, success, failed } = Statuses;

const input = 'test';
const handleInputChange = jest.fn();
const handleEnter = jest.fn();
const handleSend = jest.fn();

test('displays the send icon when input prop string length is gretaer than 0 and status is success', async () => {
  render(<ChatInput input={input} handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} status={success} />);
  await screen.findByTestId('TelegramIcon');
  expect(screen.getByTestId('TelegramIcon')).toBeVisible();
});

test('does not display the send icon when input prop string length is 0', async () => {
  render(<ChatInput input="" handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} status={success} />);
  expect(screen.queryByTestId('TelegramIcon')).toBeNull();
});

test('does not display the send icon when status is failed or retrying', async () => {
  render(<ChatInput input="test" handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} status={failed} />);
  expect(screen.queryByTestId('TelegramIcon')).toBeNull();
});

test('calls the event handler upon clicking on send button', async () => {
  render(<ChatInput input={input} handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} status={success} />);
  await screen.findByTestId('TelegramIcon');
  fireEvent.click(screen.getByTestId('TelegramIcon'));
  expect(handleSend).toHaveBeenCalledTimes(1);
});

test('calls the event handler upon clicking on enter in keyboard', async () => {
  render(<ChatInput input={input} handleInputChange={handleInputChange} handleEnter={handleEnter} handleSend={handleSend} status={initial} />);
  await screen.findByTestId('TelegramIcon');
  fireEvent.keyDown(screen.getByTestId('chat-text-area'), {key: 'Enter'});
  expect(handleEnter).toHaveBeenCalledTimes(1);
});