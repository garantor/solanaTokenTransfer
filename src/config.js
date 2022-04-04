

import { Connection, clusterApiUrl } from "@solana/web3.js";


export const connection = new Connection(clusterApiUrl("testnet"), "confirmed");



// module.exports = {CreateSolToken}



// // assign an account to a token if it doesnt existing before


// // console.log(createTokenWithAddress);
// // console.log(createTokenWithAddress.address.toBase58());

// // the actual mint process

// console.log(mainMintToken)

// //get mint info
// // const TokenMint = await getMint(
// //     connection,
// //     mintToken
// // );
// // // console.log(TokenMint.toBase58());
// // console.log(TokenMint.address.toBase58());