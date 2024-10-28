import Banner from "@/components/Banner";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Localizacao from "@/components/Localizacao";
import Parceiros from "@/components/Parceiros";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Container />
      <Parceiros />
      <Localizacao />
      <Footer />
    </>
  )
}
