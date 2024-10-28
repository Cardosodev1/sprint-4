"use client"

import Button from "@/components/Button/index"
import Input from "@/components/Input/index"
import { useForm, SubmitHandler, Controller, FieldErrors } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRef, useState, useMemo } from 'react'
import * as yup from "yup"

type OrcamentoFormData = {
  veiculo: string
  servico: string
}

const schema = yup
  .object({
    veiculo: yup.string().required('O veículo é obrigatório'),
    servico: yup.string().required('O serviço necessário é obrigatório'),
  })
  .required()

export default function OrcamentoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState } = useForm<OrcamentoFormData>({
    defaultValues: {
      veiculo: '',
      servico: ''
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  })
  const { errors, isValid } = useMemo(() => formState, [formState])

  async function submitErrorCallback() {
    // TODO: Tratar erros
  }

  async function submitCallback(values: OrcamentoFormData) {
    setLoading(true)

    // Verifica se o formulário é válido
    // TODO: Outros erros?
    if (!isValid) {
      await submitErrorCallback()
      setLoading(false)
      return
    }

    // TODO: Envie os dados do formulário para a API
    console.log(values)

    // Simula uma requisição à API
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <form
      className="w-full flex flex-col gap-8"
      onSubmit={handleSubmit(submitCallback)}
      ref={formRef}
      noValidate
    >
      <Controller
        name="veiculo"
        control={control}
        render={({ field }) => (
          <Input
            label='Veículo'
            type='text'
            id='veiculo'
            placeholder='Digite o modelo do veículo'
            readOnly={loading}
            customError={errors?.veiculo?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="servico"
        control={control}
        render={({ field }) => (
          <Input
            label='Serviço Necessário'
            type='text'
            id='servico'
            placeholder='Descreva o serviço necessário'
            readOnly={loading}
            customError={errors?.servico?.message}
            {...field}
          />
        )}
      />
      <Button type='submit' disabled={!formRef.current || loading || !isValid}>
        {
          loading
            ? 'Carregando...'
            : 'Continuar'
        }
      </Button>
    </form>
  )
}