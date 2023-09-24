import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import '../../../assets/stylesheets/chat/chatBubble.scss';
import { ErrorTextProps } from '../../../constants';

export const ErrorText = (props: ErrorTextProps) => (
  <div className="error-div">
    <ErrorOutlineIcon className="failed-icon" />
    <p className="failed-text">Failed to get response.</p>
    <button className='retry-button' data-testid='retry-button' onClick={() => props.handleRetry(props.id)}>Retry</button>
  </div>
);

export const RetryText = () => (
  <div className="retry-div">
    <p className="retrying-text">Retrying...</p>
  </div>
);
