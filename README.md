# ArcPay

A simple, fast USDC payments dashboard built for the Arc Testnet.

## What it does

ArcPay lets users connect a wallet and interact with USDC on Arc in a clean, minimal interface:

- **Connect Wallet** — connect a wallet to the Arc Testnet
- **View Balance** — see current USDC balance at a glance
- **Send USDC** — send testnet USDC to any wallet address
- **Transaction History** — track past sends and view transaction status

## Why I built this

I wanted a lightweight, no-friction way to send and track USDC payments on Arc while learning how the network handles stablecoin transactions. Most existing tools felt heavier than needed for simple peer-to-peer testnet payments, so I built something focused and easy to use.

## Tech Stack

- **React** — UI and component structure
- **Vite** — build tooling and dev server
- **Arc Testnet** — network integration for balance/transaction data
- **Wallet connection** — Web3 wallet integration (MetaMask-compatible)

## Live Demo

🔗 [https://arcpay-sandy.vercel.app](https://arcpay-sandy.vercel.app)

## What's next

- [ ] Transaction history persistence
- [ ] Support for additional Arc-native tokens
- [ ] Gas estimation before sending
- [ ] Mobile-responsive layout improvements
- [ ] Basic error handling and toast notifications for failed transactions

## Status

Actively being developed — this is an early build and I'm continuing to iterate on it as I learn more about building on Arc.
