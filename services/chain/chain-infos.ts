import { Bech32Address } from '@keplr-wallet/cosmos'
import { AppCurrency } from '@keplr-wallet/types'

import {
  ChainInfoWithExplorer,
  SimplifiedChainInfo,
} from '@/services/chain/types'

export function createKeplrChainInfos(
  chainInfo: SimplifiedChainInfo
): ChainInfoWithExplorer {
  let feeCurrencies: AppCurrency[] = []
  let stakeCurrency: AppCurrency | undefined

  for (const currency of chainInfo.currencies) {
    if (currency.isFeeCurrency) {
      feeCurrencies.push(currency)
    }

    if (currency.isStakeCurrency && stakeCurrency === undefined) {
      stakeCurrency = currency
    } else if (currency.isStakeCurrency) {
      throw new Error(
        `There cannot be more than one stake currency for ${chainInfo.chainName}`
      )
    }
  }

  if (stakeCurrency === undefined) {
    throw new Error(
      `Did not specify a stake currency for ${chainInfo.chainName}`
    )
  }

  if (feeCurrencies.length === 0) {
    throw new Error(
      `Did not specify any fee currencies for ${chainInfo.chainName}`
    )
  }

  return {
    ...chainInfo,
    stakeCurrency,
    feeCurrencies,
  }
}

