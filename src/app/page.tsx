import { redirect } from "next/navigation";

// Este arquivo intercepta a rota '/' (raiz) e redireciona para o idioma padrão
export default function RootPage() {
  redirect("/pt");
}
