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
  registry.save();
  // TODO: Store a entity with the latest content hash for our ens domain
}
