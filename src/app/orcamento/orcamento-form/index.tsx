"use client"

import { useEffect, useState } from "react"

type DiagnosticoData = {
  marcaCarro: string
  modeloCarro: string
  anoCarro: string
  resultado: string
}

export default function OrcamentoForm() {
  const [loading, setLoading] = useState(false)
  const [diagnosticoData, setDiagnosticoData] = useState<DiagnosticoData | null>(null)

  useEffect(() => {
    async function fetchDiagnosticoData() {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8080/diagnosticos/25`)
        if (!response.ok) {
          throw new Error('Erro ao buscar diagnóstico')
        }
        const data = await response.json()
        setDiagnosticoData(data)
      } catch (error) {
        console.error("Erro ao buscar dados do diagnóstico:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDiagnosticoData()
  }, [])

  const gerarOrcamentoSugerido = (descricao: string): { descricaoServico: string; valor: number } => {
    if (descricao.includes("motor")) {
      return {
        descricaoServico: "Reparo no sistema do motor, incluindo verificação de ignição e combustível",
        valor: 1200
      }
    } else if (descricao.includes("freio")) {
      return {
        descricaoServico: "Manutenção nos freios, incluindo troca de pastilhas e verificação de fluido",
        valor: 450
      }
    } else if (descricao.includes("bateria")) {
      return {
        descricaoServico: "Substituição da bateria e verificação dos cabos de conexão",
        valor: 300
      }
    } else if (descricao.includes("suspensão")) {
      return {
        descricaoServico: "Reparo na suspensão, incluindo troca de amortecedores e revisão completa",
        valor: 800
      }
    } else {
      return {
        descricaoServico: "Inspeção detalhada para diagnóstico completo",
        valor: 200
      }
    }
  }

  if (loading || !diagnosticoData) {
    return <div>Carregando dados do diagnóstico...</div>
  }

  const { resultado } = diagnosticoData
  const { descricaoServico, valor } = gerarOrcamentoSugerido(resultado)

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold mb-1">Veículo</label>
        <p className="p-3 border rounded-md bg-gray-200">{diagnosticoData.marcaCarro}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Modelo</label>
        <p className="p-3 border rounded-md bg-gray-200">{diagnosticoData.modeloCarro}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Ano</label>
        <p className="p-3 border rounded-md bg-gray-200">{diagnosticoData.anoCarro}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Problema</label>
        <p className="p-3 border rounded-md bg-gray-200">{diagnosticoData.resultado}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Solução</label>
        <p className="p-3 border rounded-md bg-gray-200">{descricaoServico}</p>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Valor</label>
        <p className="p-3 border rounded-md bg-gray-200">R$ {valor}</p>
      </div>
    </div>
  )
}
