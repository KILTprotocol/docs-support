import * as Kilt from "@kiltprotocol/sdk-js";
import { CType } from "@kiltprotocol/credentials";
import type {
  SignerInterface,
  DidDocument,
  MultibaseKeyPair,
} from "@kiltprotocol/types";
import { Types } from "@kiltprotocol/credentials";

export async function issueCredential(
  issuerDid: DidDocument,
  holderDid: DidDocument,
  signers: SignerInterface[],
  submitterAccount: MultibaseKeyPair
): Promise<Types.VerifiableCredential> {
  const passportCType = await CType.fetchFromChain(
    "kilt:ctype:0x05f099b888ddf3e8ef4fc690f12ca59d967bf934d58dda723921893cff0d8734"
  );

  const passportCredential = await Kilt.Issuer.createCredential({
    issuer: issuerDid.id,
    credentialSubject: {
      id: holderDid.id,
      Username: "Aybars",
    },
    cType: passportCType.cType,
  });

  const credential = await Kilt.Issuer.issue({
    credential: passportCredential,
    issuer: {
      didDocument: issuerDid,
      signers: [...signers, submitterAccount],
      submitter: submitterAccount,
    },
  });

  console.log("credential issued");
  return credential;
}
