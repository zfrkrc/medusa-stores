import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Giriş Yap | Sedefli Atölye",
  description: "Sedefli Atölye hesabınıza giriş yapın.",
}

export default function Login() {
  return <LoginTemplate />
}
