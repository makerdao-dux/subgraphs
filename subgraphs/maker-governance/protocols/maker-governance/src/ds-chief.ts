import { BigInt, Bytes, Address, ethereum, log } from "@graphprotocol/graph-ts";
import { LogNote, Etch } from "../../../generated/DSChief/DSChief";
import { ExecutiveVote, Slate, Spell } from "../../../generated/schema";
import { BIGINT_ONE, SpellState } from "../../../src/constants";
import {
  addWeightToSpells,
  createChiefLockedMKRChange,
  createSlate,
  getGovernanceFramework,
  getVoter,
  hexToNumberString,
  removeWeightFromSpells,
  toDecimal,
} from "../../../src/helpers";

export function handleLock(event: LogNote): void {
  const sender = event.params.guy; // guy is the sender
  const amountStr = hexToNumberString(event.params.foo.toHexString());
  const amount = BigInt.fromString(amountStr); //.foo is the amount being locked

  const voter = getVoter(sender.toHexString());

  // Track the change of MKR locked in chief for the user
  const chiefLockedMKRChange = createChiefLockedMKRChange(
    event,
    voter.mkrLockedInChiefRaw,
    voter.mkrLockedInChiefRaw.plus(amount),
    voter.id
  );

  chiefLockedMKRChange.save();

  // Update the amount of MKR locked in chief for the voter
  voter.mkrLockedInChiefRaw = voter.mkrLockedInChiefRaw.plus(amount);
  voter.mkrLockedInChief = toDecimal(voter.mkrLockedInChiefRaw);
  voter.save();

  // Update the weight in all the executives supported
  addWeightToSpells(voter.currentSpells, amount);

  // Update total statistics about MKR locked in chief
  const framework = getGovernanceFramework(event.address.toHexString());
  framework.currentTokenLockedInChief =
    framework.currentTokenLockedInChief.plus(amount);
  framework.save();
}

export function handleFree(event: LogNote): void {
  const sender = event.params.guy; // guy is the sender
  const amountStr = hexToNumberString(event.params.foo.toHexString());
  const amount = BigInt.fromString(amountStr); //.foo is the amount being locked

  const voter = getVoter(sender.toHexString());

  // Track the change of MKR locked in chief for the user
  const chiefLockedMKRChange = createChiefLockedMKRChange(
    event,
    voter.mkrLockedInChiefRaw,
    voter.mkrLockedInChiefRaw.minus(amount),
    voter.id
  );

  chiefLockedMKRChange.save();

  // Update the amount of MKR locked in chief for the voter
  voter.mkrLockedInChiefRaw = voter.mkrLockedInChiefRaw.minus(amount);
  voter.mkrLockedInChief = toDecimal(voter.mkrLockedInChiefRaw);
  voter.save();

  // Update the weight in all the executives supported
  removeWeightFromSpells(voter.currentSpells, amount);

  // Update total statistics about MKR locked in chief
  const framework = getGovernanceFramework(event.address.toHexString());
  framework.currentTokenLockedInChief =
    framework.currentTokenLockedInChief.minus(amount);
  framework.save();
}

export function handleVote(event: LogNote): void {
  const sender = event.params.guy.toHexString(); // guy is the sender
  const slateID = event.params.foo; // foo is slate id
  _handleSlateVote(sender, slateID, event);
}

export function handleEtch(event: Etch): void {
  let sender = event.transaction.from.toHexString();
  const to = event.transaction.to;
  // Check if txn is not directly to Chief, it's either to vote delegate or multi-sig + delegate
  if (to && to != event.address) {
    const fromAdmin = DelegateAdmin.load(sender);
    if (!fromAdmin) {
      const toAdmin = DelegateAdmin.load(to.toHexString());
      if (!toAdmin) {
        log.error("Etch not trigger by a delegate admin. TxnHash: {}", [
          event.transaction.hash.toHexString(),
        ]);
      } else {
        // Txn sent via a proxy/multi-sig to vote delegate
        sender = toAdmin.voteDelegate!;
      }
    } else {
      // Txn sent to vote delegate
      sender = fromAdmin.voteDelegate!;
    }
  }
  const slateID = event.params.slate;
  _handleSlateVote(sender, slateID, event);
}

function _handleSlateVote(
  sender: string,
  slateID: Bytes,
  event: ethereum.Event
): void {
  const voter = getVoter(sender);
  let slate = Slate.load(slateID.toHexString());
  if (!slate) {
    slate = createSlate(slateID, event);
  }

  // Remove votes from previous spells
  removeWeightFromSpells(voter.currentSpells, voter.mkrLockedInChiefRaw);

  for (let i = 0; i < slate.yays.length; i++) {
    const spellID = slate.yays[i];
    const spell = Spell.load(spellID);
    if (spell) {
      const voteId = sender.concat("-").concat(spellID);
      const vote = new ExecutiveVote(voteId);
      vote.weight = voter.mkrLockedInChiefRaw;
      vote.reason = "";
      vote.voter = sender;
      vote.spell = spellID;
      vote.block = event.block.number;
      vote.blockTime = event.block.timestamp;
      vote.txnHash = event.transaction.hash.toHexString();
      vote.logIndex = event.logIndex;
      vote.save();

      spell.totalVotes = spell.totalVotes.plus(BIGINT_ONE);
      spell.totalWeightedVotes = spell.totalWeightedVotes.plus(
        voter.mkrLockedInChiefRaw
      );
      spell.save();
    }
  }

  voter.currentSpells = slate.yays;
  voter.numberExecutiveVotes = voter.numberExecutiveVotes + 1;
  voter.save();
}

export function handleLift(event: LogNote): void {
  // foo is the spellID in bytes, we trim and convert to address
  const spellID = Address.fromString(event.params.foo.toHexString().slice(26));

  const spell = Spell.load(spellID.toHexString());
  if (!spell) return;
  spell.state = SpellState.LIFTED;
  spell.liftedTxnHash = event.transaction.hash.toHexString();
  spell.liftedBlock = event.block.number;
  spell.liftedTime = event.block.timestamp;
  spell.liftedWith = spell.totalWeightedVotes;
  spell.save();

  // Update governance framework everytime a spell is lifted
  const framework = getGovernanceFramework(event.address.toHexString());
  framework.currentHat = spell.id;
  framework.save();
}
