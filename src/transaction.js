//transaction.js

//Imports
import { Keypair, PublicKey } from "@solana/web3.js";
import { transfer, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import base58 from "bs58";

//function declaration and export
export async function TransferToken(
  senderMasterKey,
  tokenAddress,
  recipientAdd,
  amt,
  connectionCluster
) {
  
  // Creating a New key Object
  const TokenAddress = new PublicKey(tokenAddress);
  const recipientAddress = new PublicKey(recipientAdd);

  //creating Keypair from an existing private key
  const senderKeypair = Keypair.fromSecretKey(base58.decode(senderMasterKey));

  //Add Recipient Acct to associated Account
  const addRecipientToAcct = await getOrCreateAssociatedTokenAccount(
    connectionCluster,
    senderKeypair,
    TokenAddress,
    recipientAddress
  );
  //Add sender Acct to associated Account
  const addSenderToAcct = await getOrCreateAssociatedTokenAccount(
    connectionCluster,
    senderKeypair,
    TokenAddress,
    senderKeypair.publicKey
  );
  //Token Transfer
  const transferToken = await transfer(
    connectionCluster,
    senderKeypair,
    addSenderToAcct.address,
    addRecipientToAcct.address,
    senderKeypair.publicKey,
    amt * 100000
  );
  return transferToken;
};
