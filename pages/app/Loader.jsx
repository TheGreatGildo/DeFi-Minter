import React, { useEffect, useState } from "react";
import CheeseContainer from "./PieApp";
import { useWeb3React } from '@web3-react/core'
import defiplusplus from '../../web3/defiplusplus';
import PieSpinner from "./PieSpinner"
export const Loader = () => {

  const { chainId, account, activate, active } = useWeb3React()



  const [counter, setCounter] = useState(2);



  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);


  

  if (counter === 0 && active ) {
    return (
      <div>
        <CheeseContainer />
      </div>
    );
  } else {
    return (
      <div>
        <br /><br /><br /><br /><br /><br />
        <PieSpinner />
      </div>
    );
    // make something cool here while the state loads
  }
};



export default Loader;
