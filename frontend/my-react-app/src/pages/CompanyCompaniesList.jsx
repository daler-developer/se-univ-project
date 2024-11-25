import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { companyGetCompanies } from '../api.js';
import CompanyLayout from '../components/CompanyLayout.jsx';
import { Card, Typography, Skeleton, Avatar, Button } from '@mui/joy';
import { Link } from 'react-router-dom';

const CompanyCompaniesList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const res = await companyGetCompanies();

      return res.data;
    },
  });

  return (
    <CompanyLayout>
      <div className="p-4">
        <Typography
          level="h4"
          className="mb-6 text-center font-bold text-teal-500"
        >
          Companies List
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
            : data?.map((company) => (
                <Card
                  key={company.id}
                  className="p-4 flex flex-col items-center"
                >
                  <Avatar
                    src={company.profilePicture}
                    alt={company.name}
                    className="w-24 h-24 mb-4"
                  />
                  <Typography level="h6" className="font-semibold">
                    {company.name}
                  </Typography>
                  <Typography
                    level="body2"
                    className="text-gray-600 mt-2 text-center"
                  >
                    {company.description}
                  </Typography>
                  <Typography level="body2" className="text-gray-500 mt-2">
                    Location: {company.location}
                  </Typography>
                  <Typography level="body2" className="text-gray-500 mt-1">
                    Phone: {company.phone}
                  </Typography>
                  <Link
                    to={`/company/companies/${company.id}/chat?companyName=${company.name}`}
                  >
                    <Button variant="outlined" color="primary" className="mt-4">
                      Open Chat
                    </Button>
                  </Link>
                </Card>
              ))}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyCompaniesList;
