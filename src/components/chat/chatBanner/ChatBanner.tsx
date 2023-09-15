// import Image from "../../../Images/logo192.png";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import '../../../assets/stylesheets/chat/chatBanner.scss'

const ChatBanner = () => {
  return (
    <>
      <div className="banner">
        <div className="bannerAvatar">
          <img alt="Chat Avatar" src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png' width="20" />
        </div>
        <div className="bannerBotDetails">
          <Typography variant="body2">Mini ChatGPT</Typography>
          <Typography
            variant="caption"
            style={{ fontSize: 11, color: green[300] }}
          >
            Online
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ChatBanner;
