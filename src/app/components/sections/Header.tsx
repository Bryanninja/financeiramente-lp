import { div, section } from "framer-motion/client";
import Container from "../ui/Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-dark py-4">
      <Container className="flex justify-between">
        <img
          src="/logo-financeiramente.svg"
          alt="logo financeiramente"
          className="w-48"
        />

        <nav>
          <ul>
            <li className="text-light flex gap-6">
              <Link href="/">Home</Link>
              <Link href="/">O Mapa</Link>
              <Link href="/">O Método</Link>
              <Link href="/">Sobre</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
