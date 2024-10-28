import Image from "next/image";
import Diagnostico from "./assets/diagnostico.png";
import Orcamento from "./assets/orcamento.png";
import Oficina from "./assets/oficina.png";
import Link from "next/link";

export default function Container() {
    return (
        <section className="pt-20 flex flex-col text-center bg-white mt-28">
            <h1 className="text-4xl font-bold">O que é a Auto Problems?</h1>
            <p className="text-xl mb-12 mt-5 max-w-3xl mx-auto">
                A Auto Problems é uma plataforma completa para soluções automotivas. Desenvolvemos este espaço para facilitar o acesso a diagnósticos precisos, orçamentos personalizados e a localização das oficinas da Porto Seguro mais próximas de você.
            </p>
            <ul className="flex flex-col md:flex-row justify-around mb-10 px-4">
                <li className="flex flex-col items-center mb-10 md:mb-0">
                    <Image src={Diagnostico} alt="chatbot de diagnóstico" className="w-48 h-40 md:w-56 md:h-48" />
                    <h3 className="font-bold text-xl mt-5 mb-3">Diagnóstico</h3>
                    <p className="px-4 text-center">Identifique o problema do seu carro e saiba qual é o melhor conserto.</p>
                </li>
                <li className="flex flex-col items-center mb-10 md:mb-0">
                    <Image src={Orcamento} alt="calculadora para o orçamento" className="w-36 h-40 md:w-48 md:h-48" />
                    <h3 className="font-bold text-xl mt-5 mb-3">Orçamento</h3>
                    <p className="px-4 text-center">Compare preços para serviços de mecânica nas oficinas perto de você.</p>
                </li>
                <li className="flex flex-col items-center mb-10 md:mb-0">
                    <Image src={Oficina} alt="ferramentas de oficina" className="w-48 h-40 md:w-56 md:h-48" />
                    <h3 className="font-bold text-xl mt-5 mb-3">Oficina</h3>
                    <p className="px-4 text-center">Localize oficinas próximas e receba orçamentos de forma rápida.</p>
                </li>
            </ul>
            <Link href="/orcamento" className="m-auto mb-20 bg-blue-500 rounded p-3 text-white hover:bg-blue-600 transition">
                    Obter Orçamento
            </Link>
        </section>
    );
}
