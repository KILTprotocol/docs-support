import * as Kilt from "@kiltprotocol/sdk-js";
import { Keyring } from "@kiltprotocol/utils";
import { verifyDid } from "./addVerification2Did";
import { generateAccounts } from "./generateAccount";
import { generateDid } from "./generateDid";
import { issueCredential } from "./issueCredential";

async function runAll(): Promise<void> {
  let api = await Kilt.connect("wss://peregrine.kilt.io/");

  console.log("connected");

  const faucetAccount = Kilt.generateKeypair({
    type: "ed25519",
    seed: "0xe566520fec3ca23d80dfe9e9529ada463b93fc33f17219c1089de906f7253f1c",
  });

  // Yeni bir Keyring örneği oluştur
  const keyring = new Keyring({ type: "ed25519" });

  // Seed'den KeyringPair oluştur
  const keyringPair = keyring.addFromSeed(
    Buffer.from(
      "e566520fec3ca23d80dfe9e9529ada463b93fc33f17219c1089de906f7253f1c",
      "hex"
    )
  );

  let { issuerAccount, submitterAccount, holderAccount, verifierAccount } =
    generateAccounts();
  console.log("Successfully transferred tokens");
  submitterAccount = faucetAccount;
  let issuerDid = await generateDid(faucetAccount, issuerAccount);
  let holderDid = await generateDid(faucetAccount, holderAccount);
  //let verifierDid = await generateVerifierDid(faucetAccount, verifierAccount)

  issuerDid = await verifyDid(
    submitterAccount,
    issuerDid.didDocument,
    issuerDid.signers
  );

  const credential = await issueCredential(
    issuerDid.didDocument,
    holderDid.didDocument,
    issuerDid.signers,
    submitterAccount
  );

  await api.disconnect();
  console.log("disconnected");
}
