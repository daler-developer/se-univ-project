import { useQuery } from '@tanstack/react-query';
import { companyGetMyProducts } from '../api.js';
import CompanyLayout from '../components/CompanyLayout.jsx';
import { Skeleton, Typography } from '@mui/joy';
import Product from '../components/Product.jsx';

const CompanyMyProducts = () => {
  // Fetch products using useQuery
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['companyProducts'],
    queryFn: async () => {
      const res = await companyGetMyProducts();

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
          My Products
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
            : data?.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  onDeleteSuccess={() => refetch()}
                />
              ))}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyMyProducts;
