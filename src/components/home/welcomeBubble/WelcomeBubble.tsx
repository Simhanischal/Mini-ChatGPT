import CancelIcon from '@mui/icons-material/Cancel';
import '../../../assets/stylesheets/home/WelcomeBubble.scss';
import { WelcomeBubbleProps } from '../../../constants';

const WelcomeBubble = ({ welcomeMessage, closeWelcomeMessage, handleChangeIcon }: WelcomeBubbleProps) => {
  return (
    welcomeMessage && <>
      <CancelIcon
        className='cancel'
        id='cancel'
        fontSize='small'
        onClick={closeWelcomeMessage}
      />
      <div
        className='bubble-div'
        data-testid='bubble'
        onClick={handleChangeIcon}
      >
        Hey there, welcome back!
        Anything I can help you with?
      </div>
    </>
  );
}

export default WelcomeBubble;