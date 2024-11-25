import { createBrowserRouter } from 'react-router-dom';
import DeliveryServiceRegister from './pages/DeliveryServiceRegister.jsx';
import DeliveryServiceLogin from './pages/DeliveryServiceLogin.jsx';
import DeliveryServiceHome from './pages/DeliveryServiceHome.jsx';
import HomePage from './pages/HomePage.jsx';
import CompanyRegister from './pages/CompanyRegister.jsx';
import CompanyLogin from './pages/CompanyLogin.jsx';
import CompanyHome from './pages/CompanyHome.jsx';
import CompanyPostProduct from './pages/CompanyPostProduct.jsx';
import CompanyMyProducts from './pages/CompanyMyProducts.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/company/register',
    element: <CompanyRegister />,
  },
  {
    path: '/company/login',
    element: <CompanyLogin />,
  },
  {
    path: '/company/home',
    element: <CompanyHome />,
  },
  {
    path: '/company/products/new',
    element: <CompanyPostProduct />,
  },
  {
    path: '/company/my-products',
    element: <CompanyMyProducts />,
  },
  {
    path: '/delivery-service/register',
    element: <DeliveryServiceRegister />,
  },
  {
    path: '/delivery-service-login',
    element: <DeliveryServiceLogin />,
  },
  {
    path: '/delivery-service/home',
    element: <DeliveryServiceHome />,
  },
]);

export default router;
