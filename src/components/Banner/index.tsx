import Link from "next/link";
import Image from "next/image";
import Oficina from "./assets/oficina.png";

export default function Banner() {
    return (
        <section className="relative flex flex-col items-center justify-center p-10 md:p-20">
            <Image 
                src={Oficina}
                alt="Imagem de oficina"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-0 filter brightness-50" 
            />
            <div className="relative z-10 text-center max-w-4xl">
                <h1 className="text-3xl md:text-5xl text-white font-bold">
                    Diagnóstico Automotivo Online
                </h1>
                <p className="text-lg md:text-2xl mt-5 mb-8 w-full text-white px-4 md:px-0">
                    Descubra rapidamente o que está causando o problema no seu carro com nosso diagnóstico online. Receba uma análise detalhada e precisa, sem precisar sair de casa, e saiba exatamente o que precisa ser feito para resolver a questão.
                </p>
                <Link href="/diagnostico" className="bg-blue-500 rounded p-3 text-white hover:bg-blue-600 transition">
                    Realizar Diagnóstico
                </Link>
            </div>
        </section>
    )
}
