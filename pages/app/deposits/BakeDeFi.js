import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { formatEther } from "@ethersproject/units";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import web3 from "../../../web3/web3";
import defiplusplus from "../../../web3/defiplusplus";


const InputDai = () => {
  const { chainId, account, activate, active } = useWeb3React();
  const [priceOfPies, setPriceOfPies] = useState({});

  const { register, handleSubmit, setValue, watch, errors } = useForm();

  const onCalculatePie = (data) => {
    const sizeWei = web3.utils.toWei(data.size);
    defiplusplus.methods
      .calcToPie("0x880873a96ce38c7fd39dc714592902b069bde048", sizeWei)
      .call()
      .then((res) => {
        setPriceOfPies(res * 1.01);
      });
  };
  const mintDemPies = async (data) => {
    const bigPie = await web3.utils.toWei(data.size);
    const amount = priceOfPies.toString()
    console.log("bigpie", bigPie)
    console.log("PRICE IN ETH", priceOfPies)
    await defiplusplus.methods
      .toPie("0x880873a96ce38c7fd39dc714592902b069bde048", bigPie)
      .send({ from: account, value: amount });
  };

  console.log("PIECALC", priceOfPies);
  console.log("PIECALC", typeof(priceOfPies));

  const fetcher = (library) => (...args) => {
    const [method, ...params] = args;
    console.log(method, params);
    return library[method](...params);
  };

  const Balance = () => {
    const { account, library } = useWeb3React();
    const { data: balance } = useSWR(["getBalance", account, "latest"], {
      fetcher: fetcher(library),
    });
    if (!balance) {
      return <span>...</span>;
    }
    return (
      <span>Balance: {parseFloat(formatEther(balance)).toPrecision(8)} Ξ</span>
    );
  };

  const handleChanges = (event) => {
    onCalculatePie({ ...priceOfPies, [event.target.name]: event.target.value });
  };
  const priceInEth = (val) => {
    const amt = val / 1000000000000000000;
    return amt;
  };
  const ethCost = priceInEth(priceOfPies);
  return (
    <div>
      <div>
        <div className="title centered">Bake Some DeFi++</div>
        <div className="bal-box">
          <div className="row-dai from">({Balance()})</div>
          <form onSubmit={handleSubmit(mintDemPies)}>
            <div>I want to mint this many pies:</div>
            <br />
            <div className="row-dai left-align">
              <div className="field-container form-label">
                <input
                  className="field-input"
                  name="size"
                  type="number"
                  defaultValue="1"
                  ref={register}
                  onChange={handleChanges}
                />{" "}
                <div className="dai-fixer">DeFi++ </div>
                {/*defaultValue={props.value} replace default value*/}
              </div>
            </div>

            <div className="row-dai left-align">
              <div>Approximate Price (estimated 1% slippage)</div>
              <br />
              <div className="dai-fixer subtitle">{ethCost}ETH </div>
              {/*defaultValue={props.value} replace default value*/}
            </div>
            <br />
            <button className="button is-primary">Mint</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputDai;
