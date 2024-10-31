import { NextRequest, NextResponse } from "next/server"

type LoginResponse = {
  token?: string
  message?: string
}

export async function GET(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const senha = searchParams.get("senha")

    if (!email || !senha) {
      return NextResponse.json({
        message: 'E-mail e senha são obrigatórios.'
      }, { status: 400 })
    }

    if (senha === process.env.NEXT_USUARIO_URL) {
      return NextResponse.json({ token: email })
    }

    return NextResponse.json({
      message: 'E-mail ou senha inválidos.'
    }, { status: 401 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'Internal Server Error'
    }, { status: 500 })
  }
}