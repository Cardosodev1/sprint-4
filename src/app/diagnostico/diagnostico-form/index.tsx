"use client"

import Button from "@/components/Button/index"
import useForm, { FormState } from "@/hooks/use-form/index"
import { setCookie } from "@/utils/Cookie/index"
import { useRouter } from "next/navigation"
import { useRef, useEffect, useState } from "react"
import { useForm as useReactHookForm, Controller } from "react-hook-form"

export default function DiagnosticoForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const initialDiagnosticoForm = {
    marca: '',
    modelo: '',
    ano: '',
    problema: ''
  }

  const [modelos, setModelos] = useState<string[]>([])

  const { control, setValue, watch } = useReactHookForm({
    defaultValues: initialDiagnosticoForm
  })

  const marca = watch('marca')

  const {
    loadingSubmit,
    handleSubmit,
    errorsCount,
  } = useForm(
    formRef,
    initialDiagnosticoForm,
    submitCallback,
    submitErrorCallback
  )

  const fetchModelosPorMarca = async (marca: string) => {
    const modelosPorMarca: { [key: string]: string[] } = {
      Toyota: ["Corolla", "Camry", "Yaris", "Hilux", "Prius"],
      Ford: ["Fiesta", "Focus", "Mustang", "EcoSport", "Ranger"],
      Honda: ["Civic", "Accord", "Fit", "CR-V", "HR-V"],
      Volkswagen: ["Golf", "Polo", "Tiguan", "Jetta", "Virtus"],
      Chevrolet: ["Onix", "Cruze", "S10", "Tracker", "Spin"],
      Hyundai: ["HB20", "Creta", "Tucson", "Santa Fe", "Elantra"],
      Renault: ["Duster", "Sandero", "Kwid", "Logan", "Captur"]
    }
    return modelosPorMarca[marca] || []
  }

  useEffect(() => {
    const updateModelos = async () => {
      if (marca) {
        const modelosPorMarca = await fetchModelosPorMarca(marca);
        setModelos(modelosPorMarca);
        setValue('modelo', '')
      } else {
        setModelos([]);
        setValue('modelo', '')
      }
    };

    updateModelos();
  }, [marca, setValue]);

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = "Erro ao enviar o diagnóstico:\n\n"
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
      const request = await fetch(`/api/diagnostico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca: values.marca,
          modelo: values.modelo,
          ano: values.ano,
          problema: values.problema,
        }),
      })

      const response = await request.json()

      if (!response.success) {
        throw new Error(response.message)
      }

      setCookie('diagnostico', JSON.stringify(values))
      router.push('/')

    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error('Erro ao enviar o diagnóstico'))
    }
  }

  const anos = Array.from({ length: 2024 - 2000 + 1 }, (_, i) => (2024 - i).toString())

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Controller
        name="marca"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id="marca"
            className="p-3 border rounded-md h-12"
            onChange={(e) => {
              field.onChange(e)
              setValue('marca', e.target.value)
              setValue('modelo', '')
            }}
            disabled={loadingSubmit}
          >
            <option value="" disabled>Selecione a marca</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Renault">Renault</option>
          </select>
        )}
      />

      <Controller
        name="modelo"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id="modelo"
            className="p-3 border rounded-md h-12"
            disabled={loadingSubmit || modelos.length === 0}
          >
            <option value="" disabled>Selecione o modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
        )}
      />

      <Controller
        name="ano"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id="ano"
            className="p-3 border rounded-md h-12"
            disabled={loadingSubmit}
          >
            <option value="" disabled>Selecione o ano</option>
            {anos.map((ano, index) => (
              <option key={index} value={ano}>{ano}</option>
            ))}
          </select>
        )}
      />

      <Controller
        name="problema"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id="problema"
            className="p-3 border rounded-md h-12"
            disabled={loadingSubmit}
          >
            <option value="" disabled>Selecione um problema</option>
            <option value="barulho_motor">Barulho no motor</option>
            <option value="freios_falhando">Freios falhando</option>
            <option value="iluminacao_fraca">Iluminação fraca</option>
            <option value="aquecimento_motor">Aquecimento do motor</option>
            <option value="direcao_dificuldade">Dificuldade na direção</option>
            <option value="outro">Outro</option>
          </select>
        )}
      />

      <Button type="submit" disabled={loadingSubmit || !!errorsCount || !formRef.current}>
        {loadingSubmit ? "Carregando..." : "Enviar Diagnóstico"}
      </Button>
    </form>
  )
}