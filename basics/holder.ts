import { Holder } from '@kiltprotocol/sdk-js'
import { DidDocument, SignerInterface } from '@kiltprotocol/types'
import { randomAsHex } from '@polkadot/util-crypto'

import { Types } from '@kiltprotocol/credentials'

export async function createCredentialPresentation(
  credential: Types.VerifiableCredential[],
  holderDid: DidDocument,
  signers: SignerInterface[]
): Promise<void> {
  const challenge = randomAsHex()

  const presentation = await Holder.createPresentation({
    credentials: credential,
    holder: { didDocument: holderDid, signers },
    presentationOptions: {
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24),
      verifier: 'did:kilt:4s7XuQtwCfqtL2My9NKYXb6E8BvHqbdWooXocgwvhsYJjMgR',
    },
    proofOptions: { challenge },
    now: new Date(),
  })

  console.log('presentation', presentation)
}

export async function derivedProof(
  credential: Types.VerifiableCredential
): Promise<void> {
  const derivedProof = await Holder.deriveProof({
    credential,
    proofOptions: {
      includeClaims: ['/credentialSubject/Username'],
    },
  })
  console.log('derived proof', derivedProof)
}
