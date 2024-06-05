"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=WSOL%20USDC`);
    const responseData = await response.json();

    if (responseData.pairs && responseData.pairs.length > 0) {
      setData([responseData]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col w-full h-full justify-center items-center py-20">
      <div className="bg-white max-w-80 max-h-80 rounded-md p-4">
        {data.map((item) => (
          <div key={item.pairAddress}>
            <div className="flex flex-row justify-between items-center pt-2 pb-4">
              <h1 className="font-bold">Token Name: {item.baseToken.name}</h1>
              <Image src={item.info.imageUrl} alt="Pair Image" width={32} height={32} className="mt-4 object-cover hover:cursor-pointer"/>
            </div>
            <div className="flex flex-col flex-wrap sm:flex-nowrap">
              <p className="font-medium">Pair Created At: {new Date(item.pairCreatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}