# Pixel

A secure, user-friendly, and browser-based HD (Hierarchical Deterministic) wallet supporting Ethereum and Solana blockchains.

## Features

- **Web-Based**: No extension required, accessible directly from any modern web browser.
- **Multi-Blockchain Support**: Currently supports Ethereum and Solana networks.
- **HD Wallet**: Create multiple addresses from a single seed phrase.
- **Secure**: User-controlled seed phrase, never stored on servers.
- **Flexible Recovery**: Supports both 12 and 24-word secret recovery phrases.
- **Real-Time Balance**: View your wallet balances updated in real-time.
- **Create or Import**: Easily create a new wallet or import an existing one.

## Getting Started

1. Visit https://pixel-orcin.vercel.app/
2. Choose to create a new wallet or import an existing one.
3. If creating a new wallet, securely store your generated seed phrase.
4. If importing, enter your 12 or 24-word seed phrase.
5. Select either Ethereum or Solana network.
6. Start managing your crypto assets!

## Security

- Your seed phrase is your responsibility. Store it securely and never share it.
- This wallet runs entirely in your browser. Your private keys are never sent to any server.
- Always ensure you're on the correct website before entering any sensitive information.

## Supported Blockchains

- Ethereum (ETH)
- Solana (SOL)

## Technical Stack

- Frontend: React.js with Vite
- Styling: Tailwind CSS
- Blockchain Interactions: ethers (Ethereum), @solana/web3.js (Solana)

## Running the Project Locally

To run this project on your local machine:

1. Clone the repository:
   ```
    git clone https://github.com/AmulGaurav/Pixel
    cd Pixel
   ```
2. Install project dependencies:
   ```
    npm i
   ```
   Or:
   ```
    npm install
   ```
3. Run the project locally:
   ```
    npm run dev
   ```

## Contributing

Contributions to improve the wallet are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

```
    git checkout -b feature/your-feature-name
```

3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your fork:

```
    git push origin feature/your-feature-name
```

5. Create a pull request from your fork to the main repository.

Please ensure your code follows Rust best practices and includes appropriate comments.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This wallet is provided as-is. Users are responsible for the security of their own funds and seed phrases. Always exercise caution when using cryptocurrency wallets.

## Future Plans

- Implement send functionality for both Ethereum and Solana
- Add receive functionality with QR code support
- Integrate token swap feature within and across supported blockchains
- Add support for more blockchains
- Implement transaction history
- Enhance security features
- Optimize for mobile devices

## Contact

For any queries or support, please open an issue in this repository.
