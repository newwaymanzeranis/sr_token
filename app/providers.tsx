import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, getDefaultConfig, darkTheme, lightTheme  } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/* import { sepolia } from "wagmi/chains"; */
import { zkSyncSepolia } from "./chains";

/* const config = getDefaultConfig({
  appName: "wagmi app",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
  ssr: false,
}); */
export const config = getDefaultConfig({
  appName: "ETH Sender",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [zkSyncSepolia],
  ssr: false,
});


const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
