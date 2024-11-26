import { Button, Card, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { companyDeleteProduct } from '../api.js';
import PutReviewModal from './PutReviewModal.jsx';
import { useState } from 'react';
import ProductReviewsModal from './ProductReviewsModal.jsx';
import BuyProductModal from './BuyProductModal.jsx';

const Product = ({
  product,
  onDeleteSuccess,
  withBuy = false,
  withDelete = true,
}) => {
  const [putReviewModalOpen, setPutReviewModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [buyProductModalOpen, setBuyProductModalOpen] = useState(false);

  const deleteMutation = useMutation({
    async mutationFn() {
      const res = await companyDeleteProduct(product.id);

      return res.data;
    },
    onSuccess: () => {
      if (onDeleteSuccess) {
        onDeleteSuccess?.();
      }
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleShowReviews = () => {
    console.log(`Show reviews for product ${product.id}`); // Placeholder for showing reviews logic
  };

  return (
    <>
      <div>
        <Card key={product.id} className="p-4 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <Typography level="h6" className="font-semibold">
            {product.name}
          </Typography>
          <Typography level="body2" className="text-gray-600">
            ${product.price}
          </Typography>
          <Typography level="body2" className="text-gray-500 mt-2">
            Purchases: {product.purchasesCount}
          </Typography>
          {withDelete && (
            <Button
              variant="solid"
              color="danger"
              className="absolute top-2 right-2"
              onClick={handleDelete}
              loading={deleteMutation.isPending}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className="mt-4 w-full"
            onClick={() => setReviewsModalOpen(true)}
          >
            Show Reviews
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="mt-4 w-full"
            onClick={() => setPutReviewModalOpen(true)}
          >
            Put Review
          </Button>
          {withBuy && (
            <Button
              variant="outlined"
              color="primary"
              className="mt-4 w-full"
              onClick={() => setBuyProductModalOpen(true)}
            >
              Buy Product
            </Button>
          )}
        </Card>
      </div>
      <PutReviewModal
        productId={product.id}
        open={putReviewModalOpen}
        onClose={() => setPutReviewModalOpen(false)}
      />
      <ProductReviewsModal
        productId={product.id}
        open={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
      />
      <BuyProductModal
        product={product}
        open={buyProductModalOpen}
        onClose={() => setBuyProductModalOpen(false)}
      />
    </>
  );
};

export default Product;
