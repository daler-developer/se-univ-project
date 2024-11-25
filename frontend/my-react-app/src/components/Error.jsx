import Typography from '@mui/joy/Typography';
import Alert from '@mui/joy/Alert';

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <Alert variant="soft" color="danger" className="w-full max-w-md mt-4">
      <Typography level="body1" className="text-center">
        {error}
      </Typography>
    </Alert>
  );
};

export default ErrorMessage;
