import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
const { ContractData } = newContextComponents;

const ICO = ({ drizzle, drizzleState }) => {
  const [startTransaction, setStartTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const startICO = async () => {
    setLoading(true);
    const icoContract = drizzle.contracts.DummyICO;

    // set the params for the start function //
    const duration = 3600;
    const price = drizzle.web3.utils.toWei("0.001", "ether"); // in wei
    const availableTokens = 1000000; // total tokens in ICO
    const minPurchase = drizzle.web3.utils.toWei("0.001", "ether");
    const maxPurchase = drizzle.web3.utils.toBN("10000000000000000");

    try {
      const kickStart = await icoContract.methods
        .start(duration, price, availableTokens, minPurchase, maxPurchase)
        .send({ from: drizzleState.accounts[0] });

      // set success
      setStartTransaction(kickStart);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Start ICO</h1>
      <p className="text-xl font-mono">
        admin:{" "}
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="DummyICO"
          method="admin"
        />
      </p>
      <p className="text-xl font-semibold">
        AvailableTokens:
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="DummyICO"
          method="availableTokens"
        />
      </p>
      <div className="flex flex-col items-center mt-2">
        <button
          onClick={startICO}
          className="text-xl bg-zinc-700 text-white px-4 py-1 rounded-xl hover:text-black hover:bg-slate-300 transition-all delay-100 duration-300 ease-in"
        >
          {loading ? "Starting..." : "Start"}
        </button>
        {startTransaction && (
          <p>
            Transaction successful! Hash: {startTransaction.transactionHash}
          </p>
        )}
        {error && <p className="text-red-700 font-bold">Error: {error}</p>}
      </div>
    </>
  );
};

export default ICO;
