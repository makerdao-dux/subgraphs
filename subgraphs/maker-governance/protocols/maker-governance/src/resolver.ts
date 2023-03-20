import { json } from "@graphprotocol/graph-ts";
import { ContenthashChanged } from "../../../generated/Resolver/Resolver";
import { ContentHashRegistry } from "../../../generated/schema";

export function handleContentHashChanged(event: ContenthashChanged): void {
  // Filter by our ens domain
  const node = event.params.node;
  const address = event.address;
  const contentHash = event.params.hash;
  const blockNumber = event.block.number.toI32();
  const transactionID = event.transaction.hash;

  const registry = new ContentHashRegistry(
    node.toHexString() + "-" + contentHash.toHexString()
  );

  registry.node = node;
  registry.nodeHexString = node.toHexString();
  registry.hashHexString = contentHash.toHexString();
  registry.blockNumber = blockNumber;
  registry.transactionID = transactionID;
  registry.hash = contentHash;
  registry.address = address;

  // Fetch the latest content hash from IPFS
  // first we need to get the IPFS hash from the content hash, it is encoded in b58
  // let manifest = ipfs.cat(registry.hash.toHexString());

  // Parse the latest content hash
  //let parsed = json.fromBytes(manifest).toObject();

  registry.save();
  // TODO: Store a entity with the latest content hash for our ens domain
}
