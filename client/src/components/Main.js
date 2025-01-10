import React, { useContext, useEffect, useState } from "react";
import { Drizzle, generateStore } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import DummyICO from "../artifacts/DummyICO.json";
import { newContextComponents } from "@drizzle/react-components";
import ICO from "./ICO";

const { AccountData, ContractData, ContractForm } = newContextComponents;

const options = {
  contracts: [DummyICO],
};

// Initialize Drizzle and its store
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

function Main() {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (account) {
      const fetchBalance = async () => {
        try {
          const balanceWei = await drizzle.web3.eth.getBalance(account);
          const balanceInEther = drizzle.web3.utils.fromWei(
            balanceWei,
            "ether"
          );
          setBalance(balanceInEther.slice(0, 4));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
      fetchBalance();
    }
  }, [account, drizzle]);

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return <div className="absolute top-[43%] left-[48%] text-slate-900 font-bold">Loading Drizzle...</div>;
          }

          const currentAccount = drizzleState.accounts[0];
          if (account !== currentAccount) {
            setAccount(currentAccount);
          }

          return (
            <div className="w-full h-full flex flex-col items-center mx-auto">
              <div className="flex flex-col items-center mt-10">
                <h1 className="text-2xl font-bold">ICO</h1>
                <div className="flex flex-col items-center mt-5">
                  <p className="font-serif font-bold">
                    Account: {currentAccount}
                  </p>
                  <p className="font-serif font-bold mt-2">
                    Balance: {balance ? `${balance} ETH` : "Loading..."}
                  </p>
                  <p className="font-serif font-bold mt-10">Token:</p>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="DummyICO"
                    method="token"
                  />
                </div>
                <div className="flex flex-col items-center mt-14">
                  <ICO drizzle={drizzle} drizzleState={drizzleState} />
                </div>
              </div>
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default Main;
