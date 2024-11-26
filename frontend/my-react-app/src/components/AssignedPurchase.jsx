import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Typography } from '@mui/joy';
import { markDelivered } from '../api.js';

const AssignedPurchase = ({ order, onSuccess }) => {
  // Mutation to mark the order as delivered
  const mutation = useMutation({
    mutationFn: async (orderId) => {
      const response = await markDelivered(orderId);
      return response.data;
    },
    onSuccess() {
      onSuccess?.();
    },
  });

  const handleDeliver = () => {
    mutation.mutate(order.id);
  };

  return (
    <Card key={order.id} className="p-4 shadow-md">
      <img
        src={order.product.image}
        alt={order.product.name}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      <Typography level="h6" className="font-semibold">
        {order.product.name}
      </Typography>
      <Typography level="body2" className="text-gray-600">
        Price: ${order.product.price}
      </Typography>
      <Typography level="body2" className="text-gray-500 mt-2">
        Status: {order.status}
      </Typography>
      {order.status === 'NEW' && (
        <Button
          variant="solid"
          color="primary"
          className="mt-4 w-full"
          onClick={handleDeliver}
          loading={mutation.isPending}
        >
          {mutation.isPending ? 'Delivering...' : 'Deliver'}
        </Button>
      )}
    </Card>
  );
};

export default AssignedPurchase;
