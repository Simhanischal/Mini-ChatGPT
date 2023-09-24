import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

import { BackupAlertProps } from '../../../constants';

const BackupAlert = ({ openAlert, handleRestore, handleNewConvo }: BackupAlertProps) => {
  return (
    <Dialog
      open={openAlert}
    >
      <DialogTitle>
        {"Restore our chat backup?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hey buddy, good news! I just found a backup of our most recent
          conversation, would you like me to restore that backup?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button id="restore-button" data-testid="restore-button" onClick={handleRestore}>
          Yes, restore!
        </Button>
        <Button id="new-convo-button" data-testid="new-convo-button" onClick={handleNewConvo}>
          No, start a new conversation!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BackupAlert;