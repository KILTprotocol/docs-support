import { DidResolver } from '@kiltprotocol/sdk-js'
import { Did, DidDocument } from '@kiltprotocol/types'

export async function didResolve(did: Did): Promise<DidDocument | null> {
  const { didResolutionMetadata, didDocument, didDocumentMetadata } =
    await DidResolver.resolve(did)
  if (didDocumentMetadata.deactivated) {
    console.log(`DID ${did} Document is deactivated`)
    return null
  }
  if (didResolutionMetadata.error) {
    console.log('Error resolving DID:', didResolutionMetadata.error)
    return null
  }
  if (!didDocument) {
    console.log('No DID Document found')
    return null
  }
  if (didDocumentMetadata) {
    console.log('DID Document Metadata:', didDocumentMetadata)
  }

  console.log('DID Document:', didDocument)
  return didDocument
}
