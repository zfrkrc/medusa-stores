import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { authClient } from "../../../../lib/auth-client"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const StoreId = process.env.NEXT_PUBLIC_STORE_ID || "hobby"

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account"
    })
  }

  const getStoreName = () => {
    switch (StoreId) {
      case "clay": return "Clay by Sevgi"
      case "sedefli": return "Sedefli Atölye"
      default: return "Hobby Store"
    }
  }

  const getThemeColor = () => {
    switch (StoreId) {
      case "clay": return "bg-stone-800 hover:bg-stone-700"
      case "sedefli": return "bg-indigo-900 hover:bg-indigo-800"
      default: return "bg-amber-900 hover:bg-amber-800"
    }
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <div className="mb-8 text-center">
        <h1 className={`text-2xl uppercase mb-2 ${StoreId === 'hobby' ? 'text-amber-900' : StoreId === 'clay' ? 'text-stone-800' : 'text-indigo-900'} ${StoreId !== 'hobby' ? 'font-serif' : 'font-sans'}`}>
          {getStoreName()}
        </h1>
        <div className={`h-1 w-12 mx-auto rounded-full ${StoreId === 'hobby' ? 'bg-amber-900' : StoreId === 'clay' ? 'bg-stone-800' : 'bg-indigo-900'}`}></div>
      </div>

      <h2 className="text-large-semi uppercase mb-2">Hoşgeldiniz</h2>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Size özel alışveriş deneyimi için giriş yapın.
      </p>

      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="E-posta"
            name="email"
            type="email"
            title="Geçerli bir e-posta adresi girin."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Şifre"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className={`w-full mt-6 rounded-full border-none text-white p-3 ${getThemeColor()}`}>
          Giriş Yap
        </SubmitButton>
      </form>

      <div className="w-full flex items-center justify-between mt-6">
        <div className="h-px bg-gray-200 w-full"></div>
        <span className="text-small-regular text-gray-500 px-2 text-nowrap">VEYA</span>
        <div className="h-px bg-gray-200 w-full"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full mt-4 flex items-center justify-center gap-x-2 border border-gray-200 rounded-full py-3 text-small-regular text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
          <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.2811H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
          <path d="M5.50253 14.2811C5.00397 12.7862 5.00397 11.1723 5.50253 9.67735V6.5672H1.51649C-0.18551 9.96913 -0.18551 13.9894 1.51649 17.3914L5.50253 14.2811Z" fill="#FBBC04" />
          <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8439 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.0344664 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61042L5.50264 9.72057C6.45517 6.86173 9.10959 4.74966 12.2401 4.74966Z" fill="#EA4335" />
        </svg>
        Google ile devam et
      </button>

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Üye değil misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Bize katılın
        </button>
        .
      </span>
    </div>
  )
}

export default Login
