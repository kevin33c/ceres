import { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function Alerts({ severity }) {
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={openAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Test Alert
        </Alert>
      </Collapse>
    </Box>
  );
}

Alerts.defaultProps = {
  severity: 'error'
}

Alerts.prototype = {
  severity: PropTypes.string
}


export default Alerts