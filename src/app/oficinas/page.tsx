import Footer from "@/components/Footer";
import Header from "@/components/Header";

const oficinasDummys = [
    {
        id: 1,
        nome: "Oficina do Carro",
        endereco: "Rua A, 123 - Centro",
        telefone: "(11) 1234-5678",
        site: "#"
    },
    {
        id: 2,
        nome: "Mecânica São Paulo",
        endereco: "Avenida B, 456 - Jardim",
        telefone: "(11) 2345-6789",
        site: "#"
    },
    {
        id: 3,
        nome: "Auto Peças e Serviços",
        endereco: "Travessa C, 789 - Vila Nova",
        telefone: "(11) 3456-7890",
        site: "#"
    },
    {
        id: 4,
        nome: "Oficina do Amigo",
        endereco: "Rua D, 101 - Boa Vista",
        telefone: "(11) 4567-8901",
        site: "#"
    },
];

export default function Oficinas() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold mb-5">Oficinas Próximas</h2>
                <div className="w-full max-w-2xl">
                    <ul className="space-y-6">
                        {oficinasDummys.map((oficina) => (
                            <li key={oficina.id} className="p-4 border rounded-lg shadow-md bg-white">
                                <h3 className="text-lg font-semibold">{oficina.nome}</h3>
                                <p>{oficina.endereco}</p>
                                <p>Telefone: {oficina.telefone}</p>
                                <p className="text-blue-500 hover:underline cursor-pointer" rel="noopener noreferrer">Visite o site</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}
