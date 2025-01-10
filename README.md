# DummyICO

A decentralized Initial Coin Offering (ICO) contract and its frontend interface built with Ethereum smart contracts, React, Drizzle, and MetaMask integration. This project allows the admin to start an ICO, manage investors, and distribute tokens upon successful purchases.

## Features

- **Start ICO**: Admin can initialize an ICO with parameters such as duration, price, available tokens, and purchase limits.
- **Investor Whitelist**: Admin can whitelist investors who are eligible to participate in the ICO.
- **Buy Tokens**: Investors can purchase tokens during the ICO by sending Ether (ETH).
- **Token Distribution**: After the ICO ends, the admin can release tokens to investors.
- **Withdraw Funds**: Admin can withdraw Ether raised during the ICO after token release.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v14.x or higher
- **npm** or **yarn** package manager
- **MetaMask** browser extension for managing Ethereum accounts and interacting with smart contracts
- **Ganache** (or similar local Ethereum blockchain) for testing the contract

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dummy-ico.git
cd dummy-ico


npm install
# or
yarn install


npm start
# or
yarn start
