import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';

const DeliveryServiceLayout = ({ children }) => {
  const navigate = useNavigate();

  const me = JSON.parse(localStorage.getItem('deliveryService'));

  const handleLogout = () => {
    localStorage.removeItem('deliveryService');
    navigate('/');
  };

  return (
    <div>
      <Header
        links={[]}
        logoUrl={me.logoUrl}
        deliveryName={me.name}
        onLogout={handleLogout}
      />
      {children}
    </div>
  );
};

export default DeliveryServiceLayout;
