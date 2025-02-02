import React from 'react';

const Loader = ({ loadingPathname }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f8f8',
      fontSize: '18px',
      fontWeight: 'bold',
    }}>
      Loading {loadingPathname}...
    </div>
  );
};

export default Loader;
