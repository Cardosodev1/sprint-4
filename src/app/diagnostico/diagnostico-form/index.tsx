"use client"

import Button from "@/components/Button/index"
import Input from "@/components/Input/index"
import { useForm, SubmitHandler, Controller, FieldErrors } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRef, useState, useMemo } from 'react'
import * as yup from "yup"

type DiagnosticoFormData = {
  veiculo: string
  ano: string
  problema: string
}

const schema = yup
  .object({
    veiculo: yup.string().required('O veículo é obrigatório'),
    ano: yup.string().required('O ano é obrigatório'),
    problema: yup.string().required('Selecione um problema'),
  })
  .required()

export default function DiagnosticoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState } = useForm<DiagnosticoFormData>({
    defaultValues: {
      veiculo: '',
      ano: '',
      problema: ''
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  })
  const { errors, isValid } = useMemo(() => formState, [formState])

  async function submitErrorCallback() {
    // TODO: Tratar erros
  }

  async function submitCallback(values: DiagnosticoFormData) {
    setLoading(true)

    if (!isValid) {
      await submitErrorCallback()
      setLoading(false)
      return
    }

    console.log(values)

    // Simula uma requisição à API
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
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
        name="ano"
        control={control}
        render={({ field }) => (
          <Input
            label='Ano'
            type='ano'
            id='ano'
            placeholder='Digite o ano do veículo'
            readOnly={loading}
            customError={errors?.ano?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="problema"
        control={control}
        render={({ field }) => (
          <select
            id="problema"
            className={`p-3 border rounded-md ${errors?.problema ? 'border-red-500' : 'border-gray-300'} h-12`}
            {...field}
            disabled={loading}
          >
            <option value="" disabled>Selecione um problema</option>
            <option value="barulho_motor">Barulho no motor</option>
            <option value="freios_branqueando">Freios falhando</option>
            <option value="iluminacao_fraca">Iluminação fraca</option>
            <option value="aquecimento">Aquecimento do motor</option>
            <option value="direcao">Dificuldade na direção</option>
            <option value="outro">Outro</option>
          </select>
        )}
      />
      {errors?.problema && <span className="text-red-500 text-sm">{errors.problema.message}</span>}
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
