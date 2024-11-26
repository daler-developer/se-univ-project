import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for your API
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get company-id and delivery-service-id from localStorage
    const company = localStorage.getItem('company');
    const deliveryService = localStorage.getItem('deliveryService');

    if (deliveryService) {
      config.headers['delivery-service-id'] = JSON.parse(deliveryService).id;
    }

    // If companyId is available, add it to the headers
    if (company) {
      config.headers['company-id'] = JSON.parse(company).id;
    }

    // Return the updated config object
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const deliveryServiceRegister = async ({
  name,
  logoUrl,
  password,
  phone,
}) => {
  await sleep();
  return api.post(`/api/create-delivery`, {
    name,
    logoUrl,
    password,
    phone,
  });
};

export const deliveryServiceLogin = async ({ name, password }) => {
  await sleep();
  return api.post(`/api/login-delivery`, {
    name,
    password,
  });
};

export const getAssignedDeliveries = async () => {
  await sleep();
  return api.get(`/api/assigned-purchases`);
};

export const registerCompany = async ({
  email,
  password,
  profilePicture,
  description,
  location,
  phone,
}) => {
  await sleep();
  return api.post(`/api/create-company`, {
    email,
    password,
    profilePicture,
    description,
    location,
    phone,
  });
};

export const loginCompany = async ({ name, password }) => {
  await sleep();
  return api.post(`/api/login-company`, {
    name,
    password,
  });
};

export const postProduct = async ({ name, image, price }) => {
  await sleep();
  return api.post(`/api/products/new`, {
    name,
    image,
    price,
  });
};

export const companyGetMyProducts = async () => {
  await sleep();
  return api.get(`/api/my-products`);
};

export const companyDeleteProduct = async (productId) => {
  await sleep();
  return api.delete(`/api/products/${productId}`);
};

export const companyPutReview = async (productId, { stars, text }) => {
  await sleep();
  return api.post(`/api/products/${productId}/reviews`, { stars, text });
};

export const companyGetReviews = async (productId) => {
  await sleep();
  return api.get(`/api/products/${productId}/reviews`);
};

export const companyGetCompanies = async () => {
  await sleep();
  return api.get(`/api/companies`);
};

export const companySendMessage = async (body) => {
  await sleep();
  return api.post(`/api/send-message`, body);
};

export const companyGetMessages = async (companyId, body) => {
  await sleep();
  return api.get(`/api/get-messages/${companyId}`, body);
};

export const pinMessage = async (messageId) => {
  await sleep();
  return api.post(`/api/pin-message/${messageId}`);
};

export const unpinMessage = async (messageId) => {
  await sleep();
  return api.post(`/api/unpin-message/${messageId}`);
};

export const getProducts = async () => {
  await sleep();
  return api.get(`/api/products`);
};

export const getDeliveryServices = async () => {
  await sleep();
  return api.get(`/api/delivery-services`);
};

export const purchaseProduct = async (body) => {
  await sleep();
  return api.post(`/api/purchase-product`, body);
};

export const markDelivered = async (purchaseId) => {
  await sleep();
  return api.post(`/api/mark-delivered/${purchaseId}`);
};

export const companyPurchaseHistory = async () => {
  await sleep();
  return api.get(`/api/purchase-history`);
};
