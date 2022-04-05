//createToken.js

//Imports
import { Keypair } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import base58 from "bs58";

// export and Function Declaration
export async function CreateSolToken(
  masterPrivateKey,
  decimal,
  totalSupply,
  connectionCluster
) {

  //Create a New Keypair from an Existing Secret Key
  const keyToArray = Keypair.fromSecretKey(base58.decode(masterPrivateKey));

  // Intializing a New mint Process
  const mintToken = await createMint(
    connectionCluster,
    keyToArray,
    keyToArray.publicKey,
    keyToArray.publicKey,
    decimal || 9
  );

  // Add address to associated account for Token
  const createTokenWithAddress = await getOrCreateAssociatedTokenAccount(
    connectionCluster,
    keyToArray,
    mintToken,
    keyToArray.publicKey
  );

    // Minting Token with a specified supply or 1000
  const mintedToken = await mintTo(
    connectionCluster,
    keyToArray,
    mintToken,
    createTokenWithAddress.address,
    keyToArray,
    totalSupply || 1000000000000
  );

  return mintedToken;
};
