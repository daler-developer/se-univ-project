import { Link } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Typography level="h2" className="mb-8 text-teal-600 font-bold">
        Welcome to Our Service
      </Typography>
      <div className="space-x-6">
        <Link to="/company/register">
          <Button
            variant="solid"
            color="primary"
            className="px-6 py-3 shadow-md transition duration-300"
          >
            Company
          </Button>
        </Link>
        <Link to="/delivery-service/register">
          <Button
            variant="solid"
            color="success"
            className="px-6 py-3 shadow-md transition duration-300"
          >
            Delivery Service
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
