import React from 'react';
import { Modal, ModalDialog, Typography, Avatar, Skeleton } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { companyGetReviews } from '../api.js';
import 'tailwindcss/tailwind.css';

const CustomRating = ({ max = 10, value }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 ${index < value ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568L24 9.432l-6 5.856 1.416 8.683L12 18.896l-7.416 4.075L6 15.288 0 9.432l8.332-1.277L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

const ProductReviewsModal = ({ open, onClose, productId }) => {
  // Fetch product reviews using useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['productReviews', productId],
    async queryFn() {
      const res = await companyGetReviews(productId);

      return res.data;
    },
    enabled: open,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <ModalDialog className="p-6 rounded-lg bg-white w-full max-w-lg">
        <Typography level="h4" className="mb-6 text-center font-bold">
          Product Reviews
        </Typography>
        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={100}
                  className="w-full"
                />
              ))
            : data?.map((review) => (
                <div
                  key={review.id}
                  className="flex items-start space-x-4 p-4 border rounded-md shadow-sm"
                >
                  <Avatar
                    src={review.company.profilePicture}
                    alt={review.company.name}
                    className="w-12 h-12"
                  />
                  <div className="flex-1">
                    <Typography level="h6" className="font-semibold">
                      {review.company.name}
                    </Typography>
                    <CustomRating max={10} value={review.stars} />
                    <Typography level="body2" className="mt-2 text-gray-600">
                      {review.text}
                    </Typography>
                  </div>
                </div>
              ))}
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default ProductReviewsModal;
