import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

const CompanyLayout = ({ children }) => {
  const navigate = useNavigate();

  const me = JSON.parse(localStorage.getItem('company'));

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
            link: '/company/home',
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
