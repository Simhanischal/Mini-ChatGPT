import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeCircle from '../src/components/home/welcomeCircle/WelcomeCircle';

test('loads and displays initial chat icon when welcomeMessage and changeIcon is both false', async () => {
  render(<WelcomeCircle welcomeMessage={false} changeIcon={false} handleChangeIcon={() => {}} image='' width={200} />);
  await screen.findByTestId('QuestionAnswerOutlinedIcon');
  expect(screen.getByTestId('QuestionAnswerOutlinedIcon')).toBeVisible();
});

test('loads and displays initial clsoe chat icon when welcomeMessage is flase and changeIcon is true', async () => {
  render(<WelcomeCircle welcomeMessage={false} changeIcon={true} handleChangeIcon={() => {}} image='' width={200} />);
  await screen.findByTestId('CloseIcon');
  expect(screen.getByTestId('CloseIcon')).toBeVisible();
});

test('loads and displays initial chat icon with image when welcomeMessage is true', async () => {
  render(<WelcomeCircle welcomeMessage={true} changeIcon={false} handleChangeIcon={() => {}} image='' width={200} />);
  await screen.findByTestId('welcome-circle-image');
  expect(screen.getByTestId('welcome-circle-image')).toBeVisible();
});

