import '../../../assets/stylesheets/home/welcomeCircle.scss';
import Badge from '@mui/material/Badge';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CloseIcon from '@mui/icons-material/Close';

interface WelcomeCircleProps {
  changeIcon: boolean;
  welcomeMessage: boolean;
  handleChangeIcon: () => void;
  image: string;
  width: number;
}

const WelcomeCircle = ({changeIcon, welcomeMessage, handleChangeIcon, image, width}: WelcomeCircleProps) => {
  let display, icon;

  if (changeIcon) {
    icon = <CloseIcon style={{ fontSize: 40, color: "#5851DB" }} />
  } else{
    icon = <QuestionAnswerOutlinedIcon style={{ fontSize: 40, color: "#5851DB" }} />
  }

  if (welcomeMessage) {
    display = (
      <>
        &nbsp;&nbsp;
        <Badge badgeContent={1} overlap="circular" color="error">
          <button className="avatar" data-testid="avatar-button" onClick={handleChangeIcon}>
            <img alt="avatar" data-testid="welcome-circle-image" src={image} width={width} />
          </button>
        </Badge> 
      </>
    );
  } else{
    display = (
      <button className="avatar" data-testid="avatar-button" onClick={handleChangeIcon}>
        { icon }
      </button>
    );
  }

  return display;
}

export default WelcomeCircle;