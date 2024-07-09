import Image from "next/image";
import Header from "./components/header"
import Products from "./components/products";
import Footer from "./components/footer";
export default function Home() {
  return (
    <main>
      <Header></Header>
      <Products/>
      <Footer/>
    </main>
  );
}

// mongodb://localhost:27017