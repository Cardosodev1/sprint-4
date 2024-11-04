import { NextRequest, NextResponse } from "next/server"

interface UsuarioProps {
  nome: string;
  email: string;
  senha: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { nome, email, senha }: UsuarioProps = await request.json()

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: "Nome, e-mail e senha são obrigatórios." },
        { status: 400 }
      )
    }

    const response = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    })

    if (response.ok) {
      const token = `token-for-${email}`
      return NextResponse.json({ token, message: "Usuário registrado com sucesso!" })
    } else {
      const errorData = await response.json()
      return NextResponse.json(
        { message: errorData.message || "Erro ao registrar usuário." },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
