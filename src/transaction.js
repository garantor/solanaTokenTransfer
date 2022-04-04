//transaction.js

import { Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { transfer, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import base58 from "bs58";

export async function TransferToken(
  senderMasterKey,
  tokenAddress,
  recipientAdd,
  amt,
  connectionCluster
) {
  const TokenAddress = new PublicKey(tokenAddress);
  const recipientAddress = new PublicKey(recipientAdd);
  const senderKeypair = Keypair.fromSecretKey(base58.decode(senderMasterKey));
  const addRecipientToAcct = await getOrCreateAssociatedTokenAccount(
    connectionCluster,
    senderKeypair,
    TokenAddress,
    recipientAddress
  );
  const addSenderToAcct = await getOrCreateAssociatedTokenAccount(
    connectionCluster,
    senderKeypair,
    TokenAddress,
    senderKeypair.publicKey
  );
  const tranferToken = await transfer(
    connectionCluster,
    senderKeypair,
    addSenderToAcct.address,
    addRecipientToAcct.address,
    senderKeypair.publicKey,
    amt * 100000
  );
  return tranferToken;
}
