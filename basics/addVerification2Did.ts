import * as Kilt from '@kiltprotocol/sdk-js'
import type {
  SignerInterface,
  DidDocument,
  KiltAddress,
} from '@kiltprotocol/types'

export async function verifyDid(
  didDocument: DidDocument,
  signers: SignerInterface[],
  submitter: SignerInterface<'Ed25519', KiltAddress>
): Promise<{ didDocument: DidDocument; signers: SignerInterface[] }> {
  const api = Kilt.ConfigService.get('api')

  const assertionKeyPair = Kilt.generateKeypair({
    type: 'sr25519',
  })

  const vmTransactionResult = await Kilt.DidHelpers.setVerificationMethod({
    api,
    didDocument,
    signers: [...signers, assertionKeyPair],
    submitter: submitter,
    publicKey: assertionKeyPair.publicKeyMultibase,
    relationship: 'assertionMethod',
  }).submit()

  if (vmTransactionResult.status !== 'confirmed') {
    throw new Error('add verification method failed')
  }

  ;({ didDocument, signers } = vmTransactionResult.asConfirmed)

  console.log('assertion method added')
  return { didDocument, signers }
}
