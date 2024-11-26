import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { deliveryServiceRegister } from '../api.js';
import { useAuthStore } from '../store.js';
import { Link } from 'react-router-dom';

const DeliveryServiceRegister = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    logoUrl: '',
    phone: '',
  });

  const { setDeliveryService } = useAuthStore();

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await deliveryServiceRegister(data);
      return response.data;
    },
    onSuccess(data) {
      localStorage.setItem(
        'deliveryService',
        JSON.stringify(data.deliveryService)
      );
      setDeliveryService(data.deliveryService);
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
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <Typography
          level="h4"
          className="mb-6 text-center text-teal-500 font-bold"
        >
          Delivery Service Register
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
          {/* Logo URL */}
          <Input
            className="w-full"
            type="text"
            placeholder="Logo URL"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            required
          />
          {formData.logoUrl && (
            <div className="w-full flex items-center justify-center mt-4">
              <img
                src={formData.logoUrl}
                alt="Logo Preview"
                className="max-h-32 object-contain"
              />
            </div>
          )}
          {/* Phone */}
          <Input
            className="w-full"
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {/* Submit Button */}
          <Button
            className="w-full mt-4"
            type="submit"
            variant="solid"
            color="primary"
            loading={mutation.isPending}
          >
            {mutation.isPending ? 'Submitting...' : 'Register'}
          </Button>
        </div>
        <Typography level="body2" className="text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/delivery-service-login"
            className="text-teal-600 hover:underline"
          >
            Login
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default DeliveryServiceRegister;
