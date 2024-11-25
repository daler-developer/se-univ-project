import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { registerCompany } from '../api.js';
import Error from '../components/Error.jsx';
import { useAuthStore } from '../store.js';
import { Link, useNavigate } from 'react-router-dom';

const CompanyRegister = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profilePicture: '',
    description: '',
    location: '',
    phone: '',
  });

  const navigate = useNavigate();

  const { setCompany } = useAuthStore();

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await registerCompany(data);

      return response.data;
    },
    onSuccess(data) {
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
          Company Register
        </Typography>
        {/* Email */}
        <Input
          className="w-full"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
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
        {/* Profile Picture URL */}
        <Input
          className="w-full"
          type="text"
          placeholder="Profile Picture URL"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
          required
        />
        {formData.profilePicture && (
          <div className="w-full flex items-center justify-center mt-4">
            <img
              src={formData.profilePicture}
              alt="Profile Preview"
              className="max-h-32 object-contain rounded-md border border-gray-300"
            />
          </div>
        )}
        {/* Description */}
        <Textarea
          className="w-full"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {/* Location */}
        <Input
          className="w-full"
          type="text"
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
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
          loading={mutation.isLoading}
        >
          {mutation.isLoading ? 'Submitting...' : 'Register'}
        </Button>
        <Error error={mutation.error?.response?.data?.error} />
        <div className="text-center mt-4">
          <Typography level="body2" className="text-gray-600">
            Already have an account?{' '}
            <Link to="/company/login" className="text-teal-600 hover:underline">
              Login here
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegister;
