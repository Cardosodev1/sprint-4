"use client"

import Button from "@/components/Button/index"
import Input from "@/components/Input/index"
import useForm, { FormState } from "@/hooks/use-form/index"
import { setCookie } from "@/utils/Cookie/index"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function LoginForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const initialLoginForm = {
    email: '',
    senha: ''
  }
  const {
    data: {
      email,
      senha
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount
  } = useForm(
    formRef,
    initialLoginForm,
    submitCallback,
    submitErrorCallback
  )

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = 'Erro ao realizar login:\n\n'
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
      const request = await fetch(`/api/login?email=${encodeURIComponent(values.email)}&senha=${encodeURIComponent(values.senha)}`, {
        method: 'GET',
      })
      const response = await request.json()

      if (!response.token || !response.codigo) {
        throw new Error(response.message)
      }

      setCookie('token', response.token)
      localStorage.setItem('token', response.token)
      localStorage.setItem('codigo', response.codigo)
      router.push('/')

    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error('Erro ao realizar login'))
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
        label='E-mail'
        type='email'
        name='email'
        id='email'
        placeholder='E-mail'
        value={email}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        autoComplete="email"
        required
      />
      <Input
        label='Senha'
        type='password'
        name='senha'
        id='senha'
        placeholder='Senha'
        minLength={6}
        value={senha}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        autoComplete='current-password'
        required
      />
      <Button type='submit' disabled={loadingSubmit || !!errorsCount || !formRef.current}>
        {
          loadingSubmit
            ? 'Carregando...'
            : 'Entrar'
        }
      </Button>
    </form>
  )
}