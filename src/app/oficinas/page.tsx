import Footer from "@/components/Footer"
import Header from "@/components/Header"

const oficinasDummys = [
    {
        id: 1,
        nome: "Oficina do Carro",
        cep: "12345-678",
        endereco: "Rua A, 123 - Centro",
        telefone: "(11) 1234-5678",
    },
    {
        id: 2,
        nome: "Mecânica São Paulo",
        cep: "23456-789",
        endereco: "Avenida B, 456 - Jardim",
        telefone: "(11) 2345-6789",
    },
    {
        id: 3,
        nome: "Auto Peças e Serviços",
        cep: "34567-890",
        endereco: "Travessa C, 789 - Vila Nova",
        telefone: "(11) 3456-7890",
    },
    {
        id: 4,
        nome: "Oficina do Amigo",
        cep: "45678-901",
        endereco: "Rua D, 101 - Boa Vista",
        telefone: "(11) 4567-8901",
    },
    
]

export default function Oficinas() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-3xl font-bold mb-5">Oficinas</h2>
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {oficinasDummys.map((oficina) => (
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
