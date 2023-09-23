import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeBubble from '../src/components/home/welcomeBubble/WelcomeBubble';

const handleChangeIcon = jest.fn();
const closeWelcomeMessage = jest.fn();

test('loads and displays welcome bubble if welcomeMessage is true', async () => {
  render(<WelcomeBubble welcomeMessage closeWelcomeMessage={closeWelcomeMessage} handleChangeIcon={handleChangeIcon} />);
  await screen.findByTestId('CancelIcon');
  await screen.findByTestId('bubble');
  expect(screen.getByTestId('CancelIcon')).toBeVisible();
  expect(screen.getByTestId('bubble')).toHaveTextContent('Hey there, welcome back! Anything I can help you with?');
});

test('does not display welcome bubble if welcomeMessage is false', async () => {
  render(<WelcomeBubble welcomeMessage={false} closeWelcomeMessage={closeWelcomeMessage} handleChangeIcon={handleChangeIcon} />);
  expect(screen.queryByTestId('CancelIcon')).toBeNull();
  expect(screen.queryByTestId('bubble')).toBeNull();
});

test('calls the event handler upon clicking on cancel icon', async () => {
  render(<WelcomeBubble welcomeMessage closeWelcomeMessage={closeWelcomeMessage} handleChangeIcon={handleChangeIcon} />);
  await screen.findByTestId('CancelIcon');
  await screen.findByTestId('bubble');
  fireEvent.click(screen.getByTestId('CancelIcon'));
  expect(closeWelcomeMessage).toHaveBeenCalledTimes(1);
});

test('calls the event handler upon clicking on the bubble', async () => {
  render(<WelcomeBubble welcomeMessage closeWelcomeMessage={closeWelcomeMessage} handleChangeIcon={handleChangeIcon} />);
  await screen.findByTestId('CancelIcon');
  await screen.findByTestId('bubble');
  fireEvent.click(screen.getByTestId('bubble'));
  expect(handleChangeIcon).toHaveBeenCalledTimes(1);
});

