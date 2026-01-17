import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";

export default function MyConnectButton() {
  const { address } = useAccount();

  // ENS name (mainnet only)
  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });

  // ENS avatar (depends on ENS name)
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: 1,
    enabled: !!ensName,
  });

 

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        openChainModal,
        mounted,
      }) => {
        // 🔒 SSR safety
        if (!mounted) return null;

        // ❌ Wallet connected nahi
        if (!account || !chain) {
          return (
            <button
              onClick={openConnectModal}
              className="bg-gradient-to-t from-[#d08700] to-[#fdca10]
                         p-2 rounded-xl mt-4 w-[400px]
                         font-bold text-black"
            >
              Connect Wallet To Sent ETH.
            </button>
          );
        }
         

        // ❌ Wrong network
        if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="bg-red-500 text-white p-2 rounded-xl mt-4 w-[400px]"
            >
              Wrong Network
            </button>
          );
        }

        // ✅ Wallet connected


        
        return (

          <button
            onClick={openAccountModal}
            className="bg-green-500 text-white p-2 rounded-xl mt-4 w-[400px] flex gap-4"
          >
            
         {/*    {ensAvatar ? (
        <img
          src={ensAvatar}
          alt="ENS Avatar"
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
          🦊
        </div>
      )} */}
            
            {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            
                          />
                        )} {account.address.slice(0, 10)}...{account.address.slice(-4)}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
