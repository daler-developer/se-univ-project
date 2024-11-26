import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CompanyLayout from '../components/CompanyLayout.jsx';
import { companyPurchaseHistory } from '../api.js';
import { Card, Typography, Skeleton } from '@mui/joy';

const CompanyPurchaseHistory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['companyPurchaseHistory'],
    queryFn: async () => {
      const res = await companyPurchaseHistory();
      return res.data;
    },
  });

  return (
    <CompanyLayout>
      <div className="p-4">
        <Typography
          level="h4"
          className="mb-6 text-center text-teal-500 font-bold"
        >
          Purchase History
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
            : data?.map((purchase) => (
                <Card key={purchase.id} className="p-4 shadow-md">
                  <img
                    src={purchase.product.image}
                    alt={purchase.product.name}
                    className="w-full h-40 object-cover mb-4 rounded-md"
                  />
                  <Typography level="h6" className="font-semibold">
                    {purchase.product.name}
                  </Typography>
                  <Typography level="body2" className="text-gray-600">
                    Price: ${purchase.product.price}
                  </Typography>
                  <Typography level="body2" className="text-gray-500 mt-2">
                    Status: {purchase.status}
                  </Typography>
                  <Typography level="body2" className="text-gray-400 mt-1">
                    Purchased On:{' '}
                    {new Date(purchase.createdAt).toLocaleString()}
                  </Typography>
                </Card>
              ))}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyPurchaseHistory;
