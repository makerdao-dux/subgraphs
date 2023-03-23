import {
  json,
  Bytes,
  JSONValue,
  BigDecimal,
  log,
} from "@graphprotocol/graph-ts";
import {
  DelegateMetadata,
  DelegateMetrics,
  DelegateTags,
  Delegate,
  VotingCommittee,
  VotingStrategy,
} from "../../../generated/schema";

// const mock = '{"delegates":[{"voteDelegateAddress":"0x22d5294a23d49294Bf11D9db8bEda36e104ad9b3","profile":{"name":"MakerMan","tags":["data-driven","security","sustainability","scalability","pragmatism","decentralization"],"description":"# MakerMan\\n\\n### Key Info\\n\\nName: MakerMan\\n\\nForum: @MakerMan\\n\\nDiscord: @MakerMan#6155\\n\\nEmail: DaiMakerMan@gmail.com\\n\\nDelegate Address: 0x22d5294a23d49294Bf11D9db8bEda36e104ad9b3\\n## Core Values\\n* **Stakeholder Recognition** - Micro to Macrocosm. People are important, too.\\n* **Secure, Sustainable and Scaleable Systems.**\\n* **Importance of Data Analytics** to Goal achievement and problem solving.\\n\\n## Delegate Statement\\nMy service to Maker involves the following commitments:\\n\\n* In good and bad economic times, look out for all the important Maker work-economic stakeholders (MKR holders, vault owners, DAI holder and users, MakerDAO, DeFI in general etc.).\\n* To looking at the system of Maker from both the internal **microcosms** of contracts, people, operations to the greater **macrocosms** of DeFI and the real world in terms of governance, law, and finance.\\n* To creating **Safe, Scalable and Sustainable Systems** as Simply and Efficiently as possible.\\n* To **growing** Maker in a way that is Sustainable for the long term.\\n* To use **Data driven analytics** to drive decision-making to achieve goals.  Look towards the future by analyzing the past and present.\\n\\nI arrived at Maker just as the transition from Single Collateral DAI (SCD/SAI) to MultiCollateral DAI (MCD/DAI) was occuring in November 2019. My goals are to consistently to ask the hard questions, look towards building a sustainable future, and doing this by looking at the system from the perspectives of all players using any and all available data. My ideas tend not to be implemented immediately because they break the mold of the ‘what-are-we-doing-today’ mentality that almost every organization I have been a part of does. Therefore, I look for the things that yield the greatest return in the shortest time for the least cost that is good for all stakeholders and the entire ecosystem. I see Maker as rapidly approaching the scale of many smaller nations financially, and so it is going to have to work at a fully international scale and view to navigate deep and difficult waters as it grows from 10B to 1T in assets under management. Maker desperately needs a diverse set of greater minds to focus efforts, both to be efficient, effective and forward thinking. In the highly competitive crypto/defi environment Maker needs to move faster, do it more efficiently, and above all, be willing to be first. This will mean some possible mis-steps, and some potential losses, but with proper management, Maker can continue to stand as a key leader and mover in the fast-paced blockchain Decentralized Finance space.\\n\\nMy goals:\\n\\n1.  **Grow Maker to becoming a $1T entity** with a focus on *anti-fragility, decentralization, reducing systemic and user risk, using data/analytics* to drive goal achievement.\\n2.  Continue to work to drive Maker into being one of the most *secure, reliable, fully transparent* protocols in the space.\\n3.  Exemplify *excellence, integrity, honesty, and openness* in the space with action by looking at both the microcosm of the DAO and system of contracts, and Maker integration into the larger DeFI ecosystems as well as how it will integrate into greater Real World of assets, finance, law and politics.\\n\\nMy introduction to Maker was started with a new forum thread where I encouraged people to introduce themselves and to learn the Maker basics.\\n\\n[Welcome New Members](https://forum.makerdao.com/t/is-there-a-thread-here-to-welcome-new-forum-members/766)\\n\\n[The Official Maker Welcome Thread](https://forum.makerdao.com/t/the-official-welcome-thread/771)\\n\\nI have a few hundred posts on various topics related to my core values above that can be reviewed here\\n\\n[MakerMan Maker Forum Posts](https://forum.makerdao.com/u/makerman/)\\n\\n**Key Highlights**\\n\\nAfter BlackThursday(BT) the effects on vault owners were still not recognized.  I started up a thread for vault holders to vent, which lead to my work spearheading the Black Thursday Report for the community and an initiative regarding compensation for affected vault holders.\\n\\n[Black Thursday Vault owners report thread](https://forum.makerdao.com/t/black-thursday-vault-owners-report-thread)\\n[Compensating Vault holders that liquidated at 0-bid](https://forum.makerdao.com/t/compensating-vault-holders-that-liquidated-at-0-bid)\\n[Maker MCD Ethereum System Liquidation Report and Black Thursday Compensation Analysis](https://forum.makerdao.com/t/maker-mcd-ethereum-system-liquidation-report-and-black-thursday-compensation-analysis)\\n\\nWhile BT compensation failed to compensate affected vault owners, it allowed everyone in the community to speak and laid the issue to rest for the vast majority of the community.  Hence was a success from this perspective.\\n\\nFor various reasons, I burned out on the Maker community for a time and took a break.\\n\\nWithout compensation at levels above my current employ, my ability to work will be limited to what is strictly necessary to steward over the Maker system to fulfill the above commitments. As a delegate, I promise to be respectful even if I vehemently disagree with a view, listen to all parties no matter what their views, to be a fair decision maker, and open with my views. Good data or cogent argument can and will change my mind on any topic. I also pledge near 100% poll participation unless acts of God interviene. I will stand by all executives to secure the system unless I have strong opposition toward them, in which case, I will make my views publicly known.\\n\\n**Potential Conflicts and Alignments of Interest**\\n\\n* I have a vault and typically borrow from time to time.\\n* I am a MKR owner my ownership percentage is small relative to my total portfolio.\\n* I do hold DAI most times in various contracts.\\n* Not employed by Maker Foundation or MakerDAO and hold no position in the DAO.\\n\\n**Income from Maker(DAI)**\\n\\n* 4K for the BT report (5/2020)\\n* 6.3K for work on the BT compensation group. (1/2021)\\n* 8.4K via SourceCred DAI rewards. (inception to current)\\n\\nFinally will do my best to communicate with the community regarding my views and positions on upcoming polls and executives, make myself available via e-mail and private forum communication. I also agree to the [Maker delegate Code of Conduct](https://forum.makerdao.com/t/recognised-delegate-code-of-conduct) as posted 20210816.\\n\\n**Waver of liability**\\n\\nBy delegating to MakerMan you acknowledge and agree that MakerMan will not be held liable for any form of damages or losses related to your delegation of your MKR to MakerMan. By delegating your MKR you still assume full responsibility for votes made on your behalf by MakerMan due to your ownership of MKR. It is your responsibility to understand the risks and costs related to delegation of your MKR, and specifically affirm and agree that at all times you have complete control over this by adding or removing your MKR from my delegation contract.\\n","externalProfileURL":null},"image":"QmPSy2TD8rCkFVb6mxDg62j444iATnxjXf51ojJPvHheat","metrics":{"combinedParticipation":"94.74%","pollParticipation":"95.13%","executiveParticipation":"92.50%","communication":"93.14%"},"cuMember":false}],"tags":[{"id":"academia","shortname":"Academia","longname":"","description":"Delegate values engaging with academic institutions at the student or research level."}],"votingCommittees":[{"name":"Delegate Voting Committee 1","image":"QmTBJCN6xSHvUScsptMX2TmuW7w4WVDDPvbH2V4G5K88n3","externalProfileURL":null,"description":"# Delegate Voting Committee 1\\n\\n## Description\\n\\nWe are a group of delegates that work towards the decentralization of MakerDAO. We are a diverse group of people from all over the world, with different backgrounds and experiences. We are united by our passion for MakerDAO and our desire to see it succeed.\\n\\n## Statement\\n\\nWe are a group of delegates that work towards the decentralization of MakerDAO. We are a diverse group of people from all over the world, with different backgrounds and experiences. We are united by our passion for MakerDAO and our desire to see it succeed.","strategies":[{"name":"Growth","description":"# Growth Strategy\\n\\n## Description\\n\\nThe Growth Strategy is responsible for the growth of the Maker Protocol. This includes: growth assessment, growth mitigation, growth reporting, and growth governance.","delegates":["0x7Ddb50A5b15AeA7e7cf9aC8E55a7F9fd9d05ecc6","0x7Ddb50A5b15AeA7e7cf9aC8E55a7F9fd9d05ecc6"]},{"name":"Risk Management","description":"# Risk Management Strategy\\n\\n## Description\\n\\nThe Risk Management Strategy is responsible for the risk management of the Maker Protocol. This includes: risk assessment, risk mitigation, risk reporting, and risk governance.","delegates":["0x7Ddb50A5b15AeA7e7cf9aC8E55a7F9fd9d05ecc6","0x7Ddb50A5b15AeA7e7cf9aC8E55a7F9fd9d05ecc6"]}]}]}'
function extractBigDecimal(value: string): BigDecimal {
  // we receive values in the shape of '94.23%', so we need to remove the % and convert to a BigDecimal
  if (!value || value == "No Data") return BigDecimal.fromString("0.0");

  const valueWithoutPercentage = value.replace("%", "");
  const valueAsBigDecimal = BigDecimal.fromString(valueWithoutPercentage);
  return valueAsBigDecimal;
}

