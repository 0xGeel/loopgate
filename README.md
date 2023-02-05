<img style="width: 600px; border-radius: 4px; margin-bottom: 6px;" src="public/images/splash.png">

[![Netlify Status](https://api.netlify.com/api/v1/badges/0737e3fd-543b-491d-b955-8bdfde51b13f/deploy-status)](https://app.netlify.com/sites/whimsical-cascaron-a5c80e/deploys)

<br />

# Current status

This project is **in active development** 🚀.

- The foundation is in place: ✅
  - Integrating a `web3 provider` to allow users to connect with their wallet (`WalletConnect`, `GameStop/Metamask/Injected`).
  - Accessing the `Loopring API` to retrieve the connected user's held NFTs.
  - Accessing the `Pinata Submarine API` to unlock submarined files based on the admin-specified `config.ts`.

Next steps may include:

- ✅ ~~Auth, client-side & server-side sessions.~~
- Documentation for others on how to use this.
- Individual pages for unlockables.
- Requiring user's Loopring sig to use Loopring API.

# Contributing

Got ideas for this project? Feel free to add feature requests or report issues:
https://github.com/0xGeel/loopring-token-gating/issues

# Getting Started

Run `npm run dev` in your terminal, and then open [localhost:3000](http://localhost:3000) in your browser.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/pages/index.tsx`) will automatically update the webpage.

# Learn more

To learn more about [Next.js](https://nextjs.org), [ConnectKit](https://docs.family.co/connectkit) or [wagmi](https://wagmi.sh), check out the following resources:

- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [ConnectKit Documentation](https://docs.family.co/connectkit) – learn more about ConnectKit (configuration, theming, advanced usage, etc).
- [Next.js Documentation](https://nextjs.org/docs) learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
