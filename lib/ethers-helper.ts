import { ethers } from "ethers";

export const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet;
}

export const getWallet = (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey);
  return wallet;
}

export const signMessage = async (wallet: ethers.Wallet, message: string) => {
  const signature = await wallet.signMessage(message);
  return signature;
}

export const verifySignature = async (signature: string, address: string, opHash: string) => {
  // fetch api to verify signature
  const response = await fetch(`https://dev.internalversion.api.soulwallets.me/recovery-record/guardian/${opHash}`, {
    method: 'POST',
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
      'Content-Type': 'application/json',
    },
    body: `{"address":"${address}","signature":"${signature}"}`,
  });

  // console.log(response);

  if (!response.ok) {
    return "Validation failed";
  }

  if (response.status === 200) {
    const res_data = await response.json();
    const { code, msg, data } = res_data;
    // return "Update success. Signature valid: true";
    return msg;
  }
}