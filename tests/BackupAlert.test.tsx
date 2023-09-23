import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import BackupAlert from '../src/components/home/backupAlert/BackupAlert';

const handleRestore = jest.fn();
const handleNewConvo = jest.fn();

test('loads and displays backup alert when openAlert is true', async () => {
  render(<BackupAlert openAlert handleRestore={handleRestore} handleNewConvo={handleNewConvo} />);
  await screen.findByTestId('sentinelStart');
  expect(screen.getByTestId('sentinelStart')).toBeVisible();
});

test('does not display backup alert when openAlert is false', async () => {
  render(<BackupAlert openAlert={false} handleRestore={handleRestore} handleNewConvo={handleNewConvo} />);
  expect(screen.queryByTestId('sentinelStart')).toBeNull();
});

test('calls the event handler upon clicking on restore button', async () => {
  render(<BackupAlert openAlert handleRestore={handleRestore} handleNewConvo={handleNewConvo} />);
  await screen.findByTestId('restore-button');
  fireEvent.click(screen.getByTestId('restore-button'));
  expect(handleRestore).toHaveBeenCalledTimes(1);
});

test('calls the event handler upon clicking on backup button', async () => {
  render(<BackupAlert openAlert handleRestore={handleRestore} handleNewConvo={handleNewConvo} />);
  await screen.findByTestId('new-convo-button');
  fireEvent.click(screen.getByTestId('new-convo-button'));
  expect(handleNewConvo).toHaveBeenCalledTimes(1);
});

