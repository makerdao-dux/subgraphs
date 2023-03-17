// import { BigInt } from '@graphprotocol/graph-ts';
import {
  // DelegateFactory,
  CreateVoteDelegate,
} from "../../../generated/DelegateFactory/DelegateFactory";
import { Delegate, DelegateAdmin, Voter } from "../../../generated/schema";
import { BIGDECIMAL_ZERO, BIGINT_ZERO, CHIEF } from "../../../src/constants";
import { getGovernanceFramework } from "../../../src/helpers";
import { VoteDelegate as VoteDelegateTemplate } from "../../../generated/templates";

export function handleCreateVoteDelegate(event: CreateVoteDelegate): void {
  // https://etherscan.io/address/0xD897F108670903D1d6070fcf818f9db3615AF272#code
  // event.params.delegate and event.transcation.from.toHexString() should be the same
  const delegateOwnerAddress = event.transaction.from;
  const delegateContractAddress = event.params.voteDelegate;

  // Create the delegate contract
  let delegateInfo = Delegate.load(delegateContractAddress.toHexString());

  if (!delegateInfo) {
    delegateInfo = new Delegate(delegateContractAddress.toHexString());
    delegateInfo.ownerAddress = delegateOwnerAddress.toHexString();
    delegateInfo.delegations = [];
    delegateInfo.delegators = 0;
    delegateInfo.blockTimestamp = event.block.timestamp;
    delegateInfo.blockNumber = event.block.number;
    delegateInfo.txnHash = event.transaction.hash.toHexString();
    delegateInfo.delegationHistory = [];
    delegateInfo.save();
  }

  // Create delegate admin entity, it links the owner address with the delegate contrat
  // In the future this entity might hold more than 1 delegate contract
  let delegateAdmin = DelegateAdmin.load(delegateOwnerAddress.toHexString());

  if (!delegateAdmin) {
    delegateAdmin = new DelegateAdmin(delegateOwnerAddress.toHexString());
  }
  delegateAdmin.delegateContract = delegateInfo.id;
  delegateAdmin.save();

  // Track this new vote delegate contract
  VoteDelegateTemplate.create(delegateContractAddress);

  const voter = new Voter(delegateContractAddress.toHexString());
  voter.mkrLockedInChiefRaw = BIGINT_ZERO;
  voter.mkrLockedInChief = BIGDECIMAL_ZERO;
  voter.currentSpells = [];
  voter.numberExecutiveVotes = 0;
  voter.numberPollVotes = 0;
  voter.isVoteDelegate = true;
  voter.isVoteProxy = false;
  // Assign the delegate contract to the voter
  voter.delegateContract = delegateContractAddress.toHexString();

  voter.save();

  const framework = getGovernanceFramework(CHIEF);
  framework.totalDelegates = framework.totalDelegates + 1;
  framework.save();
}
