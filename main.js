import dotenv from "dotenv";
dotenv.config();

import { CreateSolToken } from "./src/createToken.js";
import { TransferToken } from "./src/transaction.js";
const masterPrivateKey = process.env.SECRET_KEY;
const tokenAddress = "2uC3NAufCnYzfHvVwhVBrDit1bSUymVMfanLcNH1yAF9";
import { connection } from "./src/config.js";




const transferToken = await TransferToken(
  masterPrivateKey,
  tokenAddress,
  "7j9U7DpDktjBnBJjtRYY7KTTzSrdjwVEpCgfCtugaXim",
  1,
  connection
);
console.log(transferToken);
