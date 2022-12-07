import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { installedMetaMask } from '@/utils';
import { request } from '@/utils/request';

export default () => {
  const [hadInstallMetaMask, setHadInstallMetaMask] = useState(
    installedMetaMask(),
  );
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
  const loginAd3Account = async () => {
    await request({
      method: 'GET',
      api: 'api/auth/loginWithAddress',
      params: {
        address: account[0],
      },
    });
    queryAd3Account();
  };

  // 查询 AD3 账户信息
  const queryAd3Account = async () => {
    const result = await request({
      method: 'GET',
      api: 'api/auth/queryAccountInfo',
      params: {},
    });
    if (result && result.result && result.result.address) {
      setAd3Account(result.result);
    }
    return result;
  };

  // 获取当前链上 GAS
  const getCurrentGasPrice = async () => {
    let maxFeePerGas = ethers.BigNumber.from(40000000000); // fallback to 40 gwei
    let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000); // fallback to 40 gwei
    try {
      const { data } = await axios({
        method: 'get',
        url: isProd
          ? 'https://gasstation-mainnet.matic.network/v2'
          : 'https://gasstation-mumbai.matic.today/v2',
      });
      maxFeePerGas = ethers.utils.parseUnits(
        Math.ceil(data.fast.maxFee) + '',
        'gwei',
      );
      maxPriorityFeePerGas = ethers.utils.parseUnits(
        Math.ceil(data.fast.maxPriorityFee) + '',
        'gwei',
      );
    } catch {
      // ignore
    }

    return {
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
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

  // 登出
  const resetWallet = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setAd3Account(null);
  };

  // 获取 twitter 授权
  const queryTwitterAuth = async () =>
    await request({
      method: 'GET',
      api: 'api/auth/queryAuthUrl',
      params: {},
    });

  useEffect(() => {
    if (account && account[0]) {
      loginAd3Account();
    }
  }, [account]);

  useEffect(() => {}, []);

  return {
    signer,
    provider,
    account,
    ad3Account,
    connectWallet,
    resetWallet,
    queryTwitterAuth,
    queryAd3Account,
    getCurrentGasPrice,
    hadInstallMetaMask,
    ad3Account,
  };
};
