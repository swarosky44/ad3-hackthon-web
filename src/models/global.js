// import { useState, useCallback, useEffect, useMemo } from 'react';
// import { Web3Auth } from "@web3auth/web3auth";
// import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
// import { WEB3_AUTH_CLIENT_ID } from "@/utils/const";
// import RPC from "@/utils/etherRPC";

// export default () => {
//   const [web3auth, setWeb3auth] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   // 初始化，注册 web3Auth 实例
//   const init = async () => {
//     try {
//       const web3auth = new Web3Auth({
//         clientId: WEB3_AUTH_CLIENT_ID,
//         chainConfig: {
//           chainNamespace: CHAIN_NAMESPACES.EIP155,
//           chainId: "0x1",
//           rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
//         },
//       });

//       setWeb3auth(web3auth);

//       await web3auth.initModal();
//       if (web3auth.provider) {
//         setProvider(web3auth.provider);
//       };
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   // 登录方法
//   const login = async () => {
//     if (!web3auth) {
//       console.log("web3auth not initialized yet");
//       return;
//     }
//     const web3authProvider = await web3auth.connect();
//     setProvider(web3authProvider);
//   };

//   // 获取三方登录用户信息
//   const getAppUserInfo = async () => {
//     if (!web3auth) {
//       console.log("web3auth not initialized yet");
//       return;
//     }
//     return await web3auth.getUserInfo();
//   };

//   // 获取用户钱包信息
//   const getUserAccountInfo = async () => {
//     if (!provider) {
//       console.log("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const address = await rpc.getAccounts();
//     const chainId = await rpc.getChainId();
//     return { address, chainId };
//   };

//   useEffect(async () => {
//     if (provider) {
//       const userAppInfo = await getAppUserInfo();
//       const userAccountInfo = await getUserAccountInfo();
//       console.info("provider", provider, "userAppInfo", userAppInfo, "userAccountInfo", userAccountInfo);
      
//       setUserInfo({
//         ...(userAppInfo || {}),
//         ...(userAccountInfo || {}),
//       });
//     }
//   }, [provider]);

//   useEffect(() => {
//     init();
//   }, []);

//   return {
//     userInfo,
//     login,
//   };
// };

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import { installedMetaMask } from '@/utils';
import { request } from "@/utils/request";

export default () => {
  const [hadInstallMetaMask, setHadInstallMetaMask] = useState(installedMetaMask());
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [userPowt, setUserPowt] = useState([]);

  // 查询用户 AD3 评分
  const queryUserScore = async () => {
    const result = await request({
      method: 'GET',
      api: 'api/profile/getScore',
      params: {
        // address: account[0],
        address: "0x9ad6A1477D994406F759352ddcD9B71E6e6d28C3",
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
        // address: account[0],
        address: "0x9ad6A1477D994406F759352ddcD9B71E6e6d28C3",
      },
    });
    if (result && result.result && result.result.length) {
      setUserPowt(result.result);
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

  useEffect(() => {
    if (account && account[0]) {
      queryUserScore(account[0]);
      queryUserPowt(account[0]);
    }
  }, [account]);

  return {
    signer,
    provider,
    account,
    connectWallet,
    hadInstallMetaMask,
    userScore,
    userPowt,
  };
};
