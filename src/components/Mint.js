import React, { useContext, useState } from 'react';
import { Web3Context } from '../utils/Web3Provider';
import { NFTStorage, File } from 'nft.storage';
import './Mint.css'; // Import the CSS file for styling

// Initialize the NFTStorage client
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdGOTA4QjNBRDJGMDFGNjE2MjU1MTA0ODIwNjFmNTY5Mzc2QTg3MjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTI5MDE5ODQyMCwibmFtZSI6Ik5FV0VTVCJ9.FGtIrIhKhgSx-10iVlI4sM_78o7jSghZsG5BpqZ4xfA' });

const Mint = () => {
  const { web3, contract } = useContext(Web3Context);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));

      const metadata = await client.store({
        name: name,
        description: description,
        image: new File([file], file.name, { type: file.type }),
      });

      setUri(metadata.url);
    } catch (error) {
      console.error(error);
      setFormError('An error occurred while uploading the image. Please try again.');
    }
  };

  const mintToken = async () => {
    try {
      setIsMinting(true);
      const accounts = await web3.eth.getAccounts();
      await contract.methods.mint(name, description, uri).send({ from: accounts[0] });
      setIsMinting(false);
      setFormError('');
      alert('Token minted successfully!'); // Consider replacing this with a nicer success notification
    } catch (error) {
      console.error(error);
      setIsMinting(false);
      setFormError('An error occurred while minting the token. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    if (name.trim() === '' || description.trim() === '' || uri.trim() === '') {
      setFormError('Please fill in all the fields');
      return;
    }
    mintToken();
  };

  return (
    <div className="mint-container">
      <h1 className="mint-title" aria-label="Mint a new token">Mint Token</h1>
      <form className="mint-form" onSubmit={handleSubmit} aria-label="Mint token form">
        <label htmlFor="name" className="mint-label">Name:</label>
        <input
          type="text"
          id="name"
          className="mint-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Enter token name"
        />
        <label htmlFor="description" className="mint-label">Description:</label>
        <input
          type="text"
          id="description"
          className="mint-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Enter token description"
        />
        <label htmlFor="image" className="mint-label">Image:</label>
        <input
          type="file"
          id="image"
          className="mint-input"
          onChange={handleImageUpload}
          aria-label="Upload image"
        />
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Image Preview" className="image-preview" />
          </div>
        )}
        {formError && <div className="form-error">{formError}</div>}
        <button type="submit" className="mint-button" disabled={isMinting} aria-label="Mint token">
          {isMinting ? 'Minting...' : 'Mint'}
        </button>
      </form>
    </div>
  );
};

export default Mint;
