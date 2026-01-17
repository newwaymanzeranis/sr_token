import { defineChain } from "viem";

export const zkSyncSepolia = defineChain({
  id: 300,
  name: "zkSync Sepolia",
  network: "zksync-sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.era.zksync.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "zkSync Explorer",
      url: "https://sepolia.explorer.zksync.io",
    },
  },
});
