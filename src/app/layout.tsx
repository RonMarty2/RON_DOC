import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITIO } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: SITIO.nombre,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  authors: [{ name: SITIO.autor }],
  openGraph: {
    title: SITIO.nombre,
    description: SITIO.descripcion,
    type: "website",
    locale: "es_BO",
    siteName: SITIO.nombre,
  },
};

// Script inline para aplicar el tema ANTES del primer pintado y evitar parpadeo.
const TEMA_INICIAL = `
(function() {
  try {
    var t = localStorage.getItem('ron-doc-tema');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
    if (t === 'oscuro') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_INICIAL }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
