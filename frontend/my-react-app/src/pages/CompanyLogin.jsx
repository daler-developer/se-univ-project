import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { loginCompany } from '../api.js';
import { useAuthStore } from '../store.js';

const CompanyLogin = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const { setCompany } = useAuthStore();

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await loginCompany(data);

      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('company', JSON.stringify(data.company));
      setCompany(data.company);
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
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <Typography
          level="h4"
          className="mb-6 text-center text-teal-600 font-bold"
        >
          Company Login
        </Typography>
        {/* Email */}
        <Input
          className="w-full"
          type="text"
          placeholder="Email"
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
        {/* Submit Button */}
        <Button
          className="w-full mt-4"
          type="submit"
          variant="solid"
          color="primary"
          loading={mutation.isLoading}
        >
          {mutation.isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <div className="text-center mt-4">
          <Typography level="body2" className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/company/register"
              className="text-teal-600 hover:underline"
            >
              Register here
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default CompanyLogin;
