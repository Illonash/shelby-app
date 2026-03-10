import { ShelbyClient, ShelbyBlobClient, createDefaultErasureCodingProvider, generateCommitments, expectedTotalChunksets } from '@shelby-protocol/sdk/browser';
import type { BlobCommitments } from '@shelby-protocol/sdk/browser';
import { Network, Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { Buffer } from 'buffer';

const SHELBY_API_KEY = import.meta.env.VITE_SHELBY_API_KEY || ''; 
const APTOS_API_KEY = import.meta.env.VITE_APTOS_API_KEY || '';

if (!SHELBY_API_KEY) {
  console.warn("VITE_SHELBY_API_KEY is missing. File uploads will fail.");
}

export const getShelbyClient = () => {
  return new ShelbyClient({
    network: Network.TESTNET,
    apiKey: SHELBY_API_KEY,
  });
};

export const getAptosClient = () => {
    return new Aptos(
        new AptosConfig({
            network: Network.TESTNET,
            clientConfig: {
                API_KEY: APTOS_API_KEY
            }
        })
    );
}

export const encodeShelbyFile = async (file: File): Promise<BlobCommitments> => {
  const data = Buffer.from(await file.arrayBuffer());
  const provider = await createDefaultErasureCodingProvider();
  return await generateCommitments(provider, data);
};

export const createRegistrationPayload = (
  accountAddress: any,
  fileName: string,
  commitments: BlobCommitments
) => {
  return ShelbyBlobClient.createRegisterBlobPayload({
    account: accountAddress as any,
    blobName: fileName,
    blobMerkleRoot: commitments.blob_merkle_root,
    numChunksets: expectedTotalChunksets(commitments.raw_data_size),
    expirationMicros: (1000 * 60 * 60 * 24 * 30 + Date.now()) * 1000, // 30 days
    blobSize: commitments.raw_data_size,
    encoding: 0, // Adding missing encoding field as per TS compiler
  });
};
