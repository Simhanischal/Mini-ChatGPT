import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatBubble from '../src/components/chat/chatBubble/ChatBubble';

const handleRetry = jest.fn();

const botMessage = {
  role: 'assistant',
  content: 'I am a bot',
  datetime: '16/09/2023, 20:00:08',
  id: '1',
}

const userMessage = {
  role: 'user',
  content: 'I am an user',
  datetime: '16/09/2023, 20:01:08',
  id: '2',
}

test('displays the avatar when it is a bot chat bubble', async () => {
  render(<ChatBubble isBotBubble message={botMessage} handleRetry={handleRetry} />);
  await screen.findByTestId('bubble-avatar');
  expect(screen.getByTestId('bubble-avatar')).toBeVisible();
  expect(screen.getByTestId('bubble-message')).toHaveTextContent(botMessage.content);
  expect(screen.getByTestId('bubble-datetime')).toHaveTextContent(botMessage.datetime);
});

test('does not display the avatar when it is a user chat bubble', async () => {
  render(<ChatBubble isBotBubble={false} message={userMessage} handleRetry={handleRetry} />);
  expect(screen.queryByTestId('bubble-avatar')).toBeNull();
  expect(screen.getByTestId('bubble-message')).toHaveTextContent(userMessage.content);
  expect(screen.getByTestId('bubble-datetime')).toHaveTextContent(userMessage.datetime);
});