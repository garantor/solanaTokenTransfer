//createToken.js

import { Keypair } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import base58 from "bs58";

export async function CreateSolToken(
  masterPrivateKey,
  decimal,
  totalSupply,
  connectionCluster
) {
  const keyToArray = Keypair.fromSecretKey(base58.decode(masterPrivateKey));
  console.log(keyToArray.publicKey);
  const mintToken = await createMint(
    connectionCluster,
    keyToArray,
    keyToArray.publicKey,
    keyToArray.publicKey,
    decimal || 9
  );
  const createTokenWithAddress = await getOrCreateAssociatedTokenAccount(
    connectionCluster,
    keyToArray,
    mintToken,
    keyToArray.publicKey
  );

  const mintedToken = await mintTo(
    connectionCluster,
    keyToArray,
    mintToken,
    createTokenWithAddress.address,
    keyToArray,
    totalSupply || 1000000000000
  );
  return mintedToken;
}
