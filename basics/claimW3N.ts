import * as Kilt from '@kiltprotocol/sdk-js'

import type {
  SignerInterface,
  DidDocument,
  MultibaseKeyPair,
} from '@kiltprotocol/types'

export async function claimW3N(
  name: string,
  holderDid: DidDocument,
  signers: SignerInterface[],
  submitterAccount: MultibaseKeyPair
): Promise<string[] | undefined> {
  const api = Kilt.ConfigService.get('api')

  const claimName = api.tx.web3Names.claim(name)

  const transaction = await Kilt.DidHelpers.transact({
    api,
    call: claimName,
    didDocument: holderDid,
    signers: [...signers, submitterAccount],
    submitter: submitterAccount,
  }).submit()

  if (!transaction.asConfirmed) {
    return undefined
  }

  console.log(
    'Web3 Name Claim',
    transaction.asConfirmed.didDocument.alsoKnownAs
  )
  return transaction.asConfirmed.didDocument.alsoKnownAs
}
