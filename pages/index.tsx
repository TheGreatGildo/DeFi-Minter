import React, { useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import DeFiPlusPlus from "./DeFiPlusPlus";
import { useWeb3React } from "@web3-react/core";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div><DeFiPlusPlus /></div>
            
          
    </Web3ReactProvider>
  );
}

//
