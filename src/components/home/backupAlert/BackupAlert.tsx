import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

interface BackupAlertProps {
  openAlert: boolean;
  handleRestore: () => void;
  handleNewConvo: () => void;
}

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
        <Button id="restore-button" onClick={handleRestore}>
          Yes, restore!
        </Button>
        <Button id="new-convo-button" onClick={handleNewConvo}>
          No, start a new conversation!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BackupAlert;