import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MyConnectButton from "../components/rainbow/MyConnectButton";
import { shortAddress } from "../components/utils/shortAddress";
import {useSendTransaction} from "wagmi"
import { parseEther, formatEther } from "viem";
import type { SendTransactionResult } from "wagmi/actions"

import { sendEthSchema } from "../.schema";
import { form } from "viem/chains";
import { useWaitForTransactionReceipt } from "wagmi";


export function Welcome() {
  const [mounted, setMounted] = useState(false);
  const [ethAmount, setEthAmount] = useState(parseEther(".001"));
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [formErrors, setFormErrors] = useState<string | null>(null);

/*   const {
    sendTransaction,
    isLoading: txIsLoading,
    isSuccess: txIsSuccess,
    error: txError,
    data: txData,
  } = useSendTransaction(); */

  const {
    sendTransaction,
    data: hash, // This is the transaction hash
    isPending: txIsLoading, // 'isLoading' is usually 'isPending' in newer wagmi versions
    isSuccess: txIsSent,
    error: txError,
  } = useSendTransaction();
  // 2. Receipt Hook (MUST be at top level)
  const { data: receipt, isLoading: isWaitingForReceipt } = useWaitForTransactionReceipt({
    hash, // Pass the hash from useSendTransaction
    confirmations: 1, // 1 block confirm
  });

  const gasFee =
  receipt
    ? formatEther(receipt.gasUsed * receipt.effectiveGasPrice)
    : null;

 
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const values = {
    to: formData.get("toAddress") as string, 
  };
 
  const result = sendEthSchema.safeParse(values);
  if (!result.success) {
   // console.log(result.error.issues[0].message);
    setFormErrors(result.error.issues[0].message);
    return;
  }
  

  sendTransaction({
      to: result.data.to,
      value: ethAmount,
    });

  
  //console.log( parseEther(amount.toString()), "popopopop");
/*   sendTransaction({
    to,
    value: parseEther(amount.toString()),
  });
  if (!sendTransaction.isSuccess) {
    console.log(sendTransaction.error);
    return;
  }
  console.log(sendTransaction.data, "sendTransaction.data"); */
 

}
   
 
  useEffect(() => {
    setMounted(true);
  }, []);


