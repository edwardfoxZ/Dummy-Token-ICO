import React, { useEffect, useState } from "react";
import { Drizzle, generateStore } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import DummyICO from "../artifacts/DummyICO.json";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

const options = {
  contracts: [DummyICO],
};

// Initialize Drizzle and its store
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

function Main() {
  const [balance, setBalance] = useState();

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return <div>Loading Drizzle...</div>;
          }

          const account = drizzleState.accounts[0];
          const Balance = drizzle.web3.eth
            .getBalance(account)
            .then((balanceWei) => {
              const balanceInEther = drizzle.web3.utils.fromWei(
                balanceWei,
                "ether"
              );
              setBalance(balanceInEther.slice(0, 4));
            });

          return (
            <div className="flex mx-auto">
              <div className="flex flex-col items-center mt-10">
                <h1 className="text-2xl font-bold">ICO</h1>
                <div className="flex flex-col items-center mt-5">
                  <p className="font-serif font-bold">Account: {account}</p>
                  <p className="font-serif font-bold mt-2">
                    Balance: {balance} ETH
                  </p>
                  <p className="font-serif font-bold mt-10">Tokne:</p>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="DummyICO"
                    method="token"
                  />
                  {/* <p>admin:</p>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="DummyICO"
                    method="admin"
                  /> */}
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
