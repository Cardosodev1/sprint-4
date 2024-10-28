import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrcamentoForm from "./orcamento-form/index";

export default function OrcamentoPage() {
    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen">
                <div className="p-3 bg-white rounded shadow mx-auto w-full" style={{ maxWidth: '600px', minHeight: '400px' }}>
                    <h2 className="text-center mb-2 text-xl font-bold">
                        Orçamento do Veículo
                    </h2>
                    <OrcamentoForm />
                </div>
            </div>
            <Footer />
        </>
    )
}
