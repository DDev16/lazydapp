import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Lazy Minting Dapp!</h1>
      <p style={styles.description}>Create unique and vibrant NFTs without any coding knowledge. Let your creativity shine!</p>
      {/* Add more information or features of the dapp */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#ff7f50',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  description: {
    fontSize: '24px',
    marginBottom: '32px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
};

export default Home;
