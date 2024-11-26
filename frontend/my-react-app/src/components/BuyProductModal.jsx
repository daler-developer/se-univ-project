import React, { useState } from 'react';
import {
  Modal,
  ModalDialog,
  Typography,
  Skeleton,
  Select,
  Option,
  Button,
} from '@mui/joy';
import { useQuery, useMutation } from '@tanstack/react-query';
import { purchaseProduct, getDeliveryServices } from '../api.js';
import 'tailwindcss/tailwind.css';

const BuyProductModal = ({ open, onClose, product }) => {
  const [selectedService, setSelectedService] = useState(null);

  // Fetch delivery services using useQuery (TanStack Query v5)
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ['deliveryServices'],
    queryFn: async () => {
      const res = await getDeliveryServices();
      return res.data;
    },
  });

  // Mutation to purchase a product
  const purchaseMutation = useMutation({
    async mutationFn() {
      const res = await purchaseProduct({
        productId: product.id,
        deliveryServiceId: selectedService,
      });
      return res.data;
    },
    onSuccess: () => {
      onClose(); // Close the modal on successful purchase
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedService) {
      purchaseMutation.mutate({
        productId: product.id,
        deliveryServiceId: selectedService,
      });
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
          Purchase {product?.name}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Typography level="body1" className="mb-2 font-medium">
              Select Delivery Service
            </Typography>
            {isLoadingServices ? (
              <Skeleton height={40} className="w-full" />
            ) : (
              <Select
                value={selectedService}
                onChange={(e, newValue) => setSelectedService(newValue)}
                className="w-full"
                required
              >
                {services?.map((service) => (
                  <Option key={service.id} value={service.id}>
                    {service.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            loading={purchaseMutation.isPendin}
            disabled={!selectedService || purchaseMutation.isPendin}
            className="w-full mt-4"
          >
            Purchase
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default BuyProductModal;
