import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function WalletInfo() {
  // ✅ hooks ALWAYS on top
  const { address, isConnected } = useAccount();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ condition AFTER hooks
  if (!mounted) return null;

  return (
    <div>
      {isConnected ? (
        <p>Connected wallet: {address}</p>
      ) : (
        <p>Please connect wallet</p>
      )}
    </div>
  );
}
