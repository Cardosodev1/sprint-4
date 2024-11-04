"use client"

import Button from "@/components/Button/index"
import Input from "@/components/Input/index"
import useForm, { FormState } from "@/hooks/use-form/index"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function DiagnosticoForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const initialDiagnosticoForm = {
    marcaCarro: '',
    modeloCarro: '',
    anoCarro: '',
    descricaoProblema: ''
  }

  const {
    data: { 
      marcaCarro,
      modeloCarro, 
      anoCarro,
      descricaoProblema
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount,
  } = useForm(
    formRef, 
    initialDiagnosticoForm, 
    submitCallback, 
    submitErrorCallback
  )

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = "Erro ao realizar diagnostico:\n\n"
      for (const key in error.cause) {
        const causes = error.cause as { [key: string]: string }
        message += `- ${causes[key]}\n`
      }
      return window.alert(message)
    }

    return window.alert(error.message)
  }

  async function submitCallback(values: FormState) {
    try {
      const codigoUsuario = localStorage.getItem('codigo')
      const request = await fetch(`/api/diagnostico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigoUsuario,
          marcaCarro: values.marcaCarro,
          modeloCarro: values.modeloCarro,
          anoCarro: values.anoCarro,
          descricaoProblema: values.descricaoProblema
        }),
      })

      const response = await request.json()

      if (!response.success) {
        throw new Error(response.message)
      }

      router.push('/orcamento')
      
    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error('Erro ao realizar diagnostico'))
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Input
        label="Marca"
        type="text"
        name="marcaCarro"
        id="marcaCarro"
        placeholder="Digite a marca do carro"
        value={marcaCarro}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Modelo"
        type="text"
        name="modeloCarro"
        id="modeloCarro"
        placeholder="Digite o modelo do carro"
        value={modeloCarro}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Ano"
        type="date"
        name="anoCarro"
        id="anoCarro"
        placeholder="Digite o ano do carro"
        value={anoCarro}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Problema"
        type="text"
        name="descricaoProblema"
        id="descricaoProblema"
        placeholder="Digite o problema do carro"
        value={descricaoProblema}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Button type="submit" disabled={loadingSubmit || !!errorsCount || !formRef.current}>
        {
          loadingSubmit 
            ? "Carregando..." 
            : "Diagnosticar"
        }
      </Button>
    </form>
  )
}