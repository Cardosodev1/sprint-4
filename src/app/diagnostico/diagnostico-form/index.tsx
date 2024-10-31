"use client"

import Button from "@/components/Button/index"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRef, useState, useEffect } from 'react'
import * as yup from "yup"

type DiagnosticoFormData = {
  marca: string
  modelo: string
  ano: string
  problema: string
}

const schema = yup.object({
  marca: yup.string().required('A marca é obrigatória'),
  modelo: yup.string().required('O modelo é obrigatório'),
  ano: yup.string().required('O ano é obrigatório'),
  problema: yup.string().required('Selecione um problema')
}).required()

export default function DiagnosticoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [modelos, setModelos] = useState<string[]>([])
  const { control, handleSubmit, formState, watch } = useForm<DiagnosticoFormData>({
    defaultValues: {
      marca: '',
      modelo: '',
      ano: '',
      problema: ''
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const { errors, isValid } = formState
  const marcaSelecionada = watch('marca')

  const fetchModelosPorMarca = async (marca: string) => {
    setLoading(true)
    const modelosPorMarca: { [key: string]: string[] } = {
      Toyota: ["Corolla", "Camry", "Yaris", "Hilux", "Prius"],
      Ford: ["Fiesta", "Focus", "Mustang", "EcoSport", "Ranger"],
      Honda: ["Civic", "Accord", "Fit", "CR-V", "HR-V"],
      Volkswagen: ["Golf", "Polo", "Tiguan", "Jetta", "Virtus"],
      Chevrolet: ["Onix", "Cruze", "S10", "Tracker", "Spin"],
      Hyundai: ["HB20", "Creta", "Tucson", "Santa Fe", "Elantra"],
      Renault: ["Duster", "Sandero", "Kwid", "Logan", "Captur"]
    }
    setModelos(modelosPorMarca[marca] || [])
    setLoading(false)
  }

  useEffect(() => {
    if (marcaSelecionada) {
      fetchModelosPorMarca(marcaSelecionada)
    }
  }, [marcaSelecionada])

  const submitCallback = async (values: DiagnosticoFormData) => {
    setLoading(true)
    console.log(values)
    await new Promise(resolve => setTimeout(resolve, 2000))
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
        name="marca"
        control={control}
        render={({ field }) => (
          <select
            id="marca"
            className={`p-3 border rounded-md ${errors?.marca ? 'border-red-500' : 'border-gray-300'} h-12`}
            {...field}
            disabled={loading}
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
      {errors?.marca && <span className="text-red-500 text-sm">{errors.marca.message}</span>}

      <Controller
        name="modelo"
        control={control}
        render={({ field }) => (
          <select
            id="modelo"
            className={`p-3 border rounded-md ${errors?.modelo ? 'border-red-500' : 'border-gray-300'} h-12`}
            {...field}
            disabled={!marcaSelecionada || loading}
          >
            <option value="" disabled>Selecione o modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
        )}
      />
      {errors?.modelo && <span className="text-red-500 text-sm">{errors.modelo.message}</span>}

      <Controller
        name="ano"
        control={control}
        render={({ field }) => (
          <select
            id="ano"
            className={`p-3 border rounded-md ${errors?.ano ? 'border-red-500' : 'border-gray-300'} h-12`}
            {...field}
            disabled={loading}
          >
            <option value="" disabled>Selecione o ano</option>
            {[2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000].map(ano => (
              <option key={ano} value={ano.toString()}>{ano}</option>
            ))}
          </select>
        )}
      />
      {errors?.ano && <span className="text-red-500 text-sm">{errors.ano.message}</span>}

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
            <option value="freios_falhando">Freios falhando</option>
            <option value="iluminacao_fraca">Iluminação fraca</option>
            <option value="aquecimento_motor">Aquecimento do motor</option>
            <option value="direcao_dificuldade">Dificuldade na direção</option>
            <option value="outro">Outro</option>
          </select>
        )}
      />
      {errors?.problema && <span className="text-red-500 text-sm">{errors.problema.message}</span>}

      <Button type='submit' disabled={!formRef.current || loading || !isValid}>
        {loading ? 'Carregando...' : 'Continuar'}
      </Button>
    </form>
  )
}
