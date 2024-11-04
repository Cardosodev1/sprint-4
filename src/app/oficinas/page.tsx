"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface OficinaProps {
    id: number;
    nome: string;
    cep: string;
    endereco: string;
    telefone: string;
}

export default function Oficinas() {
    const [oficinas, setOficinas] = useState<OficinaProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
    }, [router])

    useEffect(() => {
        const fetchOficinas = async () => {
            try {
                const response = await fetch(`http://localhost:8080/oficinas`)
                if (!response.ok) {
                    throw new Error('Erro ao buscar oficinas')
                }
                const data: OficinaProps[] = await response.json()
                setOficinas(data)
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Erro desconhecido')
            } finally {
                setLoading(false)
            }
        }

        fetchOficinas()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-3xl font-bold">Carregando oficinas...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-3xl font-bold text-red-500">{error}</h2>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-3xl font-bold mb-5">Oficinas</h2>
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {oficinas.map((oficina) => (
                        <div key={oficina.id} className="p-4 border rounded-lg shadow-md bg-white">
                            <h3 className="text-lg font-semibold">{oficina.nome}</h3>
                            <p>CEP: {oficina.cep}</p>
                            <p>Endereço: {oficina.endereco}</p>
                            <p>Telefone: {oficina.telefone}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}