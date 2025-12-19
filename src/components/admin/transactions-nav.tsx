"use client";
import { ArrowLeftRight, Scissors, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TransactionsNav = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsClicked(!isClicked)}
        className="hover:bg-accent hover:text-accent-foreground p-4"
      >
        <ArrowLeftRight />
      </button>
      <div className={isClicked ? "flex flex-col" : "hidden"}>
        <Link href="/dashboard/transactions/haircuts" className="hover:bg-accent hover:text-accent-foreground p-4"><Scissors /></Link>
        <Link href="/dashboard/transactions/products" className="hover:bg-accent hover:text-accent-foreground p-4"><ShoppingBag /></Link>
      </div>
    </div>
  );
};

export default TransactionsNav;
