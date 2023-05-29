import React, { useContext, useState, useEffect } from 'react';
import { Web3Context } from '../utils/Web3Provider';
import './MyToken.css';

const MyTokens = () => {
  const { web3, contract } = useContext(Web3Context);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
        if (web3 && contract) {
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
      
          const tokenIds = await contract.methods
            .tokensOfOwner(account)
            .call({ from: account });
      
          const tokensData = await Promise.all(
            tokenIds.map(async (tokenId) => {
              const tokenInfo = await contract.methods
                .getTokenInfo(tokenId)
                .call({ from: account });
      
                const metadataUri = tokenInfo.uri.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');

                // Fetch metadata JSON from the provided URI
                const response = await fetch(metadataUri);
                const metadata = await response.json();
                
                console.log("metadata:", metadata);
                
                // Check if metadata.image exists
                if (!metadata.image) {
                  console.error(`Metadata image does not exist for token ID ${tokenId}`);
                  return null;
                }
                
                // Build the image URL using the image CID and filename
                const imageUrl = `https://cloudflare-ipfs.com/ipfs/${metadata.image.replace('ipfs://', '')}`;
                
                // Fetch name and description from the metadata
                const { name, description } = metadata;
                
                return { id: tokenId, imageUrl, name, description, ...tokenInfo };
                
            })
          );
      
          // Filter out null tokens
          setTokens(tokensData.filter(token => token !== null));
        }
      };
      
      
      

    fetchTokens();
  }, [web3, contract]);

  return (
    <div>
      <h2>My Tokens</h2>
      <div className="token-list">
        {tokens.map((token) => (
          <div key={token.id} className="token-card">
            <img src={token.imageUrl} alt={token.name} className="token-image" />
            <div className="token-info">
              <p className="token-name">Name: {token.name}</p>
              <p className="token-description">Description: {token.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTokens;
