import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegistroPWA } from "@/components/RegistroPWA";
import { SITIO } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: SITIO.nombre,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  authors: [{ name: SITIO.autor }],
  applicationName: "Ronald M.",
  appleWebApp: {
    capable: true,
    title: "Ronald M.",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: SITIO.nombre,
    description: SITIO.descripcion,
    type: "website",
    locale: "es_BO",
    siteName: SITIO.nombre,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  // Necesario para que el contenido llegue a los bordes en celulares con
  // muesca cuando la app corre a pantalla completa.
  viewportFit: "cover",
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
          <RegistroPWA />
        </ThemeProvider>
      </body>
    </html>
  );
}
