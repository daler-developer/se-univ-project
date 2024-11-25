import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { deliveryServiceLogin } from '../api.js';
import { useAuthStore } from '../store.js';
import Error from '../components/Error.jsx';

const DeliveryServiceLogin = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const { setDeliveryService } = useAuthStore();

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await deliveryServiceLogin(data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem(
        'deliveryService',
        JSON.stringify(data.deliveryService)
      );
      setDeliveryService(data.deliveryService);
    },
    onError(data) {
      console.log('data', data);
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <Typography
          level="h4"
          className="mb-6 text-center text-teal-500 font-bold"
        >
          Delivery Service Login
        </Typography>
        <div className="space-y-4">
          {/* Name */}
          <Input
            className="w-full"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* Password */}
          <Input
            className="w-full"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Error error={mutation.error?.response?.data?.error} />
          {/* Submit Button */}
          <Button
            className="w-full mt-4"
            type="submit"
            variant="solid"
            color="primary"
            loading={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryServiceLogin;
