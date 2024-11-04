"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import DiagnosticoForm from "./diagnostico-form/index"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DiagnosticoPage() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
    }, [router])

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen">
                <div className="p-3 bg-white rounded shadow mx-auto w-full" style={{ maxWidth: '600px', minHeight: '400px' }}>
                    <h2 className="text-center mb-2 text-xl font-bold">
                        Diagnóstico do Veículo
                    </h2>
                    <DiagnosticoForm />
                </div>
            </div>
            <Footer />
        </>
    )
}
