import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey("5PgcbY2SgT5p2sAsQsk2X5NBSTVKJm1tCszN3FBamN2j"),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((e) => {
    const accountInfo = AccountLayout.decode(e.account.data);
    console.log(`${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
  });
})();

/*
Token                                         Balance
------------------------------------------------------------
7e2X5oeAAJyUTi4PfSGXFLGhyPw2H8oELm1mx87ZCgwF  84
AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM  100
AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM  0
AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM  1
*/
