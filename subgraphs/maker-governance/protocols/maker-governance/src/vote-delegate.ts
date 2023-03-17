import {
  Delegate,
  Delegation,
  DelegationHistory,
} from "../../../generated/schema";
import { Lock, Free } from "../../../generated/DSChief/VoteDelegate";
import { getGovernanceFramework } from "../../../src/helpers";
import { BIGINT_ZERO, CHIEF } from "../../../src/constants";

export function handleDelegateLock(event: Lock): void {
  const sender = event.params.usr.toHexString();
  const delegateAddress = event.address;
  const delegate = Delegate.load(delegateAddress.toHexString());

  if (delegate) {
    // If the address is a delegate, update the delegate's stats
    const delegationId = delegate.id + "-" + sender;
    let delegation = Delegation.load(delegationId);

    if (!delegation) {
      delegation = new Delegation(delegationId);
      delegation.delegator = sender;
      delegation.delegate = delegate.id;
      delegation.amount = BIGINT_ZERO;
      delegate.delegations = delegate.delegations.concat([delegationId]);
    }
    // Update timestamp of the delegation
    delegation.timestamp = event.block.timestamp;

    // If previous delegation amount was 0, increment the delegators count
    if (delegation.amount.equals(BIGINT_ZERO)) {
      delegate.delegators = delegate.delegators + 1;
    }
    delegate.save();

    // Increase the total amount delegated to the delegate
    delegation.amount = delegation.amount.plus(event.params.wad);
    delegation.save();

    // Create a new delegation history entity
    const delegationHistoryId =
      delegationId + "-" + event.block.number.toString();
    const delegationHistory = new DelegationHistory(delegationHistoryId);
    delegationHistory.delegator = delegation.delegator;
    delegationHistory.delegate = delegation.delegate;
    delegationHistory.amount = event.params.wad;
    delegationHistory.accumulatedAmount = delegation.amount.plus(
      event.params.wad
    );
    delegationHistory.blockNumber = event.block.number;
    delegationHistory.txnHash = event.transaction.hash.toHexString();
    delegationHistory.timestamp = event.block.timestamp;
    delegationHistory.save();
  }

  const framework = getGovernanceFramework(CHIEF);
  framework.currentTokenDelegated = framework.currentTokenDelegated.plus(
    event.params.wad
  );
  framework.save();
}

export function handleDelegateFree(event: Free): void {
  const sender = event.params.usr.toHexString();
  const delegateAddress = event.address;
  const delegate = Delegate.load(delegateAddress.toHexString());

  if (delegate) {
    const delegationId = delegate.id + "-" + sender;
    const delegation = Delegation.load(delegationId);
    if (!delegation) return;

    // Update timestamp of the delegation
    delegation.timestamp = event.block.timestamp;

    // Decrease the total amount delegated to the delegate
    delegation.amount = delegation.amount.minus(event.params.wad);

    // If the delegation amount is 0, decrement the delegators count
    if (delegation.amount.equals(BIGINT_ZERO)) {
      delegate.delegators = delegate.delegators - 1;
    }

    delegation.save();
    delegate.save();

    // Create a new delegation history entity
    const delegationHistoryId =
      delegationId + "-" + event.block.number.toString();
    const delegationHistory = new DelegationHistory(delegationHistoryId);
    delegationHistory.delegator = delegation.delegator;
    delegationHistory.delegate = delegation.delegate;
    delegationHistory.amount = event.params.wad;
    delegationHistory.accumulatedAmount = delegation.amount.plus(
      event.params.wad
    );
    delegationHistory.blockNumber = event.block.number;
    delegationHistory.txnHash = event.transaction.hash.toHexString();
    delegationHistory.timestamp = event.block.timestamp;
    delegationHistory.save();
  }

  const framework = getGovernanceFramework(CHIEF);
  framework.currentTokenDelegated = framework.currentTokenDelegated.minus(
    event.params.wad
  );
  framework.save();
}
