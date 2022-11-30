import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { installedMetaMask } from '@/utils';
import { request } from "@/utils/request";

export default () => {
  const [hadInstallMetaMask, setHadInstallMetaMask] = useState(installedMetaMask());
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  // 用户钱包
  const [account, setAccount] = useState(null);
  // 用户 AD3 账户
  const [ad3Account, setAd3Account] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [userPowt, setUserPowt] = useState([]);

  // 查询用户 AD3 评分
  const queryUserScore = async () => {
    const result = await request({
      method: 'GET',
      api: 'api/profile/getScore',
      params: {
        address: account[0],
      },
    });
    if (result && result.result && result.result.nativeScore) {
      setUserScore(result.result);
    }
  };

  // 查询用户链上 Powt 数据
  const queryUserPowt = async () => {
    const result = await request({
      method: 'GET',
      api: 'api/profile/getPowt',
      params: {
        address: account[0],
      },
    });
    if (result && result.result && result.result.length) {
      setUserPowt(result.result);
    }
  };

  // 用户钱包登录 AD3 账户
  const queryUserAccount = async () => {
    await request({
      method: 'GET',
      api: 'api/auth/loginWithAddress',
      params: {
        address: account[0],
      },
    });
    const result = await request({
      method: 'GET',
      api: 'api/auth/queryAccountInfo',
      params: {},
    });
    if (result && result.result && result.result.address) {
      setAd3Account(result.result);
    }
  };

  // 链接钱包
  const connectWallet = useCallback(async () => {
    if (!account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account = await provider
        .send('eth_requestAccounts', [])
        .catch(() => console.log('user rejected request'));
  
      setProvider(provider);
      setAccount(account);
      setSigner(provider.getSigner());
    }
  }, []);

  // 获取 twitter 授权
  const queryTwitterAuth = async () => await request({
    method: 'GET',
    api: 'api/auth/queryAuthUrl',
    params: {},
  });

  useEffect(() => {
    if (account && account[0]) {
      queryUserAccount();
    }
  }, [account]);

  return {
    signer,
    provider,
    account,
    ad3Account,
    connectWallet,
    queryTwitterAuth,
    hadInstallMetaMask,
    ad3Account,
  };
};
