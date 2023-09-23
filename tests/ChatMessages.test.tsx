import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatMessages from '../src/components/chat/chatMessages/ChatMessages';

const children = 'Messages';

test('displays the messages', async () => {
  render(<ChatMessages children={children} />);
  await screen.findByText('Messages');
  expect(screen.getByText('Messages')).toBeVisible();
});