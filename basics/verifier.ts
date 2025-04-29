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
    console.log('Error checking status:', error)
    return false
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
  const { statusResult, proofResults } = await Verifier.verifyCredential({
    credential,
  })

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
  const { proofResults, credentialResults } = await Verifier.verifyPresentation(
    {
      presentation,
    }
  )
  if (!credentialResults) {
    console.log('No credential results returned')
    return
  }
  if (credentialResults[0].verified) {
    console.log('Presentation is verified')
    console.log(credentialResults[0].credential)
  }
  if (proofResults) {
    console.log('Proof results:', proofResults)
  }
}
