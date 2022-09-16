export const installedMetaMask = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};
