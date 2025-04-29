import * as Kilt from '@kiltprotocol/sdk-js'
import { verifyDid } from './addVerification2Did.ts'
import { generateAccounts } from './generateAccount.ts'
import { generateDid } from './generateDid.ts'
import { Balances, KiltAddress, SignerInterface } from '@kiltprotocol/types'
import { issueCredential } from './issueCredential.ts'
import { claimW3N } from './claimW3N.ts'
import { releaseW3N } from './releaseW3N.ts'
import { createCredentialPresentation, derivedProof } from './holder.ts'

async function runAll(): Promise<void> {
  let api = await Kilt.connect('wss://peregrine.kilt.io/')

  console.log('connected')

  const faucetMnemonic =
    'receive clutch item involve chaos clutch furnace arrest claw isolate okay together'

  const faucet = Kilt.generateKeypair({ seed: faucetMnemonic })

  const [submitter] = (await Kilt.getSignersForKeypair({
    keypair: faucet,
    type: 'Ed25519',
  })) as Array<SignerInterface<'Ed25519', KiltAddress>>

  const balance = await api.query.system.account(submitter.id)
  console.log('balance', balance.toHuman())
  let { holderAccount, issuerAccount } = generateAccounts()
  console.log('Successfully transferred tokens')

  let holderDid = await generateDid(submitter, holderAccount)
  const name = `testname${Math.floor(Math.random() * 10000)}`
  console.log('name', name)
  await claimW3N(name, holderDid.didDocument, holderDid.signers, submitter)

  await releaseW3N(holderDid.didDocument, holderDid.signers, submitter)

  let issuerDid = await generateDid(submitter, issuerAccount)

  issuerDid = await verifyDid(
    issuerDid.didDocument,
    issuerDid.signers,
    submitter
  )

  const credential = await issueCredential(
    issuerDid.didDocument,
    holderDid.didDocument,
    issuerDid.signers,
    submitter
  )

  console.log('Credential', credential)

  await derivedProof(credential)

  await createCredentialPresentation(
    [credential],
    holderDid.didDocument,
    holderDid.signers
  )

  await api.disconnect()
  console.log('disconnected')
}

runAll()
  .then(() => {
    console.log('All done')
  })
  .catch((error) => {
    console.error('Error:', error)
  })
  .finally(() => {
    console.log('Finally')
    process.exit()
  })
