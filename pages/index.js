import Head from "next/head";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [transleted, setTransleted] = useState("");

  const doTranslate = () => {
    setIsLoading(true);
    setTransleted("");
    axios.post("/api/translate", { text: text }).then((res) => {
      setTransleted(res.data.result);
      setIsLoading(false);
    });
  };
  return (
    <div className="min-h-screen antialiased text-gray-200 bg-gray-100">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between px-6 py-4 bg-gradient-to-b from-gray-500 to-gray-600">
        <div className="text-xl font-bold">
          <a href="/">Translatee</a>
        </div>
        <button className="hidden px-5 py-1 transition duration-300 bg-gray-800 rounded-md shadow-lg lg:flex hover:bg-gray-700">
          Sign In
        </button>
      </header>
      <main className="w-full mx-auto text-gray-700 bg-gray-200 shadow-lg lg:w-4/5 ">
        <div className="p-4 space-y-4 text-center">
          <h1 className="mt-3 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800">
            Translatee
          </h1>
          <p className="text-sm italic text-gray-500">
            Pada dasarnya <span className="font-bold">TRANSLATEE</span> adalah
            sebuah tool untuk menterjemahkan tulisan anda ke beberapa bahasa
            segaligus menggunakan Google API, secara default{" "}
            <span className="font-bold">TRANSLATEE</span> akan menterjemahkan
            dari bahasa indonesia ke bahasa belanda (Netherland) dan kembali ke
            indonesia.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full p-4 lg:w-1/2 ">
            <label htmlFor="input">Input Text</label>
            <textarea
              textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              name="input"
              className="w-full h-[250px] text-pink-500 rounded"
            />
            <div className="flex justify-between">
              <span className="text-xs">
                words (
                <span className="text-red-600">{text.split(" ").length}</span>)
                / characters (
                <span className="text-red-600">{text.length}</span>)
              </span>
              <button
                onClick={() => doTranslate()}
                className={`px-4 py-2 mt-4 text-gray-200 transition duration-300 ${
                  isLoading ? "bg-gray-400" : "bg-gray-800"
                } rounded-md  hover:bg-gray-700`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
          <div className="w-full p-4 lg:w-1/2 ">
            <label htmlFor="input">Output Text</label>
            <textarea
              textarea
              value={transleted}
              name="input"
              className="w-full h-[250px] text-pink-500 rounded"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
