import React, { useState, useEffect, createContext } from 'react';
import Web3 from 'web3';
import MyNFT from '../abi/MyNFT.js'; 

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(
          MyNFT.abi,
          '0x3B125Eb994A2634f9f85531b2710f49b3548749f'
        );
        setContract(contractInstance);
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3);
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(
          MyNFT.abi,
          '0x3B125Eb994A2634f9f85531b2710f49b3548749f'
        );
        setContract(contractInstance);
      } else {
        window.alert('You need to install MetaMask!');
      }
    };

    initializeWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, contract }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
