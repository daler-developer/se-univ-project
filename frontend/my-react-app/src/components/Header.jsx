import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Avatar from '@mui/joy/Avatar';

const Header = ({ companyName, logoUrl, onLogout, links }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white text-gray-800 shadow-md">
      <div className="flex items-center">
        <Avatar
          src={logoUrl}
          alt="Company Logo"
          className="h-12 w-12 mr-4 shadow-md"
        />
        <Typography level="h4" className="font-bold text-2xl">
          {companyName}
        </Typography>
      </div>
      <nav className="flex items-center space-x-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-lg font-medium hover:text-teal-600 transition duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button
        variant="outlined"
        color="danger"
        className="text-red-600 border-red-600 hover:bg-red-100 font-bold px-4 py-2 rounded-lg shadow-sm transition duration-300"
        onClick={onLogout}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;

// import { Link } from 'react-router-dom';
// import Typography from '@mui/joy/Typography';
// import Button from '@mui/joy/Button';
// import PropTypes from 'prop-types';
//
// const Header = ({ deliveryName, logoUrl, links, onLogout }) => {
//   return (
//     <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-4 shadow-lg flex items-center justify-between">
//       <div className="flex items-center">
//         <img
//           src={logoUrl}
//           alt="Delivery Logo"
//           className="h-12 w-12 rounded-full mr-3 shadow-md border-2 border-white"
//         />
//         <Typography level="h4" className="font-bold">
//           {deliveryName}
//         </Typography>
//       </div>
//       <nav className="flex space-x-6">
//         {links.map((link, index) => (
//           <Link
//             key={index}
//             to={link.href}
//             className="text-white no-underline hover:text-teal-200 text-lg font-medium transition duration-300"
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//       <Button
//         variant="solid"
//         color="danger"
//         onClick={onLogout}
//         className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition duration-300"
//       >
//         Logout
//       </Button>
//     </header>
//   );
// };
//
// Header.propTypes = {
//   deliveryName: PropTypes.string.isRequired,
//   logoUrl: PropTypes.string.isRequired,
//   links: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       href: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onLogout: PropTypes.func.isRequired,
// };
//
// export default Header;
