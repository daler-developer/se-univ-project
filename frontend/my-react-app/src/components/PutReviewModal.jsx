import { useState } from 'react';
import { Modal, ModalDialog, Typography, Button, Input } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { companyPutReview } from '../api.js';

const CustomRating = ({ max = 10, value, onChange }) => {
  const handleStarClick = (index) => {
    onChange(index + 1);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, index) => (
        <svg
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseOver={() => handleStarClick(index)}
          className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
            index < value ? 'text-yellow-500' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568L24 9.432l-6 5.856 1.416 8.683L12 18.896l-7.416 4.075L6 15.288 0 9.432l8.332-1.277L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

const PutReviewModal = ({ open, onClose, productId, onSuccess }) => {
  const [text, setText] = useState('');
  const [stars, setStars] = useState(4);

  // Mutation to submit the review
  const putReviewMutation = useMutation({
    async mutationFn() {
      const res = await companyPutReview(productId, { text, stars });

      return res.data;
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    },
  });

  const handleSubmit = () => {
    if (productId && text && stars) {
      putReviewMutation.mutate({ productId, text, stars });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <ModalDialog className="p-6 rounded-lg bg-white w-full max-w-md">
        <Typography level="h4" className="mb-4 text-center font-bold">
          Write a Review
        </Typography>
        <Input
          className="mb-4 w-full"
          placeholder="Enter your review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <div className="mb-4 flex items-center justify-center">
          <CustomRating
            max={10}
            value={stars}
            onChange={(newValue) => setStars(newValue)}
            size="large"
            className="text-yellow-500"
          />
        </div>
        <Button
          variant="solid"
          color="primary"
          onClick={handleSubmit}
          loading={putReviewMutation.isPending}
          className="w-full mt-4"
        >
          Submit Review
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default PutReviewModal;
