import { useState, useCallback, useEffect, useMemo } from 'react';
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { WEB3_AUTH_CLIENT_ID } from "@/utils/const";
import RPC from "@/utils/etherRPC";

export default () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // 初始化，注册 web3Auth 实例
  const init = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId: WEB3_AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });

      setWeb3auth(web3auth);

      await web3auth.initModal();
      if (web3auth.provider) {
        setProvider(web3auth.provider);
      };
    } catch (error) {
      console.warn(error);
    }
  };

  // 登录方法
  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  // 获取三方登录用户信息
  const getAppUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    return await web3auth.getUserInfo();
  };

  // 获取用户钱包信息
  const getUserAccountInfo = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    const chainId = await rpc.getChainId();
    return { address, chainId };
  };

  useEffect(async () => {
    if (provider) {
      const userAppInfo = await getAppUserInfo();
      const userAccountInfo = await getUserAccountInfo();
      console.info("provider", provider, "userAppInfo", userAppInfo, "userAccountInfo", userAccountInfo);
      
      setUserInfo({
        ...(userAppInfo || {}),
        ...(userAccountInfo || {}),
      });
    }
  }, [provider]);

  useEffect(() => {
    init();
  }, []);

  return {
    userInfo,
    login,
  };
};