export function handleMetadata(content: Bytes): void {
  log.debug("handleMetadata Content: {}", [content.toString()]);
  const value = json.fromBytes(content).toObject();

  //const value = json.fromString(mock).toObject();
  if (value) {
    // Update voting committees
    const votingCommittees = (
      value.get("votingCommittees") as JSONValue
    ).toArray();

    votingCommittees.forEach((votingCommittee) => {
      const votingCommitteeObject = votingCommittee.toObject();
      const votingCommitteeId = (
        votingCommitteeObject.get("name") as JSONValue
      ).toString();

      // Check if voting committee exist
      let delegateVotingCommittee = VotingCommittee.load(votingCommitteeId);

      if (!delegateVotingCommittee) {
        delegateVotingCommittee = new VotingCommittee(votingCommitteeId);
      }

      // Update the delegate voting committee
      const description = (
        votingCommitteeObject.get("description") as JSONValue
      ).toString();
      delegateVotingCommittee.description = description;

      // name
      const name = (votingCommitteeObject.get("name") as JSONValue).toString();
      delegateVotingCommittee.name = name;

      // image
      const image = (
        votingCommitteeObject.get("image") as JSONValue
      ).toString();
      delegateVotingCommittee.image = image;

      // externalProfileURL
      const externalProfileURL = (
        votingCommitteeObject.get("externalProfileURL") as JSONValue
      ).toString();
      delegateVotingCommittee.externalProfileURL = externalProfileURL;

      // Define the strategies
      const strategies = (
        votingCommitteeObject.get("strategies") as JSONValue
      ).toArray();

      let strategyIds: string[] = [];
      strategies.forEach((strategy) => {
        const strategyObject = strategy.toObject();

        // Check if strategy exist
        const strategyName = (
          strategyObject.get("name") as JSONValue
        ).toString();
        let delegateStrategy = VotingStrategy.load(strategyName);

        if (!delegateStrategy) {
          delegateStrategy = new VotingStrategy(strategyName);
        }

        delegateStrategy.name = strategyName;

        // Update the delegate strategy
        const description = (
          strategyObject.get("description") as JSONValue
        ).toString();
        delegateStrategy.description = description;

        // Delegates (array of addresses)
        let delegates: string[] = [];
        (strategyObject.get("delegates") as JSONValue)
          .toArray()
          .forEach((delegate) => {
            delegates = delegates.concat([delegate.toString()]);
          });

        delegateStrategy.delegates = delegates;

        // Save the delegate strategy
        delegateStrategy.save();

        strategyIds = strategyIds.concat([delegateStrategy.id]);
      });

      delegateVotingCommittee.strategies = strategyIds;
      // Save the delegate voting committee
      delegateVotingCommittee.save();
    });

    (value.get("delegates") as JSONValue).toArray().forEach((delegateData) => {
      const delegateDataObject = delegateData.toObject();

      const delegateAddress = (
        delegateDataObject.get("voteDelegateAddress") as JSONValue
      )
        .toString()
        .toLowerCase();

      log.debug("Delegate address: {}", [delegateAddress]);
      const delegate = Delegate.load(delegateAddress);

      log.debug("Delegate loaded: {}", [delegate ? delegate.id : "Not found"]);

      if (delegate) {
        log.debug("Delegate found: {}", [delegate.id]);
        let delegateMetadata = DelegateMetadata.load(delegateAddress);

        if (!delegateMetadata) {
          delegateMetadata = new DelegateMetadata(delegateAddress);
        }

        const profile = delegateDataObject.get("profile") as JSONValue;

        delegateMetadata.name = (
          profile.toObject().get("name") as JSONValue
        ).toString();

        log.debug("Delegate name: {}", [delegateMetadata.name]);

        delegateMetadata.description = (
          profile.toObject().get("description") as JSONValue
        ).toString();

        log.debug("Delegate description: {}", [delegateMetadata.description]);

        delegateMetadata.image = (
          delegateDataObject.get("image") as JSONValue
        ).toString();

        log.debug("Delegate image: {}", [delegateMetadata.image]);

        const externalProfileURL = profile
          .toObject()
          .get("externalProfileURL") as JSONValue;
        delegateMetadata.externalProfileURL = externalProfileURL.isNull()
          ? ""
          : externalProfileURL.toString();

        log.debug("Delegate external profile url: {}", [
          delegateMetadata.externalProfileURL,
        ]);

        delegateMetadata.coreUnitMember = (
          profile.toObject().get("cuMember") as JSONValue
        ).toBool();

        log.debug("Before metrics: {}", [""]);

        let metrics = DelegateMetrics.load(delegateAddress);
        const delegateMetricsData = delegateDataObject.get(
          "metrics"
        ) as JSONValue;
        if (!metrics) {
          metrics = new DelegateMetrics(delegateAddress);
        }

        // Parse the metrics, they are strings like "94.23%" into BigDecimals
        const rawCombinedParticipation =
          (
            delegateMetricsData
              .toObject()
              .get("combinedParticipation") as JSONValue
          ).toString() || "0.0%";
        metrics.combinedParticipation = extractBigDecimal(
          rawCombinedParticipation
        );

        log.debug("Delegate combinedParticipation: {}", [
          metrics.combinedParticipation.toString(),
        ]);

        const rawPollParticipation =
          (
            delegateMetricsData.toObject().get("pollParticipation") as JSONValue
          ).toString() || "0.0%";
        metrics.pollParticipation = extractBigDecimal(rawPollParticipation);

        log.debug("Delegate pollParticipation: {}", [
          metrics.pollParticipation.toString(),
        ]);

        const rawExecutiveParticipation =
          (
            delegateMetricsData
              .toObject()
              .get("executiveParticipation") as JSONValue
          ).toString() || "0.0%";
        metrics.executiveParticipation = extractBigDecimal(
          rawExecutiveParticipation
        );

        log.debug("Delegate executiveParticipation: {}", [
          metrics.executiveParticipation.toString(),
        ]);

        const rawCommunication =
          (
            delegateMetricsData.toObject().get("communication") as JSONValue
          ).toString() || "0.0%";
        metrics.communication = extractBigDecimal(rawCommunication);

        log.debug("Delegate communication: {}", [
          metrics.communication.toString(),
        ]);

        // save the metrics
        metrics.save();

        log.debug("Delegate metrics saved: {}", [metrics.id]);

        // Update the delgate metadata to point to the metrics
        delegateMetadata.metrics = metrics.id;

        // save the delegate metadata
        delegateMetadata.save();

        // Update the delegate to point to the metadata
        delegate.metadata = delegateMetadata.id;
        delegate.save();

        log.debug("Delegate metadata saved: {}", [delegateMetadata.id]);
      }
    });
  }
}
