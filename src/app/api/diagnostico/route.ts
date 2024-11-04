import { NextRequest, NextResponse } from "next/server";

interface DiagnosticoProps {
  marca: string;
  modelo: string;
  ano: string;
  problema: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { marca, modelo, ano, problema }: DiagnosticoProps = await request.json()

    if (!marca || !modelo || !ano || !problema) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      )
    }

    const response = await fetch("http://localhost:8080/diagnosticos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marca, modelo, ano, problema }),
    })

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({
        success: true,
        message: "Diagnóstico enviado com sucesso!",
        data: responseData,
      })
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Erro ao enviar diagnóstico." },
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
