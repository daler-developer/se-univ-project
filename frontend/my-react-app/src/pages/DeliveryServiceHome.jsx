import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { deliveryServiceLogin } from '../api.js';
import { useAuthStore } from '../store.js';
import Error from '../components/Error.jsx';
import Sidebar from '../components/Header.jsx';
import DeliveryServiceLayout from '../components/DeliveryServiceLayout.jsx';
import { getAssignedDeliveries } from '../api.js';

const DeliveryServiceHome = () => {
  return <DeliveryServiceLayout></DeliveryServiceLayout>;
};

export default DeliveryServiceHome;
