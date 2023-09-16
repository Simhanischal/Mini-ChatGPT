import '../../../assets/stylesheets/home/welcomeCircle.scss';
import Badge from '@material-ui/core/Badge';
import QuestionAnswerIconOutlined from '@material-ui/icons/QuestionAnswerOutlined';
import CloseIcon from '@material-ui/icons/Close';

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
    icon = <QuestionAnswerIconOutlined style={{ fontSize: 40, color: "#5851DB" }} />
  }

  if (welcomeMessage) {
    display = (
      <>
        &nbsp;&nbsp;
        <Badge badgeContent={1} overlap="circular" color="error">
          <button className="avatar" onClick={handleChangeIcon}>
            <img alt="avatar" src={image} width={width} />
          </button>
        </Badge> 
      </>
    );
  } else{
    display = (
      <button className="avatar" onClick={handleChangeIcon}>
        { icon }
      </button>
    );
  }

  return display;
}

export default WelcomeCircle;