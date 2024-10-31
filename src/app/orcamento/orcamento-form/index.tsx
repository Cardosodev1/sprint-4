"use client"

import Button from "@/components/Button/index"
import { useEffect, useState } from 'react'

type OrcamentoData = {
  veiculo: string
  modelo: string
  ano: string
  problema: string
  servico: string
  valor: string
}

export default function OrcamentoForm() {
  const [loading, setLoading] = useState(false)
  const [orcamentoData, setOrcamentoData] = useState<OrcamentoData | null>(null)

  useEffect(() => {
    // Simulação de dados obtidos do diagnóstico
    const diagnosticoData: OrcamentoData = {
      veiculo: "Toyota",
      modelo: "Corolla",
      ano: "2021",
      problema: "Barulho no motor",
      servico: "Substituição de peças do motor",
      valor: "R$ 1.500,00"
    }
    setOrcamentoData(diagnosticoData)
  }, [])

  if (loading || !orcamentoData) {
    return <div>Carregando orçamento...</div>
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold mb-1">Veículo</label>
        <p className="p-3 border rounded-md bg-gray-200">{orcamentoData.veiculo}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Modelo</label>
        <p className="p-3 border rounded-md bg-gray-200">{orcamentoData.modelo}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Ano</label>
        <p className="p-3 border rounded-md bg-gray-200">{orcamentoData.ano}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Problema</label>
        <p className="p-3 border rounded-md bg-gray-200">{orcamentoData.problema}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Descrição do Serviço Necessário</label>
        <p className="p-3 border rounded-md bg-gray-200">{orcamentoData.servico}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Valor Estimado</label>
        <p className="p-3 border rounded-md bg-gray-200">{orcamentoData.valor}</p>
      </div>
      <Button type="button" onClick={() => alert("Orçamento concluído!")}>
        Concluir Orçamento
      </Button>
    </div>
  )
}
