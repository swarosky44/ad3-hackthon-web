import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

export default () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = useCallback(async () => {
    const account = await provider
      .send('eth_requestAccounts', [])
      .catch(() => console.log('user rejected request'));
    
    setAccount(account);
    setSigner(provider.getSigner());
  }, []);

  return {
    signer,
    provider,
    account,
    connectWallet,
  };
};