useEffect(() => {
   if(!formErrors) return;

     setTimeout(() => {
      setFormErrors(null);
     }, 3000);
}, [formErrors]);


  //if (!mounted) return null;
  const { address, isConnected } = useAccount();
 
    const {data, isLoading} = useBalance({
    address:   isConnected ? address : undefined
  });
 





  return (
         
       <div className="min-h-screen mx-auto grid grid-rows-[auto_1fr_auto] ">      
         
          <header className="bg-gradient-to-r from-[#a80885] to-[#1b0eaa]">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex text-2xl font-bold text-white justify-center items-center">
              <img src="images/logo.png" alt="" width={40}/>
               <div className="font-bruno text-2xl text-white"> SR TOKEN </div>
              </div>

            <nav className="flex gap-4">
              <a href="#" className="text-white hover:text-gray-300 font-jura text-2xl">Decentralized Business</a>
               
            </nav>
          </div>
          </header>

          <div className="bg-gradient-to-br from-[#0d1451] via-[#670452] to-[#065f74]">
              <main>
          
                <div className="flex container">
                <div className=" p-4 flex flex-col   ">
                    <h1 className="text-4xl font-bold   text-white font-jura">Welcome to SR TOKEN</h1>
                    <h1 className="text-6xl font-bold   text-gray-400 font-jura"> SR TOKEN - Ico Landing for a cryptocurrency business</h1>
                    <p className="text-white   font-jura text-xl mt-4">
                        SR TOKEN is a decentralized token that allows users to transfer and store value on the Ethereum blockchain.
                    </p>
                    <div>
                    <div>
  {/* If we have a hash but no receipt yet, it's pending */}

{/*   {hash && !receipt && <p className="text-yellow-500">Transaction Pending...</p>}
  {receipt?.transactionHash && (
    <div className="mt-2">
      <p className="text-green-500">Success!</p>
      <a
        href={`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline font-bold"
      >
        View on Etherscan
      </a>
    </div>
  )} */}


{hash && !receipt && <p className="text-yellow-500">Transaction Pending...</p>}
  {receipt?.transactionHash && (
    <div className="mt-2">
      <p className="text-green-500">Success!</p>
      <a
        href={`https://sepolia.explorer.zksync.io/tx/${receipt.transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline font-bold"
      >
        View on zkSync Explorer -- Used GAS {gasFee}
      </a>
    </div>
  )}
 


</div>

                    
                    </div>
                </div>
                <div>
                  <div className="flex justify-center items-center">
                 {/*  {isConnected ? (
        <p>
          👤 Connected Wallet:
          <br />
          <b>{address}</b>
        </p>
      ) : (
        <button className="bg-gradient-to-t from-[#d08700] to-[#fdca10] p-2   rounded-xl mt-4 w-[400px]">Connect Wallet</button>
      )} */}  {mounted && <MyConnectButton />}
                    
                    </div>
                <div className="shadow-xl rounded-2xl w-[400px] h-[230px] p-4 mt-4 bg-gradient-to-br from-[#000000] via-[#31323a] to-[#000000]">
                  <div className="flex justify-between items-center  ">
                    <div className=" text-2xl font-bold font-bruno font-bold  bg-gradient-to-t from-[#d08700] to-[#fdca10] p-2   bg-clip-text text-transparent text- rounded-md  [text-shadow:0_2px_2px_rgba(0,0,0,0.3)]"  >SR TOKEN</div>
                    <img src="images/logo.png" alt="" width={50}/>
                  </div>
                  <div className="text-xl text-white font-bruno p-2  bg-gradient-to-t from-[#3b3a37] to-[#aaaaaa] p-2   bg-clip-text text-transparent text- rounded-md  [text-shadow:0_2px_2px_rgba(0,0,0,0.3)]">
                     WALLET BALANCE {isConnected? (isLoading ? "Loading..." : data.formatted):0} ETH
                  </div>
                  <div className="text-xl text-white font-bruno p-2  bg-gradient-to-t from-[#d08700] to-[#fdca10] p-2   bg-clip-text text-transparent text- rounded-md  [text-shadow:0_2px_2px_rgba(0,0,0,0.3)]">
                    {isConnected ? shortAddress(address) : "Please connect wallet"}
                     {/* 1478-1589-3587-2587 */}
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
                  <div className="flex">
                       <input type="text" name="toAddress" placeholder="Plz. enter your address" className=" w-[3/4] pl-2 rounded-md border  bg-[#aaaaaa] mr-2" />
                       <button className="bg-gradient-to-t from-[#d08700] to-[#fdca10] p-2   rounded-md"
                       disabled={txIsSent}
                       >
                         
                          {txIsLoading && "Waiting "} 
                          {!txIsLoading && !txIsSent &&   "Transfer"}
                          {txIsSent && "Sent ✅"}
                        </button>
                      {/*  {isLoading ? "Sending..." : "Send 0.001 ETH"} */}
                       
                  </div>
                  </form>
                  <div className="text-white">
                  <span className="text-red-500">{ formErrors}</span>
                   {/*  {txIsLoading && "Sending..."}
                    {txIsSuccess && `Send ${ formatEther(ethAmount)} ETH`} */}
                      
                  </div>
                  </div> 
                </div>
                </div>
              </main>
          </div>
          <footer className=" p-4 items-center bg-gradient-to-r from-[#1b0eaa] to-[#a80885]">
              <div className="text-white text-center">
                &copy; 2023 SR TOKEN. All rights reserved.
              </div>
          </footer>

        </div>
       
  );
}

