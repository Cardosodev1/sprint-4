"use client"

import Button from "@/components/Button/index"
import Input from "@/components/Input/index"
import useForm, { FormState } from "@/hooks/use-form/index"
import { setCookie } from "@/utils/Cookie/index"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function RegisterForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const initialRegisterForm = {
    nome: '',
    email: '',
    senha: ''
  };

  const {
    data: { 
      nome,
      email, 
      senha 
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount,
  } = useForm(
    formRef, 
    initialRegisterForm, 
    submitCallback, 
    submitErrorCallback
  )

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = "Erro ao realizar registro:\n\n"
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
      const request = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: values.nome,
          email: values.email,
          senha: values.senha,
        }),
      })

      const response = await request.json();

      if (!response.token) {
        throw new Error(response.message)
      }

      setCookie('token', response.token)
      localStorage.setItem('token', response.token)
      router.push('/')

    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error('Erro ao realizar registro'))
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
        label="Nome"
        type="text"
        name="nome"
        id="nome"
        placeholder="Nome completo"
        value={nome}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="E-mail"
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        value={email}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        autoComplete="email"
        required
      />
      <Input
        label="Senha"
        type="password"
        name="senha"
        id="senha"
        placeholder="Senha"
        minLength={6}
        value={senha}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        autoComplete="new-password"
        required
      />
      <Button type="submit" disabled={loadingSubmit || !!errorsCount || !formRef.current}>
        {
          loadingSubmit 
            ? "Carregando..." 
            : "Registrar"
        }
      </Button>
    </form>
  )
}