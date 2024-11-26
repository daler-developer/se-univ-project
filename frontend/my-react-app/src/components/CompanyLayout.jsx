import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

const CompanyLayout = ({ children }) => {
  const navigate = useNavigate();

  const me = JSON.parse(localStorage.getItem('company'));

  const handleLogout = () => {
    localStorage.removeItem('deliveryService');
    navigate('/');
  };

  return (
    <div>
      <Header
        links={[
          {
            label: 'Home',
            to: '/company/store',
          },
        ]}
        logoUrl={me.logoUrl}
        deliveryName={me.email}
        onLogout={handleLogout}
      />
      {children}
    </div>
  );
};

export default CompanyLayout;
