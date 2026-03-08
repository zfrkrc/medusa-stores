"use client"

import { useState } from "react"
import Image from "next/image"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex min-h-[600px]">
      {/* Sol: Form */}
      <div className="flex-1 flex justify-center items-center px-8 py-8">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>

      {/* Sağ: Görsel — küçük ekranda gizlenir */}
      <div className="hidden small:block w-[480px] relative flex-shrink-0">
        <Image
          src="/sedefli-login.jpg"
          alt="Sedefli Atölye"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}

export default LoginTemplate
