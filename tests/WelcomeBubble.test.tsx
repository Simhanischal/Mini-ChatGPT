import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeBubble from '../src/components/home/welcomeBubble/WelcomeBubble';

test('loads and displays welcome bubble if welcomeMessage is true', async () => {
  render(<WelcomeBubble welcomeMessage={true} closeWelcomeMessage={() => {}} handleChangeIcon={() => {}} />);
  await screen.findByTestId('CancelIcon');
  await screen.findByTestId('bubble');
  expect(screen.getByTestId('CancelIcon')).toBeVisible();
  expect(screen.getByTestId('bubble')).toHaveTextContent('Hey there, welcome back! Anything I can help you with?');
});

test('does not display welcome bubble if welcomeMessage is false', async () => {
  render(<WelcomeBubble welcomeMessage={false} closeWelcomeMessage={() => {}} handleChangeIcon={() => {}} />);
  expect(screen.queryByTestId('CancelIcon')).toBeNull();
  expect(screen.queryByTestId('bubble')).toBeNull();
});

