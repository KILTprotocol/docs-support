import * as Kilt from '@kiltprotocol/sdk-js'
import type { MultibaseKeyPair } from '@kiltprotocol/types'

interface GeneratedAccounts {
  issuerAccount: MultibaseKeyPair
  submitterAccount: MultibaseKeyPair
  holderAccount: MultibaseKeyPair
  verifierAccount: MultibaseKeyPair
}

export function generateAccounts(): GeneratedAccounts {
  const issuerAccount = Kilt.generateKeypair({ type: 'ed25519' })
  const submitterAccount = Kilt.generateKeypair({ type: 'ed25519' })
  const holderAccount = Kilt.generateKeypair({ type: 'ed25519' })
  const verifierAccount = Kilt.generateKeypair({ type: 'ed25519' })

  console.log('keypair generation complete')
  console.log(`ISSUER_ACCOUNT_ADDRESS=${issuerAccount.publicKeyMultibase}`)
  console.log(
    `SUBMITTER_ACCOUNT_ADDRESS=${submitterAccount.publicKeyMultibase}`
  )
  console.log(`HOLDER_ACCOUNT_ADDRESS=${holderAccount.publicKeyMultibase}`)

  return { issuerAccount, submitterAccount, holderAccount, verifierAccount }
}
