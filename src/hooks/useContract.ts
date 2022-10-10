import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
// import UniswapInterfaceMulticallJson from '@uniswap/v3-periphery/contracts/'
// import UniswapInterfaceMulticallJson from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
import {
  MULTICALL_ADDRESS,
} from '@/constants/addresses'
import { useMemo } from 'react'
// import {  UniswapInterfaceMulticall } from '@/types/v3'

import { getContract } from '../utils'


// const { abi: MulticallABI } = UniswapInterfaceMulticallJson

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

// export function useV2MigratorContract() {
//   return useContract<V3Migrator>(V3_MIGRATOR_ADDRESSES, V2MigratorABI, true)
// }

// export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
//   return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
// }

// export function useWETHContract(withSignerIfPossible?: boolean) {
//   const { chainId } = useWeb3React()
//   return useContract<Weth>(
//     chainId ? WRAPPED_NATIVE_CURRENCY[chainId]?.address : undefined,
//     WETH_ABI,
//     withSignerIfPossible
//   )
// }

// export function useERC721Contract(nftAddress?: string) {
//   return useContract<Erc721>(nftAddress, ERC721_ABI, false)
// }

// export function useERC1155Contract(nftAddress?: string) {
//   return useContract<Erc1155>(nftAddress, ERC1155_ABI, false)
// }

// export function useArgentWalletDetectorContract() {
//   return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
// }

// export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
//   return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
// }

// export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
//   return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
// }

// export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
// }

// export function useEIP2612Contract(tokenAddress?: string): Contract | null {
//   return useContract(tokenAddress, EIP_2612, false)
// }

// export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
//   return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
// }

// export function useV2RouterContract(): Contract | null {
//   return useContract(V2_ROUTER_ADDRESS, IUniswapV2Router02ABI, true)
// }

// export function useInterfaceMulticall() {
//   return useContract<UniswapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI, false) as UniswapInterfaceMulticall
// }

// export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
//   return useContract<NonfungiblePositionManager>(
//     NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
//     NFTPositionManagerABI,
//     withSignerIfPossible
//   )
// }

// export function useQuoter(useQuoterV2: boolean) {
//   return useContract<Quoter | QuoterV2>(QUOTER_ADDRESSES, useQuoterV2 ? QuoterV2ABI : QuoterABI)
// }

// export function useTickLens(): TickLens | null {
//   const { chainId } = useWeb3React()
//   const address = chainId ? TICK_LENS_ADDRESSES[chainId] : undefined
//   return useContract(address, TickLensABI) as TickLens | null
// }
