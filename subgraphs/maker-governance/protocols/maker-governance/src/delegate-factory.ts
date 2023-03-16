// import { BigInt } from '@graphprotocol/graph-ts';
import {
  // DelegateFactory,
  CreateVoteDelegate,
} from "../../../generated/DelegateFactory/DelegateFactory";
import { Delegate, DelegateAdmin, Voter } from "../../../generated/schema";
import { BIGDECIMAL_ZERO, BIGINT_ZERO, CHIEF } from "../../../src/constants";
import { getGovernanceFramework } from "../../../src/helpers";

export function handleCreateVoteDelegate(event: CreateVoteDelegate): void {
  // https://etherscan.io/address/0xD897F108670903D1d6070fcf818f9db3615AF272#code
  // event.params.delegate and event.transcation.from.toHex() should be the same
  const delegateOwnerAddress = event.transaction.from.toHex();
  const delegateContractAddress = event.params.voteDelegate.toHex();

  // Create the delegate contract
  let delegateInfo = Delegate.load(delegateContractAddress);

  if (!delegateInfo) {
    delegateInfo = new Delegate(delegateContractAddress);
    delegateInfo.ownerAddress = delegateOwnerAddress;
    delegateInfo.delegations = [];
    delegateInfo.delegators = 0;
    delegateInfo.save();
  }

  // Create delegate admin entity, it links the owner address with the delegate contrat
  // In the future this entity might hold more than 1 delegate contract
  let delegateAdmin = DelegateAdmin.load(delegateOwnerAddress);

  if (!delegateAdmin) {
    delegateAdmin = new DelegateAdmin(delegateOwnerAddress);
  }
  delegateAdmin.delegateContract = delegateInfo.id;
  delegateAdmin.save();

  const voter = new Voter(delegateContractAddress);
  voter.mkrLockedInChiefRaw = BIGINT_ZERO;
  voter.mkrLockedInChief = BIGDECIMAL_ZERO;
  voter.currentSpells = [];
  voter.numberExecutiveVotes = 0;
  voter.numberPollVotes = 0;
  voter.isVoteDelegate = true;
  voter.isVoteProxy = false;
  // Assign the delegate contract to the voter
  voter.delegateContract = delegateContractAddress;

  voter.save();

  const framework = getGovernanceFramework(CHIEF);
  framework.totalDelegates = framework.totalDelegates + 1;
  framework.save();
}
