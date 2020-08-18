import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are in the browser and mm is running
    web3 = new Web3(window.web3.currentProvider);

} else {
    //for browser w/out mm
    const provider = new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0' //goerli
    );
    web3 = new Web3(provider)
}

export default web3;