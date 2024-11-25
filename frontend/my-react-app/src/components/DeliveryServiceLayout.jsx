import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';

const DeliveryServiceLayout = ({ children }) => {
  const navigate = useNavigate();

  const me = JSON.parse(localStorage.getItem('deliveryService'));

  const handleLogout = () => {
    localStorage.removeItem('deliveryService');
    navigate('/entry');
  };

  return (
    <div>
      <Header
        links={[
          {
            label: 'Home',
            link: '/home',
          },
        ]}
        logoUrl={me.logoUrl}
        deliveryName={me.name}
        onLogout={handleLogout}
      />
      Hello world
    </div>
  );
};

export default DeliveryServiceLayout;
