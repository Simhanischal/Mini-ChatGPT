import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TypingIndicator from '../src/components/chat/typingIndicator/TypingIndicator';

test('displays typing indictor when typingIndicator prop is true', async () => {
  render(<TypingIndicator typingIndicator />);
  await screen.findByTestId('typing-indicator');
  expect(screen.getByTestId('typing-indicator')).toBeVisible();
});

test('does not display typing indictor when typingIndicator prop is false', async () => {
  render(<TypingIndicator typingIndicator={false} />);
  expect(screen.queryByTestId('typing-indicator')).toBeNull();
});