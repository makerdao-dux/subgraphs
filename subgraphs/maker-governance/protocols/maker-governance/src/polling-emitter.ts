import { Poll, PollVote } from "../../../generated/schema";
import { Voted } from "../../../generated/PollingEmitter/PollingEmitter";
import { getVoter } from "../../../src/helpers";

export function handlePollVote(event: Voted): void {
  const voterAddress = event.params.voter.toHexString();
  const pollId = event.params.pollId.toString();
  const optionId = event.params.optionId;

  const voter = getVoter(voterAddress);
  voter.numberPollVotes = voter.numberPollVotes + 1;
  voter.save();

  let poll = Poll.load(pollId);
  if (!poll) {
    poll = new Poll(pollId);
    poll.save();
  }

  const voteId = voterAddress.concat("-").concat(pollId);
  const pollVote = new PollVote(voteId);
  pollVote.choice = optionId;
  pollVote.voter = voterAddress;
  pollVote.poll = pollId;
  pollVote.block = event.block.number;
  pollVote.blockTime = event.block.timestamp;
  pollVote.txnHash = event.transaction.hash.toHexString();
  pollVote.save();
}
