export function handleContentHashChanged(event: ContenthashChangedEvent): void {
  // Filter by our ens domain

  const node = event.params.node;
  const address = event.address;
  const contentHash = event.params.hash;
  const blockNumber = event.block.number.toI32();
  const transactionID = event.transaction.hash;

  // TODO: Store a entity with the latest content hash for our ens domain
}
