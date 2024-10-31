import Image from "next/image";
import Mapa from "./assets/mapa.png";
import Link from "next/link";

export default function Localizacao() {
    return (
        <section className="mt-16 p-12 bg-white flex flex-col lg:flex-row pb-10 items-center text-center lg:space-x-10">
            <div className="lg:w-1/2">
                <h1 className="font-bold text-4xl">Encontre Oficinas Próximas</h1>
                <p className="py-10 m-auto text-xl w-full lg:w-3/4">Estamos aqui para ajudar você a resolver os problemas do seu carro! Utilize nosso recurso de localização para encontrar oficinas confiáveis nas proximidades. Clique no botão abaixo e descubra onde você pode levar seu veículo.</p>
                <Link href="/oficinas" className=" bg-blue-500 rounded p-3 text-white hover:bg-blue-600 transition lg:mb-10">Ver Oficinas</Link>
            </div>
            <div className="lg:w-1/2">
                <Image src={Mapa} alt="Mapa de Localização" className="my-10 w-full h-auto rounded-2xl" />
            </div>
        </section>
    );
}
