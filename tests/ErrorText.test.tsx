import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorText } from '../src/components/chat/errorAndRetry/ErrorText';

const handleRetry = jest.fn();

test('calls the event handler upon clicking on retruy button', async () => {
  render(<ErrorText handleRetry={handleRetry} id='1' />);
  await screen.findByTestId('retry-button');
  fireEvent.click(screen.getByTestId('retry-button'));
  expect(handleRetry).toHaveBeenCalledTimes(1);
});
