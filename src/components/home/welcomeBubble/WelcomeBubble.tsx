import CancelIcon from '@material-ui/icons/cancel';
import '../../../assets/stylesheets/home/WelcomeBubble.scss';

interface WelcomeBubbleProps {
  welcomeMessage: boolean;
  closeWelcomeMessage: () => void;
  handleChangeIcon: () => void;
}

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
        id='bubble'
        onClick={handleChangeIcon}
      >
        Hey there, welcome back!
        Anything I can help you with?
      </div>
    </>
  );
}

export default WelcomeBubble;