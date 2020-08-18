import React from 'react'
import stake from '../web3/stake'
import { useWeb3React } from "@web3-react/core";

export default function Test() {

    const { chainId, account, activate, active } = useWeb3React();
    const [posInfo, setPosInfo] = React.useState();

    React.useEffect( async () => {
        const getInfo = await stake.methods.getMyPositionInfo(account).call()
        await setPosInfo(getInfo);
        console.log("POSUE", posInfo)
    }, [])
    console.log("POS", posInfo)
    return (
        <div>
            stuff
        </div>
    )
}
