import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DeliveryServiceLayout from '../components/DeliveryServiceLayout.jsx';
import { getAssignedDeliveries } from '../api.js';
import { Card, Button, Skeleton, Typography } from '@mui/joy';
import AssignedPurchase from '../components/AssignedPurchase.jsx';

const DeliveryServiceHome = () => {
  const queryClient = useQueryClient();

  // Fetch assigned deliveries using useQuery (TanStack Query v5)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['assignedDeliveries'],
    queryFn: async () => {
      const res = await getAssignedDeliveries();
      return res.data;
    },
  });

  // Mutation to mark order as delivered
  const deliverMutation = useMutation({
    mutationFn() {},
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedDeliveries']);
    },
  });

  const handleDeliver = (orderId) => {
    // deliverMutation.mutate({ orderId });
  };

  return (
    <DeliveryServiceLayout>
      <div className="p-4">
        <Typography
          level="h4"
          className="mb-6 text-center text-teal-500 font-bold"
        >
          Assigned Deliveries
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={200}
                  className="w-full"
                />
              ))
            : data?.map((order) => (
                <AssignedPurchase order={order} onSuccess={() => refetch()} />
              ))}
        </div>
      </div>
    </DeliveryServiceLayout>
  );
};

export default DeliveryServiceHome;
