import Alert from '@mui/material/Alert';

export default function Alerts() {
  return (
    <div sx={{ width: '80%' }} sx={{ position: 'fixed' }}>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
    </div>
  );
}