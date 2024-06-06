"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import WalletConnection from "./components/WalletConnection";
import Link from "next/link";

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
    <section className="flex sm:flex-row flex-col w-full h-full gap-4 py-20 px-4">
      <div className="w-full h-full min-h-20 sm:w-1/2">
        {data.map((item) => (
          item?.baseToken && (
            <div key={item?.pairAddress} className="mb-4 bg-slate-100 rounded-xl p-4 ">
              <div className="flex flex-row justify-between items-center pt-2 pb-4">
                <h1 className="font-bold">Token Name: {item?.baseToken?.name}</h1>
                {item?.info?.imageUrl && (
                  <Image src={item?.info?.imageUrl} alt="Pair Image" width={36} height={36} className="mt-4 object-cover hover:cursor-pointer rounded-full"/>
                )}
              </div>
              <div className="flex flex-col flex-wrap sm:flex-nowrap">
                <p className="font-medium">Pair Created At: <span className="font-semibold first-letter:uppercase ml-1">{new Date(item?.pairCreatedAt).toLocaleString()}</span></p>
                <p className="font-medium">Chain ID: <span className="font-semibold first-letter:uppercase ml-1">{item?.chainId}</span></p>
                <p className="font-medium">DEX ID: <span className="font-semibold first-letter:uppercase ml-1">{item?.dexId}</span></p>
                <p className="font-medium">Price (Native): <span className="font-semibold ml-1">{item?.priceNative}</span></p>
                <p className="font-medium">Price (USD): <span className="font-semibold ml-1">{item?.priceUsd}</span></p>
                <p className="font-medium">Volume (24h): <span className="font-semibold ml-1">{item?.volume?.h24.toLocaleString()}</span></p>
                <p className="font-medium">Liquidity (USD): <span className="font-semibold ml-1">{item?.liquidity?.usd.toLocaleString()}</span></p>
                <p className="font-medium">FDV: <span className="font-semibold ml-1">{item?.fdv?.toLocaleString()}</span></p>
                <p className="font-medium">Transactions (5m): <span className="font-semibold ml-1">Buys - {item?.txns?.m5?.buys}, Sells - {item?.txns?.m5?.sells}</span></p>
                <p className="font-medium">Transactions (1h): <span className="font-semibold ml-1">Buys - {item?.txns?.h1?.buys}, Sells - {item?.txns?.h1?.sells}</span></p>
                <p className="font-medium">Transactions (6h): <span className="font-semibold ml-1">Buys - {item?.txns?.h6?.buys}, Sells - {item?.txns?.h6?.sells}</span></p>
                <p className="font-medium">Transactions (24h): <span className="font-semibold ml-1">Buys - {item?.txns?.h24?.buys}, Sells - {item?.txns?.h24?.sells}</span></p>
                {item?.info?.websites && (
                  <div className="flex flex-row space-x-2">
                    {item.info.websites.map((website, index) => (
                      <Link key={index} href={website?.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {website?.label}
                      </Link>
                    ))}
                  </div>
                )}
                {item?.info?.socials && (
                  <div className="flex flex-row space-x-2 mt-2">
                    {item.info.socials.map((social, index) => (
                      <Link key={index} href={social?.url} target="_blank" rel="noopener noreferrer" className="first-letter:uppercase text-blue-500 hover:underline">
                        {social?.type}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        ))}
      </div>
      <div className="flex-col p-4 sm:w-1/2 max-h-96 justify-center bg-slate-100 rounded-xl">
        {/* Connected wallet and wallet detail section */}
        <h1 className="font-semibold text-lg text-center">Wallet details</h1>
        <WalletConnection />
      </div>
    </section>
  );
}
