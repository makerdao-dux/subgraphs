import { Delegate, Delegation } from "../../../generated/schema";
import { Lock, Free } from "../../../generated/DSChief/VoteDelegate";
import { getGovernanceFramework } from "../../../src/helpers";
import { BIGINT_ZERO, CHIEF } from "../../../src/constants";

export function handleDelegateLock(event: Lock): void {
  const sender = event.params.usr.toHexString();
  const delegateAddress = event.address;
  const delegate = Delegate.load(delegateAddress.toHexString());

  if (delegate) {
    // If the address is a delegate, update the delegate's stats
    const delegationID = delegate.id + "-" + sender;
    let delegation = Delegation.load(delegationID);
    if (!delegation) {
      delegation = new Delegation(delegationID);
      delegation.delegator = sender;
      delegation.amount = BIGINT_ZERO;
      delegate.delegations = delegate.delegations.concat([delegationID]);
    }
    if (delegation.amount.equals(BIGINT_ZERO)) {
      delegate.delegators = delegate.delegators + 1;
    }

    delegation.amount = delegation.amount.plus(event.params.wad);
    delegation.save();
    delegate.save();
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
    const delegationID = delegate.id + "-" + sender;
    const delegation = Delegation.load(delegationID);
    if (!delegation) return;

    delegation.amount = delegation.amount.minus(event.params.wad);
    if (delegation.amount.equals(BIGINT_ZERO)) {
      delegate.delegators = delegate.delegators - 1;
    }
    delegation.save();
    delegate.save();
  }

  const framework = getGovernanceFramework(CHIEF);
  framework.currentTokenDelegated = framework.currentTokenDelegated.minus(
    event.params.wad
  );
  framework.save();
}
