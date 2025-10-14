import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, arbitrum, polygonAmoy } from "@reown/appkit/networks";

// 1. Get projectId at https://dashboard.reown.com
const projectId = "f3c6273e32b584adc4c08342e4982a84";

// 2. Create a metadata object
const metadata = {
  name: "My WalletConnect App",
  description: "Wallet connection example with Reown AppKit",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
export const modal = createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [mainnet, arbitrum, polygonAmoy],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});