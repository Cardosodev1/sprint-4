import Image from 'next/image'
import Logo from './assets/Logo.png'
import Usuario from './assets/Usuário.svg'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="flex justify-between bg-white items-center p-3 md:justify-around">
            <div className="flex items-center">
                <Link href="/">
                    <Image src={Logo} alt="logo auto problems" width={200} height={20} className="w-[150px] md:w-[200px] lg:w-[300px]"/>
                </Link>
            </div>
            <nav className="hidden md:flex">
                <ul className="flex gap-4 md:gap-8">
                    <li>
                        <Link href="/diagnostico" className="hover:text-blue-500">Diagnosticar Problema</Link>
                    </li>
                    <li>
                        <Link href="/orcamento" className="hover:text-blue-500">Ver Orçamentos</Link>
                    </li>
                    <li>
                        <Link href="/oficinas" className="hover:text-blue-500">Localizar Oficinas</Link>
                    </li>
                </ul>
            </nav>
            <Link href="/login" className="flex items-center gap-3 hover:text-blue-500">
                <Image src={Usuario} alt="imagem usuário" className="w-6 h-6 md:w-auto md:h-auto"/>
                <p className="text-sm md:text-base">Fazer login</p>
            </Link>
        </header>
    )
}
