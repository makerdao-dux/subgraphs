import { Bytes, log } from "@graphprotocol/graph-ts";
import { ContenthashChanged } from "../../../generated/Resolver/Resolver";
import { ContentHashRegistry } from "../../../generated/schema";
import { IPFSMetadata as IPFSMetadataTemplate } from "../../../generated/templates";

const MAKER_ENS_NODE =
  "0x21ed05c0091f0de7f0b56fdca46e571d01abee6f1526b3a8db4bf5c001e2c312";

export function handleContentHashChanged(event: ContenthashChanged): void {
  // Filter by our ens domain
  const node = event.params.node;
  const address = event.address;
  const contentHash = event.params.hash;
  const blockNumber = event.block.number.toI32();
  const transactionID = event.transaction.hash;

  log.debug("Node in tx - {}: {}, {}", [
    transactionID.toHexString(),
    node.toHexString(),
    node.toBase58(),
  ]);

  if (node.toHexString() == MAKER_ENS_NODE) {
    log.debug("handleContentHashChanged MAKER_ENS_NODE: {}", [MAKER_ENS_NODE]);
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

    const ipfCID = Bytes.fromHexString(
      contentHash.toHexString().slice(10)
    ).toBase58();

    log.debug("handleContentHashChanged IPFS CID: {}", [ipfCID]);
    // TODO : Decode the content hash
    // IPFSMetadataTemplate.create(
    //   "QmQ9hBWwK4CBgXfjDTQFmku3Kwd7Dg2AVGnCbGn6diw2wi"
    // );
    IPFSMetadataTemplate.create(ipfCID);

    // Fetch the latest content hash from IPFS
    // first we need to get the IPFS hash from the content hash, it is encoded in b58
    // let manifest = ipfs.cat(registry.hash.toHexString());

    // Parse the latest content hash
    //let parsed = json.fromBytes(manifest).toObject();

    registry.save();
    // TODO: Store a entity with the latest content hash for our ens domain
  }
}
