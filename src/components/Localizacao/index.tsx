import Image from "next/image";
import Mapa from "./assets/mapa.png"
import Link from "next/link";

export default function Localizacao() {
    return (
        <section className="mt-16 pt-12 bg-white flex pb-10 items-center text-center">
            <div>
                <h1 className="font-bold text-4xl">Encontre Oficinas Próximas</h1>
                <p className="mt-5 mb-10 w-3/4 m-auto">Estamos aqui para ajudar você a resolver os problemas do seu carro! Utilize nosso recurso de localização para encontrar oficinas confiáveis nas proximidades. Clique no botão abaixo e descubra onde você pode levar seu veículo.</p>
                <Link href="/oficinas" className="m-auto mb-20 bg-blue-500 rounded p-3 text-white hover:bg-blue-600 transition">Ver Oficinas</Link>
            </div>
            <Image src={Mapa} alt="Mapa de Localização" className="mr-10"></Image>
        </section>
    )
}