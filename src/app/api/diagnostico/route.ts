import { NextRequest, NextResponse } from "next/server";

interface DiagnosticoProps {
  codigoUsuario: number
  marcaCarro: string
  modeloCarro: string
  anoCarro: string
  descricaoProblema: string
}

function gerarResultadoDiagnostico(descricao: string): string {
  if (descricao.includes("motor")) {
    return "Possível problema no motor. Recomenda-se uma verificação do sistema de ignição e combustível."
  } else if (descricao.includes("freio")) {
    return "Problema nos freios detectado. Verifique pastilhas e fluido de freio."
  } else if (descricao.includes("bateria")) {
    return "Problema com a bateria. Verifique a carga e os cabos de conexão."
  } else if (descricao.includes("suspensão")) {
    return "Problema na suspensão. Verifique os amortecedores e componentes da suspensão."
  } else {
    return "Não foi possível determinar um problema específico. Recomenda-se inspeção detalhada."
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { codigoUsuario, marcaCarro, modeloCarro, anoCarro, descricaoProblema }: DiagnosticoProps = await request.json()

    if ( !codigoUsuario || !marcaCarro || !modeloCarro || !anoCarro || !descricaoProblema) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      )
    }

    const resultado = gerarResultadoDiagnostico(descricaoProblema);

    const response = await fetch("http://localhost:8080/diagnosticos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigoUsuario, 
        marcaCarro, 
        modeloCarro, 
        anoCarro, 
        descricaoProblema,
        resultado }),
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
