import WelcomeBubble from './welcomeBubble/WelcomeBubble';
import WelcomeCircle from './welcomeCircle/WelcomeCircle';
import BackupAlert from './backupAlert/BackupAlert';

import Image from '../../assets/images/logo192.png';
import '../../assets/stylesheets/home/Home.scss';
import { HomeProps } from '../../constants';

const Welcome = (props: HomeProps) => {
  const { changeIcon, welcomeMessage, handleChangeIcon, closeWelcomeMessage, openAlert, handleNewConvo, handleRestore } = props;
  return (
    <div className='welcome-container'>
      <WelcomeBubble
        welcomeMessage={welcomeMessage}
        closeWelcomeMessage={closeWelcomeMessage}
        handleChangeIcon={handleChangeIcon}
      />
      <WelcomeCircle
        changeIcon={changeIcon}
        handleChangeIcon={handleChangeIcon}
        welcomeMessage={welcomeMessage}
        image={Image}
        width={50}
      />
      <BackupAlert
        openAlert={openAlert}
        handleRestore={handleRestore}
        handleNewConvo={handleNewConvo}
      />
    </div>
  );
}

export default Welcome;