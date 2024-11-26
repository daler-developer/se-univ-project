import { useQuery } from '@tanstack/react-query';
import CompanyLayout from '../components/CompanyLayout.jsx';
import { getProducts } from '../api.js';
import Product from '../components/Product.jsx';
import { Skeleton } from '@mui/joy';
import 'tailwindcss/tailwind.css';

const CompanyStore = () => {
  // Fetch products using useQuery (TanStack Query v5)
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await getProducts();
      return res.data;
    },
  });

  return (
    <CompanyLayout>
      <div className="p-4">
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
                  withDelete={false}
                  withBuy={true}
                />
              ))}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyStore;
