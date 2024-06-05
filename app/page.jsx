"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import WalletConnection from "./components/WalletConnection";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=WSOL%20USDC`);
    const responseData = await response.json();

    if (responseData.pairs && responseData.pairs.length > 0) {
      // Sort pairs by pairCreatedAt in descending order
      const sortedPairs = responseData.pairs.sort((a, b) => b.pairCreatedAt - a.pairCreatedAt);
      setData(sortedPairs);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex sm:flex-row flex-col w-full h-full gap-2 py-20 px-4">
      <div className="bg-slate-100 w-full h-full min-h-20 rounded-xl p-4 sm:w-1/2">
        {data.map((item) => (
          item.baseToken && (
            <div key={item.pairAddress}>
              <div className="flex flex-row justify-between items-center pt-2 pb-4">
                <h1 className="font-bold">Token Name: {item?.baseToken?.name}</h1>
                <Image src={item?.info?.imageUrl} alt="Pair Image" width={36} height={36} className="mt-4 object-cover hover:cursor-pointer rounded-full"/>
              </div>
              <div className="flex flex-col flex-wrap sm:flex-nowrap">
                <p className="font-medium">Pair Created At: {new Date(item?.pairCreatedAt).toLocaleString()}</p>
              </div>
            </div>
          )
        ))}
      </div>
      <div className="flex-col p-4 sm:w-1/2 justify-center bg-slate-100 rounded-xl">
        {/* Connected wallet and wallet detail section */}
        <h1 className="font-semibold text-lg text-center">Wallet details</h1>
        <WalletConnection/>
      </div>
    </section>
  );
}
