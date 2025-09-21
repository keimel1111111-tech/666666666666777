"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthWrapperProps {
  onClose?: () => void
}

export function AuthWrapper({ onClose }: AuthWrapperProps) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} onClose={onClose} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} onClose={onClose} />
      )}
    </>
  )
}
