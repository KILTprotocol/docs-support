import { ConfigService, DidHelpers } from '@kiltprotocol/sdk-js'
import { DidDocument, KiltAddress, SignerInterface } from '@kiltprotocol/types'

const serviceId = '#example-service-id'

export async function addServiceEndpoints(
  didDocument: DidDocument,
  signers: SignerInterface[],
  submitter: SignerInterface<'Ed25519', KiltAddress>
): Promise<void> {
  const api = ConfigService.get('api')

  const transactionHandler = DidHelpers.addService({
    api,
    didDocument,
    signers: signers,
    submitter: submitter,
    service: {
      id: serviceId,
      type: ['example-type'],
      serviceEndpoint: ['https://example.com/endpoint'],
    },
  })

  const result = await transactionHandler.submit()

  // Check if the result is rejected or confirmed
  if (result.asRejected) {
    throw new Error(`Service added failed: ${result.asRejected.error}`)
  }
  if (result.asConfirmed) {
    console.log('Service added successfully')
  }
}

export async function removeServiceEndpoints(
  didDocument: DidDocument,
  signers: SignerInterface[],
  submitter: SignerInterface<'Ed25519', KiltAddress>
): Promise<void> {
  const api = ConfigService.get('api')

  const transactionHandler = DidHelpers.removeService({
    api,
    didDocument,
    signers: signers,
    submitter: submitter,
    id: serviceId,
  })

  const result = await transactionHandler.submit()
  // Check if the result is rejected or confirmed
  if (result.asRejected) {
    throw new Error(`Service removal failed: ${result.asRejected.error}`)
  }
  if (result.asConfirmed) {
    console.log('Service removed successfully')
  }
}
