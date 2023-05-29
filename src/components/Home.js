import React from 'react';
import logo from '../assets/logo.png'; 
import brand from '../assets/brand.png';
import '../index.css';
const Home = () => {
  return (
    <div style={styles.container}>
    <img src={brand} alt="Logo" style={{...styles.logo, ...styles.spinAnimation}} /> 
    <h1 style={styles.heading}>Welcome to the Lazy Minting Dapp!</h1>
    <p style={styles.description}>Create unique and vibrant NFTs without any coding knowledge. Unleash the power of your creativity and let it shine in the digital world!</p>
    <p style={styles.description}>Our Dapp is more than a tool; it's a creative partner designed meticulously with you in mind. We've integrated state-of-the-art features to make the process of minting NFTs as seamless as possible. Whether you're an artist, a collector, or a digital explorer, we've got you covered.</p>
    <p style={styles.description}>Born out of a deep-seated love and respect for the Songbird/Flare Networks community, this platform serves as a bridge between your artistic vision and the world. We are here to empower you and provide the necessary tools to help you thrive in the flourishing NFT space.</p>
    <p style={styles.description}>Join us today, and become a part of the revolution. Unleash your potential, and let the world witness your imagination.</p>
    {/* Add more information or features of the dapp */}
</div>
  );
};

const spinAnimation = {
  animation: 'spin 5s linear infinite',
  transformStyle: 'preserve-3d'
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    //   backgroundImage: `url(${logo})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#282c34',
    },
  
  logo: {
    width: '400px',
    marginBottom: '16px',
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
  spinAnimation, // added this line to include the spinAnimation in the styles object
};

export default Home;
