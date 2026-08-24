import { useEffect, useState } from "react";
import { createPublicClient, http, formatUnits } from "viem";
import { defineChain } from "viem";

const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.arc.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://testnet.arcscan.app",
    },
  },
});

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http(),
});

const USDC_ADDRESS = "0x3600000000000000000000000000000000000000";

const USDC_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
];

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(null);

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask first.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWalletAddress(accounts[0]);
    await getBalance(accounts[0]);
  } catch (error) {
    console.error(error);
  }
}

async function getBalance(address) {
  try {
    const rawBalance = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: "balanceOf",
      args: [address],
    });

    setBalance(formatUnits(rawBalance, 6));
  } catch (error) {
    console.error("Failed to get balance:", error);
  }
}

return (
    <div className="app">
      <nav className="navbar">
        <h1>ArcPay</h1>

        <button onClick={connectWallet} className="connect-button">
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </nav>

      <main className="dashboard">
        <section className="hero">
          <p className="network">ARC TESTNET</p>

          <h2>Simple USDC Payments</h2>

          <p>
            Send and track USDC payments on the Arc Testnet.
          </p>

          {!walletAddress && (
            <button onClick={connectWallet} className="main-button">
              Connect MetaMask
            </button>
          )}

          {walletAddress && (
            <div className="connected">
              <span>✓ Wallet Connected</span>
              <p>{walletAddress}</p>
            </div>
          )}
        </section>

        <section className="cards">
          <div className="card">
            <h3>USDC Balance</h3>
            <strong>
              {balance !== null ? `${balance} USDC` : "-- USDC"}
            </strong>
            <p>Connect your wallet to view balance</p>
          </div>

          <div className="card">
            <h3>Send USDC</h3>
            <p>Send testnet USDC to another wallet.</p>
            <button disabled>Coming next</button>
          </div>

          <div className="card">
            <h3>Transactions</h3>
            <p>Your Arc transactions will appear here.</p>
            <button disabled>Coming next</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;