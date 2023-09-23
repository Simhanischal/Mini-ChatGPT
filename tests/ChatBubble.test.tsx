import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatBubble from '../src/components/chat/chatBubble/ChatBubble';

const botMessage = 'I am a bot';
const userMessage = 'I am an user';
const botDateTime = '16/09/2023, 20:00:08';
const userDateTime = '16/09/2023, 20:01:08';

test('displays the avatar when it is a bot chat bubble', async () => {
  render(<ChatBubble isBotBubble message={botMessage} datetime={botDateTime} />);
  await screen.findByTestId('bubble-avatar');
  expect(screen.getByTestId('bubble-avatar')).toBeVisible();
  expect(screen.getByTestId('bubble-message')).toHaveTextContent(botMessage);
  expect(screen.getByTestId('bubble-datetime')).toHaveTextContent(botDateTime);
});

test('does not display the avatar when it is a user chat bubble', async () => {
  render(<ChatBubble isBotBubble={false} message={userMessage} datetime={userDateTime} />);
  expect(screen.queryByTestId('bubble-avatar')).toBeNull();
  expect(screen.getByTestId('bubble-message')).toHaveTextContent(userMessage);
  expect(screen.getByTestId('bubble-datetime')).toHaveTextContent(userDateTime);
});