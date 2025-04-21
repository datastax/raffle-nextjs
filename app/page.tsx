"use client"
import Image from "next/image";

import { useState } from "react"

export default function Home() {
  const [response, setResponse] = useState(undefined)
  async function enterRaffle(formData: FormData) {
    // submitting the form data to our API
    const name = formData.get("name")
    const email = formData.get("email")
    const job_title = formData.get("job_title")
    const company = formData.get("company")
    const res = await fetch("api/raffle", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, job_title, company })
    })
    const json = await res.json()
    setResponse(json.message)
  }

  return (
    <main className="flex p-8 min-h-screen flex-col items-center justify-between lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to the Raffle!
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://datastax.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{""}
            <Image
              src="/langflow-logo-color-white-transparent.png"
              alt="Langflow Logo"
              width={200}
              height={48}
              priority
            />
          </a>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
      { response === "denied" ? 
      <div><img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzBwb3oxMGFzcjlxN2E0MWpjZTRrdXJhZDlmcGFsZ2RmYncyOGYyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IyhdVAFdKe5WuQM/giphy.gif" alt="denied"/></div> : ( 
          response === "OK" ?
      <div><img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHh4enp6d3BlanF2emp0d3Y1Z2Vzc2RsdnFwM3QxcG0wbXFyYTgyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oeSAz6FqXCKuNFX6o/giphy.gif" alt="good luck"/>
      </div>
      :
      <form action={enterRaffle} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" placeholder="full name" minLength={6} required></input><br></br>
        </div>
        <div className="mb-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="company" placeholder="company" minLength={2} required></input><br></br>
        </div>
        <div className="mb-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="job_title" placeholder="job title" minLength={3} required></input><br></br>
        </div>
        <div className="mb-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="email address" required></input><br></br>
        </div>     
        <div className="mb-4">    
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Enter Raffle</button>
        </div>
        </form>
      )}
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">

      </div>
    </main>
  );
}
