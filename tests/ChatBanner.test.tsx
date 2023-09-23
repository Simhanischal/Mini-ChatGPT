import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatBanner from '../src/components/chat/chatBanner/ChatBanner';

test('displays the banner', async () => {
  render(<ChatBanner />);
  await screen.findByText('Mini ChatGPT');
  expect(screen.getByText('Mini ChatGPT')).toBeVisible();
  expect(screen.getByText('Online')).toBeVisible();
});