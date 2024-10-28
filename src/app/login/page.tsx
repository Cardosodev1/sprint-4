import Link from "next/link";
import LoginForm from "./login-from/index";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-3 bg-white rounded shadow mx-auto w-full" style={{ maxWidth: '300px' }}>
        <h2 className="text-center mb-2 text-xl">
          Login
        </h2>
        <LoginForm />
        <footer className="text-center mt-4">
          Não tem uma conta?<br />
          <Link className="text-blue-500 underline" href="/login/register">Cadastre-se</Link>
        </footer>
      </div>
    </div>
  )
}
