import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { installedMetaMask } from '@/utils';

export default () => {
  const [hadInstallMetaMask, setHadInstallMetaMask] = useState(installedMetaMask());
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = await provider
      .send('eth_requestAccounts', [])
      .catch(() => console.log('user rejected request'));

    setProvider(provider);
    setAccount(account);
    setSigner(provider.getSigner());
  }, []);

  return {
    signer,
    provider,
    account,
    connectWallet,
    hadInstallMetaMask,
  };
};
