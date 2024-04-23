"use client"
import Image from "next/image";

import { useState } from "react"

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  async function enterRaffle(formData: FormData) {
    setSubmitted(true)
    // submitting the form data to our API
    const name = formData.get("name")
    const email = formData.get("email")
    const res = await fetch("api/raffle", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email })
    })
    console.log(res)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to the DataStax && Vercel Raffle!
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/datastax.png"
              alt="DataStax Logo"
              className="dark:invert"
              width={200}
              height={48}
              priority
            />
          </a>
        </div>
      </div>

      <div>
      { submitted ?
      <div>Thank for entering our raffle, and GOOD LUCK! 🤗</div>
      :
      <form action={enterRaffle} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" placeholder="full name"></input><br></br>
        </div>
        <div className="mb-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="email" placeholder="email address"></input><br></br>
        </div>     
        <div className="mb-4">    
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Enter Raffle</button>
        </div>
        </form>
      }
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">

      </div>
    </main>
  );
}
