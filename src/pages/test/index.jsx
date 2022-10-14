import { createElement, useEffect } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import styles from "./index.less";

export default () => {
  const init = async () => {
    const clientId = "BHX7lStczgqkZhVfnEskrWF1ffJlxr9uX3uXwxtoXEgs61kk__luNQgx_q0HMuogmDEA85B1mYuUQZecth606ow";
    const web3auth = new Web3Auth({
      clientId,
      chainConfig: { // this is ethereum chain config, change if other chain(Solana, Polygon)
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: "https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c",
      },
    });
    await web3auth.initModal();
    const provider = await web3auth.connect();
  }

  useEffect(() => {
    init()
  }, []);

  return null;
};
