import { useState } from 'react';
import {
  Typography
  , Modal
  , Button
  , Box
} from '@mui/material'



const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateGameModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button size="small"
        sx={{ color: "white" }}
        onClick={handleOpen}>
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center" margin="dense" sx={{ color: 'black' }}>
            Create a custom game
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateGameModal
