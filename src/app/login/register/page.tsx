import Link from "next/link";
import RegisterForm from "./register-from/index";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-3 bg-white rounded shadow mx-auto w-full" style={{ maxWidth: '300px' }}>
        <h2 className="text-center mb-2 text-xl">
          Registrar-se
        </h2>
        <RegisterForm />
        <footer className="text-center mt-4">
          Já tem uma conta?<br />
          <Link className="text-blue-500 underline" href="/login">Faça login</Link>
        </footer>
      </div>
    </div>
  )
}
