"use client"

import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Vous êtes maintenant inscrit !")
        setEmail("")
      } else {
        toast.error(data.error || "Une erreur est survenue !")
      }

      setIsLoading(false)

    } catch (error) {
      toast.error("Une erreur est survenue !")
    }
  }



  return (
    <div className="flex flex-col justify-center items-center h-screen">

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="flex items-center m-6 md:w-[600px] bg-base-200 rounded-3xl ">
        <div className="flex flex-col items-center w-full">
          <div className="h-[200px] w-full bg-[url('/img.jpg')] bg-cover bg-center rounded-3xl mb-6">
          </div>
          <div className="w-full p-10 pt-0">
            <h1
              className="text-2xl md:text-4xl font-bold text-white"
            > Abonne toi
            </h1>
            <p className="my-4 text-sm">
              Recevez des astuces exclusives pour améliorer vos compétences en programmation, directement dans votre boîte mail, tous les jours.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn ml-2 btn-primary">
                S'abonner
              </button>
            </form>
            <p className="text-xs mt-2">
              Pas de spam, promis !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
