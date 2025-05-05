import { Types } from '@kiltprotocol/credentials'
import { Verifier } from '@kiltprotocol/sdk-js'

export async function checkStatus(
  credential: Types.VerifiableCredential
): Promise<boolean> {
  // Check the status of the credential
  const { status, verified, error } = await Verifier.checkStatus({
    credential,
  })
  if (error) {
    throw new Error(`Error checking status: ${error}`)
  }

  if (verified) {
    console.log('Credential is verified')
  }

  console.log('Status:', status)

  return verified
}

export async function verifyCredential(
  credential: Types.VerifiableCredential
): Promise<void> {
  // Verify the credential
  const { statusResult, proofResults, verified, error } =
    await Verifier.verifyCredential({
      credential,
    })

  if (error) {
    throw new Error(`Error verifying credential: ${error}`)
  }
  if (verified) {
    console.log('Credential is verified')
  } else {
    console.log('Credential is not verified')
  }

  if (!statusResult) {
    console.log('No status result returned')
    return
  }
  if (proofResults) {
    console.log('Proof results:', proofResults)
  }
  if (statusResult.error) {
    console.log('Error verifying credential:', statusResult.error)
    return
  }
}

export async function verifyPresentation(
  presentation: Types.VerifiablePresentation
): Promise<void> {
  // Verify the presentation
  const { proofResults, credentialResults, verified, error } =
    await Verifier.verifyPresentation({
      presentation,
    })

  if (error) {
    throw new Error(`Error verifying presentation: ${error}`)
  }
  if (verified) {
    console.log('Presentation is verified')
  } else {
    console.log('Presentation is not verified')
  }
  if (!credentialResults) {
    console.log('No credential results returned')
    return
  }
  if (proofResults) {
    console.log('Proof results:', proofResults)
  }
}
