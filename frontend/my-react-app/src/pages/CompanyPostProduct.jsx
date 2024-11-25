import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CompanyLayout from '../components/CompanyLayout.jsx';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { postProduct } from '../api.js';

const CompanyPostProduct = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await postProduct(data);

      return response.data;
    },
    onSuccess: (data) => {
      console.log('Product posted successfully:', data);
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
    <CompanyLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4"
        >
          <Typography
            level="h4"
            className="mb-6 text-center text-teal-600 font-bold"
          >
            Post Product
          </Typography>
          {/* Name */}
          <Input
            className="w-full"
            type="text"
            placeholder="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* Price */}
          <Input
            className="w-full"
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {/* Image URL */}
          <Input
            className="w-full"
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {formData.image && (
            <div className="w-full flex items-center justify-center mt-4">
              <img
                src={formData.image}
                alt="Product Preview"
                className="max-h-32 object-contain rounded-md border border-gray-300"
              />
            </div>
          )}
          {/* Submit Button */}
          <Button
            className="w-full mt-4"
            type="submit"
            variant="solid"
            color="primary"
            loading={mutation.isPending}
          >
            {mutation.isPending ? 'Submitting...' : 'Post Product'}
          </Button>
        </form>
      </div>
    </CompanyLayout>
  );
};

export default CompanyPostProduct;
