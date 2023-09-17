import Typography from '@mui/material/Typography';
import { green } from "@mui/material/colors";
import Image from "../../../assets/images/logo192.png";
import "../../../assets/stylesheets/chat/chatBanner.scss";

const ChatBanner = () => {
  return (
    <div className="banner">
      <div className="bannerAvatar">
        <img alt="Chat Avatar" src={Image} width="20" />
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
  );
};

export default ChatBanner;
