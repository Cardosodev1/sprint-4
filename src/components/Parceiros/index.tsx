import Image from "next/image";
import LogoPorto from "./assets/logo-porto.png";
import LogoFiap from "./assets/logo-fiap.png";

export default function Parceiros() {
    return (
        <section className="flex flex-col items-center text-center py-16">
            <h2 className="text-3xl font-bold mb-10">Nossos Parceiros</h2>
            <p className="text-lg mb-12 max-w-xl mx-auto">
                Contamos com o apoio de grandes nomes como Porto Seguro e FIAP, fortalecendo nossa missão de oferecer soluções automotivas confiáveis e inovadoras para você.
            </p>
            <div className="flex flex-wrap justify-center gap-16">
                <Image
                    src={LogoPorto}
                    alt="Logo Porto Seguro"
                    width={200}
                    height={50}
                    className="hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={LogoFiap}
                    alt="Logo FIAP"
                    width={200}
                    height={50}
                    className="hover:scale-105 transition-transform duration-300"
                />
            </div>
        </section>
    )
}
