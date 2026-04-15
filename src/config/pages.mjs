/**
 * Page configs for the vaults.fyi research engine pilot.
 *
 * Each entry defines:
 * - slug: URL path (e.g. /best-usdc-yields)
 * - title: <title> tag and og:title
 * - description: meta description
 * - h1: page heading (can differ from title)
 * - apiParams: passed to /v2/detailed-vaults
 * - benchmarkAsset: 'usd' or 'eth' — which benchmark to compare against
 * - intro: short paragraph below the H1
 * - yieldSource: explanatory section content
 * - risks: risk section content
 * - faq: array of { q, a } — rendered as JSON-LD FAQPage and visible Q&A
 * - related: internal links to related pages [ { slug, label } ]
 */

export const pages = [
  {
    slug: 'best-usdc-yields',
    title: 'Best USDC Yields in DeFi — Live Rates',
    description:
      'Compare the highest USDC APY rates across DeFi protocols including Morpho, Aave, Spark, and Euler. Live rates updated daily from onchain data.',
    h1: 'Best USDC Yields in DeFi',
    apiParams: {
      assets: ['USDC'],
      minTvl: 500000,
      perPage: 20,
    },
    benchmarkAsset: 'usd',
    intro:
      'Live USDC lending rates across DeFi, ranked by 7-day average APY. Data is sourced directly from onchain contracts and updated daily.',
    yieldSource:
      'USDC yield in DeFi comes primarily from lending interest. When you deposit USDC into a lending protocol, borrowers pay interest to use those funds. The protocol distributes this interest to depositors as APY. Some protocols also distribute additional token rewards (shown separately as reward APY). The 7-day APY smooths out short-term rate spikes to give a more representative yield estimate.',
    risks:
      'DeFi USDC yields carry risks that traditional savings do not: smart contract vulnerabilities, protocol governance risk, and liquidity risk during market stress. Vaults with higher TVL, longer track records, and published security audits generally carry lower risk. The reputation score shown in the table above reflects vaults.fyi\'s assessment of each vault\'s risk profile.',
    faq: [
      {
        q: 'What is the best USDC APY available in DeFi right now?',
        a: 'The highest USDC APY available changes daily based on borrowing demand. See the live table above for current rates — it is updated daily from onchain data across Morpho, Aave, Spark, Euler, and other major protocols.',
      },
      {
        q: 'Where does USDC yield in DeFi come from?',
        a: 'USDC yield comes primarily from lending interest paid by borrowers. When you deposit USDC into a protocol like Aave or Morpho, borrowers pay an interest rate to access those funds. The protocol passes this yield to depositors. Some vaults also earn additional token rewards on top of the base lending rate.',
      },
      {
        q: 'How does DeFi USDC yield compare to traditional savings accounts?',
        a: 'DeFi USDC yields typically range from 3% to 12% APY depending on market conditions, compared to 4–5% for traditional high-yield savings accounts. However, DeFi yields are variable and carry additional risks — including smart contract risk — that bank accounts do not.',
      },
      {
        q: 'Which protocols offer the highest USDC APY?',
        a: 'Protocols consistently offering competitive USDC yields include Morpho, Aave, Spark, Euler, and Compound. Rates vary by protocol and network. See the live table above for current rankings.',
      },
      {
        q: 'Is it safe to deposit USDC in DeFi for yield?',
        a: 'Risk varies significantly by protocol. Higher-TVL protocols with long track records and multiple security audits — such as Aave and Morpho — are generally considered lower risk within DeFi. All DeFi protocols carry smart contract risk. The reputation score in the table above reflects vaults.fyi\'s independent risk assessment for each vault.',
      },
    ],
    related: [
      { slug: 'best-usdt-yields', label: 'Best USDT Yields' },
      { slug: 'best-stablecoin-yields', label: 'Best Stablecoin Yields' },
      { slug: 'morpho-yields', label: 'Morpho Yields' },
      { slug: 'aave-usdc-yield', label: 'Aave USDC Yield' },
    ],
  },

  {
    slug: 'best-usdt-yields',
    title: 'Best USDT Yields in DeFi — Live Rates',
    description:
      'Compare the highest USDT APY rates across DeFi protocols. Live lending rates updated daily from onchain data across Morpho, Aave, Euler, and more.',
    h1: 'Best USDT Yields in DeFi',
    apiParams: {
      assets: ['USDT'],
      minTvl: 500000,
      perPage: 20,
    },
    benchmarkAsset: 'usd',
    intro:
      'Live USDT lending rates across DeFi, ranked by 7-day average APY. Data sourced directly from onchain contracts and updated daily.',
    yieldSource:
      'USDT yield in DeFi comes from lending interest paid by borrowers who use USDT as collateral or as a borrowed asset. Lending protocols like Aave and Morpho match lenders and borrowers algorithmically, with rates adjusting based on utilization (the share of deposited USDT that is currently borrowed). Higher utilization means higher APY for lenders.',
    risks:
      'USDT carries an additional counterparty risk compared to USDC: it is issued by Tether, a private company whose reserves have historically been less transparent than Circle\'s (issuer of USDC). In addition to standard DeFi smart contract risk, USDT depositors should consider issuer risk. The reputation scores in the table above reflect protocol-level risk assessed by vaults.fyi.',
    faq: [
      {
        q: 'What is the current best USDT APY in DeFi?',
        a: 'USDT APY rates change daily based on borrowing demand. See the live table above for current rates across Morpho, Aave, and other major protocols.',
      },
      {
        q: 'How does USDT yield compare to USDC yield in DeFi?',
        a: 'USDT and USDC yields are typically similar since both are USD-pegged stablecoins used in DeFi lending. Rates may diverge based on which asset has higher borrowing demand at a given time. See our stablecoin yields comparison page for a side-by-side view.',
      },
      {
        q: 'Where does USDT yield in DeFi come from?',
        a: 'USDT yield comes from borrowers who pay interest to use USDT in DeFi. Lending protocols distribute this interest to depositors. Rates adjust algorithmically based on how much of the deposited USDT is currently being borrowed (utilization rate).',
      },
      {
        q: 'Which protocols offer the highest USDT APY?',
        a: 'Protocols offering competitive USDT yields include Morpho, Aave, Euler, and Compound. Current rankings are available in the live table above.',
      },
      {
        q: 'What are the risks of earning yield on USDT in DeFi?',
        a: 'Risks include smart contract vulnerabilities in the DeFi protocol, USDT issuer risk (Tether counterparty risk), and liquidity risk. Protocols with higher TVL and audited smart contracts carry lower protocol risk, though issuer risk applies to all USDT positions.',
      },
    ],
    related: [
      { slug: 'best-usdc-yields', label: 'Best USDC Yields' },
      { slug: 'best-stablecoin-yields', label: 'Best Stablecoin Yields' },
      { slug: 'morpho-yields', label: 'Morpho Yields' },
    ],
  },

  {
    slug: 'best-stablecoin-yields',
    title: 'Best Stablecoin Yields in DeFi — USDC, USDT & DAI Rates',
    description:
      'Compare the highest stablecoin APY rates across USDC, USDT, and DAI in DeFi. Live rates from Morpho, Aave, Spark, and 80+ protocols, updated daily.',
    h1: 'Best Stablecoin Yields in DeFi',
    apiParams: {
      assets: ['USDC', 'USDT', 'DAI', 'USDS', 'GHO'],
      minTvl: 1000000,
      perPage: 30,
    },
    benchmarkAsset: 'usd',
    intro:
      'The highest-yielding stablecoin vaults across USDC, USDT, DAI, and other USD-pegged assets — ranked by 7-day average APY. Updated daily from onchain data.',
    yieldSource:
      'Stablecoin yield in DeFi is generated primarily through overcollateralized lending. Borrowers deposit volatile assets (ETH, wBTC, etc.) as collateral to borrow stablecoins, paying interest that flows to lenders. Some protocols also generate yield through real-world asset exposure or protocol-native mechanisms. DAI/USDS yield may include Maker\'s Dai Savings Rate (DSR) as a base layer.',
    risks:
      'Stablecoin DeFi yields carry smart contract risk (bugs or exploits in the lending protocol), stablecoin issuer risk (USDT carries Tether counterparty risk; USDC carries Circle counterparty risk), and depeg risk in stress scenarios. Higher-TVL protocols with published audits and long track records are generally lower risk. DAI/USDS carries additional governance risk as a decentralized stablecoin.',
    faq: [
      {
        q: 'What are the best stablecoin yields in DeFi today?',
        a: 'The top stablecoin yields currently available are shown in the live table above, updated daily. Rates typically range from 3% to 15% APY depending on the protocol and market conditions.',
      },
      {
        q: 'Which stablecoin earns the most yield in DeFi — USDC, USDT, or DAI?',
        a: 'Rates vary based on borrowing demand for each asset. USDC and USDT tend to have similar yields since both are widely used as borrowed assets. DAI yields may differ due to Maker\'s Dai Savings Rate. See the live table for current rankings.',
      },
      {
        q: 'What is the safest way to earn stablecoin yield in DeFi?',
        a: 'Lower-risk approaches include depositing into established, audited protocols like Aave or Morpho with high TVL. The reputation scores in the table above reflect vaults.fyi\'s independent risk assessment. Diversifying across multiple vaults reduces single-protocol risk.',
      },
      {
        q: 'How do DeFi stablecoin yields compare to traditional savings?',
        a: 'DeFi stablecoin yields typically range from 3–12% APY, while traditional high-yield savings accounts offer 4–5%. DeFi yields are variable and carry risks — including smart contract risk — not present in bank accounts. Returns are not guaranteed.',
      },
      {
        q: 'What protocols offer the highest stablecoin APY?',
        a: 'Morpho, Aave, Spark, Euler, and Compound consistently rank among the top protocols for stablecoin yield. Rates vary by asset and network. See the live table above for current rankings across all stablecoins.',
      },
    ],
    related: [
      { slug: 'best-usdc-yields', label: 'Best USDC Yields' },
      { slug: 'best-usdt-yields', label: 'Best USDT Yields' },
      { slug: 'morpho-yields', label: 'Morpho Yields' },
      { slug: 'aave-usdc-yield', label: 'Aave USDC Yield' },
    ],
  },

  {
    slug: 'morpho-yields',
    title: 'Morpho Yields — Current APY Across All Morpho Vaults',
    description:
      'Live APY rates for all Morpho vaults across USDC, USDT, ETH, and other assets. Morpho vault performance, TVL, and risk data updated daily from onchain sources.',
    h1: 'Morpho Yields',
    apiParams: {
      protocols: ['morpho'],
      minTvl: 100000,
      perPage: 30,
    },
    benchmarkAsset: 'usd',
    intro:
      'Live yield data for all Morpho vaults, updated daily from onchain data. Sorted by 7-day average APY.',
    yieldSource:
      'Morpho generates yield through its lending protocol, which connects lenders and borrowers directly. MetaMorpho vaults automatically allocate deposited capital across multiple Morpho lending markets to optimize yield. The APY you see reflects the blended rate across all markets the vault is deployed in, after Morpho and curator fees. Some vaults also earn additional token rewards.',
    risks:
      'Morpho vaults carry smart contract risk inherent to DeFi, plus curator risk — each MetaMorpho vault is managed by a curator (such as Gauntlet, Steakhouse, or Block Analitica) who sets the allocation strategy. The quality of vault management affects risk exposure. Vaults with higher TVL and established curators generally carry lower operational risk.',
    faq: [
      {
        q: 'What is Morpho?',
        a: 'Morpho is a DeFi lending protocol that enables peer-to-peer lending markets. Morpho Blue is the core protocol: a permissionless lending primitive. MetaMorpho vaults are managed products built on top of Morpho Blue that automatically allocate capital across multiple markets to optimize yield for depositors.',
      },
      {
        q: 'What is the current Morpho APY?',
        a: 'Morpho APY varies by vault and asset. See the live table above for current 7-day APY rates across all Morpho vaults, updated daily.',
      },
      {
        q: 'How does Morpho generate yield for depositors?',
        a: 'Morpho generates yield by lending deposited assets to borrowers at an interest rate. MetaMorpho vaults allocate capital across multiple Morpho markets to find the best available rate. The APY reflects the blended lending rate minus protocol and curator fees.',
      },
      {
        q: 'What is a Morpho curator?',
        a: 'MetaMorpho vault curators are teams that manage the allocation strategy for a vault — deciding which Morpho markets to deploy capital into and at what ratios. Curators include Gauntlet, Steakhouse Financial, Block Analitica, and others. Curator decisions affect both the yield and the risk profile of the vault.',
      },
      {
        q: 'Is Morpho safe?',
        a: 'Morpho is one of the largest lending protocols in DeFi by TVL with multiple security audits. Like all DeFi protocols, it carries smart contract risk. The individual MetaMorpho vault\'s risk profile also depends on which markets it is allocated to and the quality of its curator.',
      },
    ],
    related: [
      { slug: 'best-usdc-yields', label: 'Best USDC Yields' },
      { slug: 'best-stablecoin-yields', label: 'Best Stablecoin Yields' },
      { slug: 'aave-usdc-yield', label: 'Aave USDC Yield' },
    ],
  },

  {
    slug: 'aave-usdc-yield',
    title: 'Aave USDC Yield — Current APY and Lending Rate',
    description:
      'Current Aave USDC APY across Ethereum, Base, Arbitrum, and other networks. Live lending rates updated daily from onchain data.',
    h1: 'Aave USDC Yield',
    apiParams: {
      protocols: ['aave'],
      assets: ['USDC'],
      minTvl: 100000,
      perPage: 20,
    },
    benchmarkAsset: 'usd',
    intro:
      'Live Aave USDC lending rates across all supported networks, updated daily from onchain data. Sorted by 7-day average APY.',
    yieldSource:
      'Aave USDC yield comes from the interest paid by borrowers who use USDC or who borrow USDC against collateral. Aave uses an algorithmic interest rate model: as more of the available USDC is borrowed (higher utilization), the rate increases to attract more lenders and discourage additional borrowing. The supply APY shown is the rate earned by lenders after Aave\'s protocol fee.',
    risks:
      'Aave is one of the most established DeFi protocols, with billions in TVL and a long track record of security. Risks include smart contract vulnerabilities (though Aave has undergone extensive audits), governance risk from Aave DAO decisions, and liquidity risk during market stress. USDC also carries Circle counterparty risk.',
    faq: [
      {
        q: 'What is the current Aave USDC APY?',
        a: 'Aave USDC APY changes continuously based on borrowing demand and utilization. See the live table above for current rates across Ethereum, Base, Arbitrum, and other networks. Data is updated daily.',
      },
      {
        q: 'How does Aave set its USDC lending rate?',
        a: 'Aave uses an algorithmic interest rate model. When utilization (the percentage of deposited USDC currently borrowed) is low, rates are low to attract borrowers. As utilization approaches its target, rates rise steeply to attract more lenders and stabilize the pool. The supply APY is the borrow rate multiplied by utilization, minus Aave\'s protocol fee.',
      },
      {
        q: 'Which Aave network has the highest USDC yield?',
        a: 'Aave USDC rates vary by network depending on local borrowing demand. The live table above shows current rates across all Aave deployments. Rates on newer networks (Base, Scroll) sometimes exceed Ethereum mainnet due to higher relative demand.',
      },
      {
        q: 'How does Aave USDC yield compare to Morpho?',
        a: 'Morpho is built on top of Aave (in its earlier version) and aims to improve on Aave\'s rates by matching lenders and borrowers more efficiently. Morpho often offers slightly higher supply rates than Aave for the same asset, though this varies by market conditions. See our Morpho yields page for a direct comparison.',
      },
      {
        q: 'Is Aave safe for USDC lending?',
        a: 'Aave is one of the most audited and battle-tested DeFi protocols, with billions in TVL and no major exploits since its launch. It remains the gold standard for DeFi lending security. All DeFi carries some level of smart contract risk.',
      },
    ],
    related: [
      { slug: 'best-usdc-yields', label: 'Best USDC Yields' },
      { slug: 'morpho-yields', label: 'Morpho Yields' },
      { slug: 'best-stablecoin-yields', label: 'Best Stablecoin Yields' },
    ],
  },

  {
    slug: 'eth-staking-yield',
    title: 'ETH Staking Yield — Current Rates for Liquid Staking',
    description:
      'Current ETH staking APY for liquid staking protocols including Lido (stETH/wstETH), Rocket Pool (rETH), and DeFi vaults. Live rates updated daily.',
    h1: 'ETH Staking Yield',
    apiParams: {
      assets: ['WETH', 'wstETH', 'stETH', 'rETH', 'ETH'],
      minTvl: 1000000,
      perPage: 20,
    },
    benchmarkAsset: 'eth',
    intro:
      'Live ETH staking and liquid staking yields across DeFi, ranked by 7-day average APY. Covers native ETH vaults, wstETH-based strategies, and liquid staking derivatives.',
    yieldSource:
      'ETH staking yield comes from Ethereum\'s proof-of-stake consensus mechanism, where validators earn rewards for processing transactions and attesting to blocks. The base staking rate is set by the Ethereum protocol and varies based on the total amount of ETH staked. Liquid staking protocols (Lido, Rocket Pool, Frax) pass these rewards to token holders. Some DeFi vaults layer additional strategies on top — lending wstETH to earn additional yield — which can boost returns above the base staking rate.',
    risks:
      'Liquid staking carries smart contract risk in the staking protocol (e.g. Lido, Rocket Pool). wstETH/stETH holds a small depeg risk relative to ETH in low-liquidity scenarios. DeFi vaults using wstETH as collateral carry additional smart contract risk from the lending protocol. Native ETH staking carries slashing risk if the validator misbehaves, though this is managed by liquid staking protocols.',
    faq: [
      {
        q: 'What is the current ETH staking yield?',
        a: 'Native ETH staking currently yields approximately 3–4% APY, set by the Ethereum protocol. Liquid staking protocols (Lido, Rocket Pool) offer similar rates. DeFi vaults that lend wstETH on Morpho or Aave can offer additional yield on top. See the live table above for current rates.',
      },
      {
        q: 'What is the difference between native ETH staking and liquid staking?',
        a: 'Native ETH staking requires exactly 32 ETH and running a validator node. Liquid staking protocols (Lido, Rocket Pool, Frax) accept any amount of ETH and issue a liquid token — stETH, rETH, or sfrxETH — that represents your staked position and can be used in other DeFi protocols while earning rewards.',
      },
      {
        q: 'What is wstETH and how does it earn yield?',
        a: 'wstETH is wrapped stETH — a non-rebasing version of Lido\'s stETH. Unlike stETH (whose balance increases daily with staking rewards), wstETH accumulates value: its exchange rate to ETH increases over time as staking rewards compound. This makes wstETH composable with DeFi protocols that don\'t support rebasing tokens.',
      },
      {
        q: 'Can I earn more than the base ETH staking rate?',
        a: 'Yes. By depositing wstETH into lending protocols like Morpho or Aave, you can earn additional lending yield on top of the base staking rate embedded in wstETH\'s value. Some vaults automate this strategy. See the table above for vaults offering yields above the base staking rate.',
      },
      {
        q: 'What are the risks of ETH liquid staking?',
        a: 'Key risks include: smart contract risk in the liquid staking protocol, slashing risk (managed by the protocol for individual stakers), and depeg risk — the liquid staking token trading below its ETH value in low-liquidity scenarios. Established protocols like Lido have undergone extensive audits and have large insurance funds.',
      },
    ],
    related: [
      { slug: 'btc-defi-yield', label: 'BTC DeFi Yield' },
      { slug: 'best-stablecoin-yields', label: 'Best Stablecoin Yields' },
    ],
  },

  {
    slug: 'btc-defi-yield',
    title: 'BTC DeFi Yield — Earn on WBTC and cbBTC',
    description:
      'Current DeFi yield rates for wrapped Bitcoin: WBTC and cbBTC. Live lending APY across Morpho, Aave, and other protocols, updated daily from onchain data.',
    h1: 'BTC DeFi Yield',
    apiParams: {
      assets: ['WBTC', 'cbBTC', 'tBTC'],
      minTvl: 100000,
      perPage: 20,
    },
    benchmarkAsset: 'eth',
    intro:
      'Live yield rates for wrapped Bitcoin (WBTC, cbBTC, tBTC) across DeFi lending protocols. Updated daily from onchain data.',
    yieldSource:
      'BTC cannot natively participate in Ethereum DeFi. Wrapped Bitcoin tokens (WBTC, cbBTC, tBTC) represent BTC 1:1 on Ethereum and other networks, allowing BTC holders to deposit into lending protocols and earn yield. Yield comes from borrowers who use wrapped BTC as collateral or who borrow it for trading or hedging purposes. BTC borrowing demand is generally lower than stablecoin demand, so BTC yields tend to be lower.',
    risks:
      'BTC DeFi yield carries wrapped token risk: you must trust the custodian or bridge protocol to maintain the 1:1 peg. WBTC is custodied by BitGo; cbBTC by Coinbase; tBTC by Threshold Network (decentralized). If the custodian is compromised or the peg breaks, the wrapped token loses its BTC value. DeFi lending also adds smart contract risk. These are higher-risk yield products compared to stablecoin lending.',
    faq: [
      {
        q: 'How can I earn yield on Bitcoin in DeFi?',
        a: 'Bitcoin can earn yield in DeFi through wrapped versions: WBTC (custodied by BitGo), cbBTC (Coinbase), and tBTC (Threshold Network). These ERC-20 tokens track BTC 1:1 and can be deposited into DeFi lending protocols like Morpho and Aave to earn lending interest.',
      },
      {
        q: 'What is the current BTC DeFi yield?',
        a: 'BTC DeFi yields are typically lower than stablecoin yields — usually 0.5–3% APY — because BTC borrowing demand is lower. See the live table above for current rates.',
      },
      {
        q: 'What is the difference between WBTC and cbBTC?',
        a: 'WBTC (Wrapped Bitcoin) is the original wrapped BTC, launched in 2019 and custodied by BitGo. cbBTC is Coinbase\'s wrapped BTC, launched in 2024. Both track BTC 1:1 and are accepted by major DeFi protocols. cbBTC has grown rapidly in DeFi adoption, particularly on Base network.',
      },
      {
        q: 'Is earning yield on wrapped Bitcoin safe?',
        a: 'Wrapped BTC carries custodian risk (trusting the entity holding the underlying BTC) on top of standard DeFi smart contract risk. This makes it higher risk than stablecoin lending. WBTC and cbBTC are backed by established institutions (BitGo and Coinbase respectively), but any centralized custodian carries counterparty risk.',
      },
      {
        q: 'Why is BTC DeFi yield lower than stablecoin yield?',
        a: 'DeFi lending rates are driven by borrowing demand. Stablecoins are heavily borrowed for leverage and trading, creating high demand that pushes rates up. BTC is borrowed less frequently — primarily for short selling or delta-neutral strategies — resulting in lower utilization and lower yields for lenders.',
      },
    ],
    related: [
      { slug: 'eth-staking-yield', label: 'ETH Staking Yield' },
      { slug: 'best-stablecoin-yields', label: 'Best Stablecoin Yields' },
    ],
  },
]
