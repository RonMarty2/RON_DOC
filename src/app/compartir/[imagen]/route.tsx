import { imagenCompartir, imagenesParaCompartir } from "@/lib/imagen-compartir";

// Una imagen PNG por página, generada al compilar: out/compartir/<clave>.png.
// Con extensión en el nombre, para que GitHub Pages la sirva como image/png
// (el `opengraph-image` de Next sale sin extensión y WhatsApp puede ignorarlo).
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(imagenesParaCompartir()).map((clave) => ({ imagen: `${clave}.png` }));
}

export async function GET(_: Request, { params }: { params: Promise<{ imagen: string }> }) {
  const { imagen } = await params;
  const contenido = imagenesParaCompartir()[imagen.replace(/\.png$/, "")];
  if (!contenido) return new Response("No existe", { status: 404 });
  return imagenCompartir(contenido);
}
