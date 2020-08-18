import React from "react";
import { useWeb3React } from "@web3-react/core";
import Onboard from "./onboarding/Onboard";
import Wallet from "./onboarding/Wallets";
import Test from './Test'
import Loader from './app/Loader'
export default function CheeseFi() {
  const { chainId, account, activate, active } = useWeb3React();

  console.log("APP ACTIVE", active);
  if (active) {
    return (
      <div>
          <Loader />
      </div>
    );
  } else {
    return (
      <div>
        <Onboard />
      </div>
    );
  }
}