const chainInfos = (
  [
    {
      rpc: 'https://rpc-osmosis.keplr.app/', // test: "http://rpc-test.osmosis.zone/"
      rest: 'https://lcd-osmosis.keplr.app/', // test: "http://lcd-test.osmosis.zone/"
      chainId: 'osmosis-1', // test: "osmo-test-4"
      chainName: 'Osmosis',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('osmo'),
      currencies: [
        {
          coinDenom: 'OSMO',
          coinMinimalDenom: 'uosmo',
          coinDecimals: 6,
          coinGeckoId: 'osmosis',
          coinImageUrl: '/tokens/osmo.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: 'ION',
          coinMinimalDenom: 'uion',
          coinDecimals: 6,
          coinGeckoId: 'ion',
          coinImageUrl: '/tokens/ion.png',
        },
      ],
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.025,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/osmosis/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-cosmoshub.keplr.app',
      rest: 'https://lcd-cosmoshub.keplr.app',
      chainId: 'cosmoshub-4',
      chainName: 'Cosmos Hub',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('cosmos'),
      currencies: [
        {
          coinDenom: 'ATOM',
          coinMinimalDenom: 'uatom',
          coinDecimals: 6,
          coinGeckoId: 'cosmos',
          coinImageUrl: '/tokens/atom.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/cosmos/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-columbus.keplr.app',
      rest: 'https://lcd-columbus.keplr.app',
      chainId: 'columbus-5',
      chainName: 'Terra Classic',
      bip44: {
        coinType: 330,
      },
      bech32Config: Bech32Address.defaultBech32Config('terra'),
      currencies: [
        {
          coinDenom: 'LUNC',
          coinMinimalDenom: 'uluna',
          coinDecimals: 6,
          coinGeckoId: 'terra-luna',
          coinImageUrl: '/tokens/lunc.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: 'USTC',
          coinMinimalDenom: 'uusd',
          coinDecimals: 6,
          coinGeckoId: 'terrausd',
          coinImageUrl: '/tokens/ustc.png',
          isFeeCurrency: true,
          pegMechanism: 'algorithmic',
        },
        {
          coinDenom: 'KRTC',
          coinMinimalDenom: 'ukrw',
          coinDecimals: 6,
          coinGeckoId: 'terra-krw',
          coinImageUrl: '/tokens/krtc.png',
          pegMechanism: 'algorithmic',
        },
      ],
      gasPriceStep: {
        low: 5.665,
        average: 5.665,
        high: 10,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://finder.terra.money/columbus-5/tx/{txHash}',
    },
    {
      rpc: 'https://rpc-secret.keplr.app',
      rest: 'https://lcd-secret.keplr.app',
      chainId: 'secret-4',
      chainName: 'Secret Network',
      bip44: {
        coinType: 529,
      },
      bech32Config: Bech32Address.defaultBech32Config('secret'),
      currencies: [
        {
          coinDenom: 'SCRT',
          coinMinimalDenom: 'uscrt',
          coinDecimals: 6,
          coinGeckoId: 'secret',
          coinImageUrl: '/tokens/scrt.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx:
        'https://secretnodes.com/secret/chains/secret-4/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc-akash.keplr.app',
      rest: 'https://lcd-akash.keplr.app',
      chainId: 'akashnet-2',
      chainName: 'Akash',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('akash'),
      currencies: [
        {
          coinDenom: 'AKT',
          coinMinimalDenom: 'uakt',
          coinDecimals: 6,
          coinGeckoId: 'akash-network',
          coinImageUrl: '/tokens/akt.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'ibc-go', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/akash/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-regen.keplr.app',
      rest: 'https://lcd-regen.keplr.app',
      chainId: 'regen-1',
      chainName: 'Regen Network',
      bip44: { coinType: 118 },
      bech32Config: Bech32Address.defaultBech32Config('regen'),
      currencies: [
        {
          coinDenom: 'REGEN',
          coinMinimalDenom: 'uregen',
          coinDecimals: 6,
          coinImageUrl: '/tokens/regen.png',
          coinGeckoId: 'regen',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://regen.aneka.io/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-sentinel.keplr.app',
      rest: 'https://lcd-sentinel.keplr.app',
      chainId: 'sentinelhub-2',
      chainName: 'Sentinel',
      bip44: { coinType: 118 },
      bech32Config: Bech32Address.defaultBech32Config('sent'),
      currencies: [
        {
          coinDenom: 'DVPN',
          coinMinimalDenom: 'udvpn',
          coinDecimals: 6,
          coinGeckoId: 'sentinel',
          coinImageUrl: '/tokens/dvpn.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      explorerUrlToTx: 'https://www.mintscan.io/sentinel/txs/{txHash}',
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
    },
    {
      rpc: 'https://rpc-persistence.keplr.app',
      rest: 'https://lcd-persistence.keplr.app',
      chainId: 'core-1',
      chainName: 'Persistence',
      bip44: {
        coinType: 750,
      },
      bech32Config: Bech32Address.defaultBech32Config('persistence'),
      currencies: [
        {
          coinDenom: 'XPRT',
          coinMinimalDenom: 'uxprt',
          coinDecimals: 6,
          coinGeckoId: 'persistence',
          coinImageUrl: '/tokens/xprt.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: 'PSTAKE',
          coinMinimalDenom:
            'ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444',
          coinDecimals: 18,
          coinGeckoId: 'pstake-finance',
          coinImageUrl: '/tokens/pstake.png',
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/persistence/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-iris.keplr.app',
      rest: 'https://lcd-iris.keplr.app',
      chainId: 'irishub-1',
      chainName: 'IRISnet',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('iaa'),
      currencies: [
        {
          coinDenom: 'IRIS',
          coinMinimalDenom: 'uiris',
          coinDecimals: 6,
          coinGeckoId: 'iris-network',
          coinImageUrl: '/tokens/iris.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/iris/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-crypto-org.keplr.app/',
      rest: 'https://lcd-crypto-org.keplr.app/',
      chainId: 'crypto-org-chain-mainnet-1',
      chainName: 'Crypto.org',
      bip44: {
        coinType: 394,
      },
      bech32Config: Bech32Address.defaultBech32Config('cro'),
      currencies: [
        {
          coinDenom: 'CRO',
          coinMinimalDenom: 'basecro',
          coinDecimals: 8,
          coinGeckoId: 'crypto-com-chain',
          coinImageUrl: '/tokens/cro.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/crypto-org/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-iov.keplr.app',
      rest: 'https://lcd-iov.keplr.app',
      chainId: 'iov-mainnet-ibc',
      chainName: 'Starname',
      bip44: {
        coinType: 234,
      },
      bech32Config: Bech32Address.defaultBech32Config('star'),
      currencies: [
        {
          coinDenom: 'IOV',
          coinMinimalDenom: 'uiov',
          coinDecimals: 6,
          coinGeckoId: 'starname',
          coinImageUrl: '/tokens/iov.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer'],
      explorerUrlToTx: 'https://www.mintscan.io/starname/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-emoney.keplr.app',
      rest: 'https://lcd-emoney.keplr.app',
      chainId: 'emoney-3',
      chainName: 'e-Money',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('emoney'),
      currencies: [
        {
          coinDenom: 'NGM',
          coinMinimalDenom: 'ungm',
          coinDecimals: 6,
          coinGeckoId: 'e-money',
          coinImageUrl: '/tokens/ngm.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: 'EEUR',
          coinMinimalDenom: 'eeur',
          coinDecimals: 6,
          coinGeckoId: 'e-money-eur',
          coinImageUrl: '/tokens/eeur.png',
        },
      ],
      gasPriceStep: {
        low: 1,
        average: 1,
        high: 1,
      },
      features: ['stargate', 'ibc-transfer'],
      explorerUrlToTx: 'https://emoney.bigdipper.live/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc-juno.keplr.app',
      rest: 'https://lcd-juno.keplr.app',
      chainId: 'juno-1',
      chainName: 'Juno',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('juno'),
      currencies: [
        {
          coinDenom: 'JUNO',
          coinMinimalDenom: 'ujuno',
          coinDecimals: 6,
          coinGeckoId: 'juno-network',
          coinImageUrl: '/tokens/juno.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          type: 'cw20',
          contractAddress:
            'juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
          coinDenom: 'NETA',
          coinMinimalDenom:
            'cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr:NETA',
          coinDecimals: 6,
          coinGeckoId: 'neta',
          coinImageUrl: '/tokens/neta.svg',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
          coinDenom: 'MARBLE',
          coinMinimalDenom:
            'cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl:MARBLE',
          coinDecimals: 3,
          coinGeckoId: 'pool:marble',
          coinImageUrl: '/tokens/marble.svg',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z',
          coinDenom: 'HOPE',
          coinMinimalDenom:
            'cw20:juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z:HOPE',
          coinDecimals: 6,
          coinGeckoId: 'pool:hope',
          coinImageUrl: '/tokens/hope.svg',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa',
          coinDenom: 'RAC',
          coinMinimalDenom:
            'cw20:juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa:RAC',
          coinDecimals: 6,
          coinGeckoId: 'pool:rac',
          coinImageUrl: '/tokens/rac.svg',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq',
          coinDenom: 'BLOCK',
          coinMinimalDenom:
            'cw20:juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq:BLOCK',
          coinDecimals: 6,
          coinGeckoId: 'pool:block',
          coinImageUrl: '/tokens/block.svg',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49',
          coinDenom: 'DHK',
          coinMinimalDenom:
            'cw20:juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49:DHK',
          coinDecimals: 0,
          coinGeckoId: 'pool:dhk',
          coinImageUrl: '/tokens/dhk.svg',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g',
          coinDenom: 'RAW',
          coinMinimalDenom:
            'cw20:juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g:RAW',
          coinDecimals: 6,
          coinGeckoId: 'pool:raw',
          coinImageUrl: '/tokens/raw.png',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w',
          coinDenom: 'ASVT',
          coinMinimalDenom:
            'cw20:juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w:ASVT',
          coinDecimals: 6,
          coinGeckoId: 'pool:asvt',
          coinImageUrl: '/tokens/asvt.png',
        },
        {
          type: 'cw20',
          contractAddress:
            'juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3',
          coinDenom: 'JOE',
          coinMinimalDenom:
            'cw20:juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3:JOE',
          coinDecimals: 6,
          coinGeckoId: 'pool:joe',
          coinImageUrl: '/tokens/joe.png',
        },
      ],
      features: [
        'stargate',
        'ibc-transfer',
        'ibc-go',
        'no-legacy-stdTx',
        'wasmd_0.24+',
        'cosmwasm',
      ],
      explorerUrlToTx: 'https://www.mintscan.io/juno/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-microtick.keplr.app',
      rest: 'https://lcd-microtick.keplr.app',
      chainId: 'microtick-1',
      chainName: 'Microtick',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('micro'),
      currencies: [
        {
          coinDenom: 'TICK',
          coinMinimalDenom: 'utick',
          coinDecimals: 6,
          coinGeckoId: 'pool:utick',
          coinImageUrl: '/tokens/tick.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer'],
      explorerUrlToTx: 'https://explorer.microtick.zone/transactions/{txHash}',
    },
    {
      rpc: 'https://mainnet-node.like.co/rpc',
      rest: 'https://mainnet-node.like.co',
      chainId: 'likecoin-mainnet-2',
      chainName: 'LikeCoin',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('like'),
      currencies: [
        {
          coinDenom: 'LIKE',
          coinMinimalDenom: 'nanolike',
          coinDecimals: 9,
          coinGeckoId: 'likecoin',
          coinImageUrl: '/tokens/like.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://likecoin.bigdipper.live/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc-impacthub.keplr.app',
      rest: 'https://lcd-impacthub.keplr.app',
      chainId: 'impacthub-3',
      chainName: 'IXO',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('ixo'),
      currencies: [
        {
          coinDenom: 'IXO',
          coinMinimalDenom: 'uixo',
          coinDecimals: 6,
          coinGeckoId: 'pool:uixo',
          coinImageUrl: '/tokens/ixo.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer'],
      explorerUrlToTx: 'https://blockscan.ixo.world/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc.bitcanna.io',
      rest: 'https://lcd.bitcanna.io',
      chainId: 'bitcanna-1',
      chainName: 'BitCanna',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('bcna'),
      currencies: [
        {
          coinDenom: 'BCNA',
          coinMinimalDenom: 'ubcna',
          coinDecimals: 6,
          coinGeckoId: 'bitcanna',
          coinImageUrl: '/tokens/bcna.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/bitcanna/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.explorebitsong.com',
      rest: 'https://lcd.explorebitsong.com',
      chainId: 'bitsong-2b',
      chainName: 'BitSong',
      bip44: {
        coinType: 639,
      },
      bech32Config: Bech32Address.defaultBech32Config('bitsong'),
      currencies: [
        {
          coinDenom: 'BTSG',
          coinMinimalDenom: 'ubtsg',
          coinDecimals: 6,
          coinGeckoId: 'pool:ubtsg',
          coinImageUrl: '/tokens/btsg.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://explorebitsong.com/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc-mainnet.blockchain.ki',
      rest: 'https://api-mainnet.blockchain.ki',
      chainId: 'kichain-2',
      chainName: 'Ki',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('ki'),
      currencies: [
        {
          coinDenom: 'XKI',
          coinMinimalDenom: 'uxki',
          coinDecimals: 6,
          coinGeckoId: 'pool:uxki',
          coinImageUrl: '/tokens/xki.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.05,
      },
      features: [
        'stargate',
        'ibc-transfer',
        'ibc-go',
        'wasmd_0.24+',
        'cosmwasm',
      ],
      explorerUrlToTx: 'https://www.mintscan.io/ki-chain/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.gopanacea.org',
      rest: 'https://api.gopanacea.org',
      chainId: 'panacea-3',
      chainName: 'MediBloc',
      bip44: {
        coinType: 371,
      },
      bech32Config: Bech32Address.defaultBech32Config('panacea'),
      currencies: [
        {
          coinDenom: 'MED',
          coinMinimalDenom: 'umed',
          coinDecimals: 6,
          coinGeckoId: 'medibloc',
          coinImageUrl: '/tokens/med.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 5,
        average: 7,
        high: 9,
      },
      features: ['stargate', 'ibc-transfer'],
      explorerUrlToTx: 'https://www.mintscan.io/medibloc/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.bostrom.cybernode.ai',
      rest: 'https://lcd.bostrom.cybernode.ai',
      chainId: 'bostrom',
      chainName: 'Bostrom',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('bostrom'),
      currencies: [
        {
          coinDenom: 'BOOT',
          coinMinimalDenom: 'boot',
          coinDecimals: 0,
          coinGeckoId: 'bostrom',
          coinImageUrl: '/tokens/boot.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://cyb.ai/network/bostrom/tx/{txHash}',
    },
    {
      rpc: 'https://rpc.comdex.one',
      rest: 'https://rest.comdex.one',
      chainId: 'comdex-1',
      chainName: 'Comdex',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('comdex'),
      currencies: [
        {
          coinDenom: 'CMDX',
          coinMinimalDenom: 'ucmdx',
          coinDecimals: 6,
          coinGeckoId: 'comdex',
          coinImageUrl: '/tokens/cmdx.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/comdex/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.cheqd.net',
      rest: 'https://api.cheqd.net',
      chainId: 'cheqd-mainnet-1',
      chainName: 'cheqd',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('cheqd'),
      currencies: [
        {
          coinDenom: 'CHEQ',
          coinMinimalDenom: 'ncheq',
          coinDecimals: 9,
          coinGeckoId: 'cheqd-network',
          coinImageUrl: '/tokens/cheq.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 25,
        average: 50,
        high: 100,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://explorer.cheqd.io/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc.stargaze-apis.com',
      rest: 'https://rest.stargaze-apis.com',
      chainId: 'stargaze-1',
      chainName: 'Stargaze',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('stars'),
      currencies: [
        {
          coinDenom: 'STARS',
          coinMinimalDenom: 'ustars',
          coinDecimals: 6,
          coinGeckoId: 'pool:ustars',
          coinImageUrl: '/tokens/stars.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/stargaze/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.chihuahua.wtf',
      rest: 'https://api.chihuahua.wtf',
      chainId: 'chihuahua-1',
      chainName: 'Chihuahua',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('chihuahua'),
      currencies: [
        {
          coinDenom: 'HUAHUA',
          coinMinimalDenom: 'uhuahua',
          coinDecimals: 6,
          coinGeckoId: 'pool:uhuahua',
          coinImageUrl: '/tokens/huahua.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://ping.pub/chihuahua/tx/{txHash}',
    },
    {
      rpc: 'https://node0.mainnet.lum.network/rpc',
      rest: 'https://node0.mainnet.lum.network/rest',
      chainId: 'lum-network-1',
      chainName: 'Lum Network',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('lum'),
      currencies: [
        {
          coinDenom: 'LUM',
          coinMinimalDenom: 'ulum',
          coinDecimals: 6,
          coinGeckoId: 'pool:ulum',
          coinImageUrl: '/tokens/lum.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/lum/txs/{txHash}',
    },
    {
      rpc: 'https://mainnet-rpc.vidulum.app',
      rest: 'https://mainnet-lcd.vidulum.app',
      chainId: 'vidulum-1',
      chainName: 'Vidulum',
      bip44: {
        coinType: 370,
      },
      bech32Config: Bech32Address.defaultBech32Config('vdl'),
      currencies: [
        {
          coinDenom: 'VDL',
          coinMinimalDenom: 'uvdl',
          coinDecimals: 6,
          coinGeckoId: 'vidulum',
          coinImageUrl: '/tokens/vdl.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://explorers.vidulum.app/vidulum/tx/{txHash}',
    },
    {
      rpc: 'https://rpc.mainnet.desmos.network',
      rest: 'https://api.mainnet.desmos.network',
      chainId: 'desmos-mainnet',
      chainName: 'Desmos',
      bip44: {
        coinType: 852,
      },
      bech32Config: Bech32Address.defaultBech32Config('desmos'),
      currencies: [
        {
          coinDenom: 'DSM',
          coinMinimalDenom: 'udsm',
          coinDecimals: 6,
          coinGeckoId: 'pool:udsm',
          coinImageUrl: '/tokens/dsm.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://explorer.desmos.network/transactions/{txHash}',
    },
    {
      rpc: 'https://rpc-1-dig.notional.ventures',
      rest: 'https://api-1-dig.notional.ventures',
      chainId: 'dig-1',
      chainName: 'Dig',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('dig'),
      currencies: [
        {
          coinDenom: 'DIG',
          coinMinimalDenom: 'udig',
          coinDecimals: 6,
          coinGeckoId: 'pool:udig',
          coinImageUrl: '/tokens/dig.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://ping.pub/dig/tx/{txHash}',
    },
    {
      rpc: 'https://rpc-sommelier.keplr.app',
      rest: 'https://lcd-sommelier.keplr.app',
      chainId: 'sommelier-3',
      chainName: 'Sommelier',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('somm'),
      currencies: [
        {
          coinDenom: 'SOMM',
          coinMinimalDenom: 'usomm',
          coinDecimals: 6,
          coinGeckoId: 'pool:usomm',
          coinImageUrl: '/tokens/somm.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://sommscan.io',
    },
    {
      rpc: 'https://rpc.sifchain.finance',
      rest: 'https://api-int.sifchain.finance',
      chainId: 'sifchain-1',
      chainName: 'Sifchain',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('sif'),
      currencies: [
        {
          coinDenom: 'ROWAN',
          coinMinimalDenom: 'rowan',
          coinDecimals: 18,
          coinGeckoId: 'sifchain',
          coinImageUrl: '/tokens/rowan.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer'],
      explorerUrlToTx: 'https://www.mintscan.io/sifchain/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.laozi3.bandchain.org',
      rest: 'https://laozi1.bandchain.org/api',
      chainId: 'laozi-mainnet',
      chainName: 'BandChain',
      bip44: {
        coinType: 494,
      },
      bech32Config: Bech32Address.defaultBech32Config('band'),
      currencies: [
        {
          coinDenom: 'BAND',
          coinMinimalDenom: 'uband',
          coinDecimals: 6,
          coinGeckoId: 'band-protocol',
          coinImageUrl: '/tokens/band.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://cosmoscan.io/tx/{txHash}',
    },
    {
      rpc: 'https://node1.konstellation.tech:26657',
      rest: 'https://node1.konstellation.tech:1318',
      chainId: 'darchub',
      chainName: 'Konstellation',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('darc'),
      currencies: [
        {
          coinDenom: 'DARC',
          coinMinimalDenom: 'udarc',
          coinDecimals: 6,
          coinGeckoId: 'pool:udarc',
          coinImageUrl: '/tokens/darc.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/konstellation/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.aphrodite.main.network.umee.cc',
      rest: 'https://api.aphrodite.main.network.umee.cc',
      chainId: 'umee-1',
      chainName: 'Umee',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('umee'),
      currencies: [
        {
          coinDenom: 'UMEE',
          coinMinimalDenom: 'uumee',
          coinDecimals: 6,
          coinGeckoId: 'pool:uumee',
          coinImageUrl: '/tokens/umee.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://www.mintscan.io/umee/txs/{txHash}',
    },
    {
      rpc: 'https://gravitychain.io:26657',
      rest: 'https://gravitychain.io:1317',
      chainId: 'gravity-bridge-3',
      chainName: 'Gravity Bridge',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('gravity'),
      currencies: [
        {
          coinDenom: 'GRAV',
          coinMinimalDenom: 'ugraviton',
          coinDecimals: 6,
          coinGeckoId: 'pool:ugraviton',
          coinImageUrl: '/tokens/grav.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: 'PSTAKE',
          coinMinimalDenom: 'gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006',
          coinDecimals: 18,
          coinGeckoId: 'pstake-finance',
          coinImageUrl: '/tokens/pstake.png',
        },
        {
          coinDenom: 'WBTC.grv',
          coinMinimalDenom: 'gravity0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          coinDecimals: 8,
          coinGeckoId: 'wrapped-bitcoin',
          coinImageUrl: '/tokens/gwbtc.png',
        },
        {
          coinDenom: 'WETH.grv',
          coinMinimalDenom: 'gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          coinDecimals: 18,
          coinGeckoId: 'ethereum',
          coinImageUrl: '/tokens/gweth.png',
        },
        {
          coinDenom: 'USDC.grv',
          coinMinimalDenom: 'gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          coinDecimals: 6,
          coinGeckoId: 'usd-coin',
          coinImageUrl: '/tokens/gusdc.png',
          pegMechanism: 'collateralized',
        },
        {
          coinDenom: 'DAI.grv',
          coinMinimalDenom: 'gravity0x6B175474E89094C44Da98b954EedeAC495271d0F',
          coinDecimals: 18,
          coinGeckoId: 'dai',
          coinImageUrl: '/tokens/gdai.png',
          pegMechanism: 'collateralized',
        },
        {
          coinDenom: 'USDT.grv',
          coinMinimalDenom: 'gravity0xdAC17F958D2ee523a2206206994597C13D831ec7',
          coinDecimals: 6,
          coinGeckoId: 'tether',
          coinImageUrl: '/tokens/gusdt.png',
          pegMechanism: 'collateralized',
        },
      ],
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/gravity-bridge/txs/{txHash}',
    },
    {
      rpc: 'https://poseidon.mainnet.decentr.xyz',
      rest: 'https://rest.mainnet.decentr.xyz',
      chainId: 'mainnet-3',
      chainName: 'Decentr',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('decentr'),
      currencies: [
        {
          coinDenom: 'DEC',
          coinMinimalDenom: 'udec',
          coinDecimals: 6,
          coinGeckoId: 'decentr',
          coinImageUrl: '/tokens/dec.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx:
        'https://explorer.decentr.net/transactions/{txHash}?networkId=mainnet',
    },
    {
      rpc: 'https://shenturpc.certikpowered.info',
      rest: 'https://azuredragon.noopsbycertik.com',
      chainId: 'shentu-2.2',
      chainName: 'Certik',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('certik'),
      currencies: [
        {
          coinDenom: 'CTK',
          coinMinimalDenom: 'uctk',
          coinDecimals: 6,
          coinGeckoId: 'certik',
          coinImageUrl: '/tokens/ctk.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/certik/txs/{txHash}',
    },
    {
      rpc: 'https://tm-api.carbon.network',
      rest: 'https://api.carbon.network',
      chainId: 'carbon-1',
      chainName: 'Carbon',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('swth'),
      currencies: [
        {
          coinDenom: 'SWTH',
          coinMinimalDenom: 'swth',
          coinDecimals: 8,
          coinGeckoId: 'switcheo',
          coinImageUrl: '/tokens/swth.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 769.23077,
        average: 769.23077,
        high: 769.23077,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx:
        'https://scan.carbon.network/transaction/{txHash}?net=main',
    },
    {
      rpc: 'https://public.api.injective.network',
      rest: 'https://public.lcd.injective.network',
      chainId: 'injective-1',
      chainName: 'Injective',
      bip44: {
        coinType: 60,
      },
      bech32Config: Bech32Address.defaultBech32Config('inj'),
      currencies: [
        {
          coinDenom: 'INJ',
          coinMinimalDenom: 'inj',
          coinDecimals: 18,
          coinGeckoId: 'injective-protocol',
          coinImageUrl: '/tokens/inj.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.0005,
        average: 0.0007,
        high: 0.0009,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx:
        'https://explorer.injective.network/transaction/{txHash}',
    },
    {
      rpc: 'https://rpc.cerberus.zone:26657',
      rest: 'https://api.cerberus.zone:1317',
      chainId: 'cerberus-chain-1',
      chainName: 'Cerberus',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('cerberus'),
      currencies: [
        {
          coinDenom: 'CRBRUS',
          coinMinimalDenom: 'ucrbrus',
          coinDecimals: 6,
          coinGeckoId: 'cerberus-2',
          coinImageUrl: '/tokens/crbrus.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://skynetexplorers.com/Cerberus/tx/{txHash}',
    },
    {
      rpc: 'https://rpc-fetchhub.fetch.ai:443',
      rest: 'https://rest-fetchhub.fetch.ai',
      chainId: 'fetchhub-4',
      chainName: 'Fetch.ai',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('fetch'),
      currencies: [
        {
          coinDenom: 'FET',
          coinMinimalDenom: 'afet',
          coinDecimals: 18,
          coinGeckoId: 'fetch-ai',
          coinImageUrl: '/tokens/fet.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/fetchai/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.assetmantle.one/',
      rest: 'https://rest.assetmantle.one/',
      chainId: 'mantle-1',
      chainName: 'AssetMantle',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('mantle'),
      currencies: [
        {
          coinDenom: 'MNTL',
          coinMinimalDenom: 'umntl',
          coinDecimals: 6,
          coinGeckoId: 'pool:umntl',
          coinImageUrl: '/tokens/mntl.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/asset-mantle/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.provenance.io/',
      rest: 'https://api.provenance.io',
      chainId: 'pio-mainnet-1',
      chainName: 'Provenance',
      bip44: {
        coinType: 505,
      },
      bech32Config: Bech32Address.defaultBech32Config('pb'),
      currencies: [
        {
          coinDenom: 'HASH',
          coinMinimalDenom: 'nhash',
          coinGeckoId: 'provenance-blockchain',
          coinDecimals: 9,
          coinImageUrl: '/tokens/hash.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 1905,
        average: 2100,
        high: 2500,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/provenance/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.galaxychain.zone',
      rest: 'https://rest.galaxychain.zone',
      chainId: 'galaxy-1',
      chainName: 'Galaxy',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('galaxy'),
      currencies: [
        {
          coinDenom: 'GLX',
          coinMinimalDenom: 'uglx',
          coinDecimals: 6,
          coinGeckoId: 'pool:uglx',
          coinImageUrl: '/tokens/glx.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://explorer.postcapitalist.io/galaxy/tx/{txHash}',
    },
    {
      rpc: 'https://rpc-meme-1.meme.sx:443',
      rest: 'https://api-meme-1.meme.sx:443',
      chainId: 'meme-1',
      chainName: 'Meme',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('meme'),
      currencies: [
        {
          coinDenom: 'MEME',
          coinMinimalDenom: 'umeme',
          coinDecimals: 6,
          coinGeckoId: 'pool:umeme',
          coinImageUrl: '/tokens/meme.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://explorer.meme.sx/meme/tx/{txHash}',
    },
    {
      rpc: 'https://rpc-evmos.keplr.app/',
      rest: 'https://lcd-evmos.keplr.app/',
      chainId: 'evmos_9001-2',
      chainName: 'Evmos',
      bip44: {
        coinType: 60,
      },
      bech32Config: Bech32Address.defaultBech32Config('evmos'),
      currencies: [
        {
          coinDenom: 'EVMOS',
          coinMinimalDenom: 'aevmos',
          coinDecimals: 18,
          coinGeckoId: 'evmos',
          coinImageUrl: '/tokens/evmos.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 10000000000,
        average: 25000000000,
        high: 40000000000,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/evmos/txs/{txHash}',
    },
    {
      rpc: 'https://rpc.terrav2.ccvalidators.com/',
      rest: 'https://phoenix-lcd.terra.dev/',
      chainId: 'phoenix-1',
      chainName: 'Terra 2.0',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('terra'),
      currencies: [
        {
          coinDenom: 'LUNA',
          coinMinimalDenom: 'uluna',
          coinDecimals: 6,
          coinGeckoId: 'terra-luna-2',
          coinImageUrl: '/tokens/luna.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.15,
        average: 0.2,
        high: 0.25,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
      explorerUrlToTx: 'https://finder.terra.money/phoenix-1/tx/{txHash}',
    },
    {
      rpc: 'https://rpcapi.rizon.world/',
      rest: 'https://restapi.rizon.world/',
      chainId: 'titan-1',
      chainName: 'Rizon',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('rizon'),
      currencies: [
        {
          coinDenom: 'ATOLO',
          coinMinimalDenom: 'uatolo',
          coinDecimals: 6,
          coinGeckoId: 'rizon',
          coinImageUrl: '/tokens/atolo.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/rizon/txs/{txHash}',
    },
    {
      rpc: 'https://rpc-kava.keplr.app',
      rest: 'https://lcd-kava.keplr.app',
      chainId: 'kava_2222-10',
      chainName: 'Kava',
      bip44: {
        coinType: 459,
      },
      bech32Config: Bech32Address.defaultBech32Config('kava'),
      currencies: [
        {
          coinDenom: 'KAVA',
          coinMinimalDenom: 'ukava',
          coinDecimals: 6,
          coinGeckoId: 'kava',
          coinImageUrl: '/tokens/kava.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: 'HARD',
          coinMinimalDenom: 'hard',
          coinDecimals: 6,
          coinGeckoId: 'kava-lend',
          coinImageUrl: '/tokens/hard.svg',
        },
        {
          coinDenom: 'SWP',
          coinMinimalDenom: 'swp',
          coinDecimals: 6,
          coinGeckoId: 'kava-swap',
          coinImageUrl: '/tokens/swp.svg',
        },
      ],
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://www.mintscan.io/kava/txs/{txHash}',
    },
    {
      rpc: 'https://26657.genesisl1.org',
      rest: 'https://api.genesisl1.org',
      chainId: 'genesis_29-2',
      chainName: 'GenesisL1',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('genesis'),
      currencies: [
        {
          coinDenom: 'L1',
          coinMinimalDenom: 'el1',
          coinDecimals: 18,
          //coinGeckoId: "pool:el1",
          coinImageUrl: '/tokens/l1.svg',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 999999999,
        average: 1000000000,
        high: 1000000001,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://ping.pub/genesisL1/tx/{txHash}',
    },
    {
      rpc: 'https://rpc.kaiyo.kujira.setten.io',
      rest: 'https://lcd.kaiyo.kujira.setten.io',
      chainId: 'kaiyo-1',
      chainName: 'Kujira',
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config('kujira'),
      currencies: [
        {
          coinDenom: 'KUJI',
          coinMinimalDenom: 'ukuji',
          coinDecimals: 6,
          coinImageUrl: '/tokens/kuji.png',
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
      features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
      explorerUrlToTx: 'https://finder.kujira.app/kaiyo-1/tx/{txHash}',
    },
  ] as SimplifiedChainInfo[]
).map(createKeplrChainInfos)

// Add normal chain infos in case of `currencies` not containing the stake or fee currency.
chainInfos.push({
  rpc: 'https://rpc-axelar.keplr.app',
  rest: 'https://lcd-axelar.keplr.app',
  chainId: 'axelar-dojo-1',
  chainName: 'Axelar',
  stakeCurrency: {
    coinDenom: 'AXL',
    coinMinimalDenom: 'uaxl',
    coinDecimals: 6,
    // coinGeckoId: 'pool:uaxl',
    coinImageUrl: '/tokens/axl.svg',
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('axelar'),
  currencies: [
    {
      coinDenom: 'USDC',
      coinMinimalDenom: 'uusdc',
      coinDecimals: 6,
      coinGeckoId: 'usd-coin',
      coinImageUrl: '/tokens/usdc.svg',
      pegMechanism: 'collateralized',
    },
    {
      coinDenom: 'FRAX',
      coinMinimalDenom: 'frax-wei',
      coinDecimals: 18,
      coinGeckoId: 'frax',
      coinImageUrl: '/tokens/frax.svg',
      pegMechanism: 'hybrid',
    },
    {
      coinDenom: 'USDT',
      coinMinimalDenom: 'uusdt',
      coinDecimals: 6,
      coinGeckoId: 'tether',
      coinImageUrl: '/tokens/usdt.svg',
      pegMechanism: 'collateralized',
    },
    {
      coinDenom: 'DAI',
      coinMinimalDenom: 'dai-wei',
      coinDecimals: 18,
      coinGeckoId: 'dai',
      coinImageUrl: '/tokens/dai.svg',
      pegMechanism: 'collateralized',
    },
    {
      coinDenom: 'WETH',
      coinMinimalDenom: 'weth-wei',
      coinDecimals: 18,
      coinGeckoId: 'weth',
      coinImageUrl: '/tokens/weth.png',
    },
    {
      coinDenom: 'WBTC',
      coinMinimalDenom: 'wbtc-satoshi',
      coinDecimals: 8,
      coinGeckoId: 'wrapped-bitcoin',
      coinImageUrl: '/tokens/wbtc.png',
    },
    {
      coinDenom: 'LINK',
      coinMinimalDenom: 'link-wei',
      coinDecimals: 18,
      coinGeckoId: 'chainlink',
      coinImageUrl: '/tokens/link.svg',
    },
    {
      coinDenom: 'AAVE',
      coinMinimalDenom: 'aave-wei',
      coinDecimals: 18,
      coinGeckoId: 'aave',
      coinImageUrl: '/tokens/aave.svg',
    },
    {
      coinDenom: 'APE',
      coinMinimalDenom: 'ape-wei',
      coinDecimals: 18,
      coinGeckoId: 'apecoin',
      coinImageUrl: '/tokens/ape.svg',
    },
    {
      coinDenom: 'AXS',
      coinMinimalDenom: 'axs-wei',
      coinDecimals: 18,
      coinGeckoId: 'axie-infinity',
      coinImageUrl: '/tokens/axs.svg',
    },
    {
      coinDenom: 'MKR',
      coinMinimalDenom: 'mkr-wei',
      coinDecimals: 18,
      coinGeckoId: 'maker',
      coinImageUrl: '/tokens/mkr.svg',
    },
    {
      coinDenom: 'RAI',
      coinMinimalDenom: 'rai-wei',
      coinDecimals: 18,
      coinGeckoId: 'rai',
      coinImageUrl: '/tokens/rai.svg',
    },
    {
      coinDenom: 'SHIB',
      coinMinimalDenom: 'shib-wei',
      coinDecimals: 18,
      coinGeckoId: 'shiba-inu',
      coinImageUrl: '/tokens/shib.svg',
    },
    {
      coinDenom: 'stETH',
      coinMinimalDenom: 'steth-wei',
      coinDecimals: 18,
      coinGeckoId: 'staked-ether',
      coinImageUrl: '/tokens/steth.svg',
    },
    {
      coinDenom: 'UNI',
      coinMinimalDenom: 'uni-wei',
      coinDecimals: 18,
      coinGeckoId: 'uniswap',
      coinImageUrl: '/tokens/uni.svg',
    },
    {
      coinDenom: 'XCN',
      coinMinimalDenom: 'xcn-wei',
      coinDecimals: 18,
      coinGeckoId: 'chain-2',
      coinImageUrl: '/tokens/xcn.svg',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'AXL',
      coinMinimalDenom: 'uaxl',
      coinDecimals: 6,
      // coinGeckoId: 'pool:uaxl',
      coinImageUrl: '/tokens/axl.svg',
    },
  ],
  gasPriceStep: {
    low: 0.00005,
    average: 0.00007,
    high: 0.00009,
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
  explorerUrlToTx: 'https://axelarscan.io/tx/{txHash}',
})

export const ChainInfos: ChainInfoWithExplorer[] = chainInfos
