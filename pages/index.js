import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

// Inicializa las fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Inicializar Google Analytics para Perú
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Cargar Google Analytics
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-ZMZN19X7TX`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      // Configuración específica para Perú
      gtag("config", "G-ZMZN19X7TX", {
        country: "PE",
        currency: "PEN",
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataToSend) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok || result.status === "error") {
        const errorMessage =
          result.message ||
          "Error al enviar el formulario. Por favor intente nuevamente.";
        throw new Error(errorMessage);
      }

      // Evento de conversión para Facebook Pixel
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "CompleteRegistration");
      }

      // Eventos de conversión para Google Analytics (Perú)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "G-ZMZN19X7TX/register",
          value: 1.0,
          currency: "PEN",
        });

        window.gtag("event", "form_submit", {
          event_category: "lead",
          event_label: "Formulario de inscripción completado",
        });
      }

      toast.success("¡Registro exitoso! Redirigiendo...");
      reset();

      setTimeout(() => {
        window.location.href =
          "https://clubdeingenieros.vercel.app/cursos/analisis-cuencas-hidrograficas-qgis";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para abrir WhatsApp (número peruano)
  const openWhatsApp = () => {
    const phoneNumber = "51912345678"; // Número peruano (9 dígitos después del 51)
    const message =
      "Hola, estoy interesado en el curso gratuito de análisis de cuencas hidrográficas con QGIS";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Evento de Google Analytics para clic en WhatsApp
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "contact",
        event_label: "WhatsApp Click",
        value: 1,
      });
    }

    window.open(url, "_blank");
  };

  return (
    <>
      <Head>
        <title>
          Curso de Analisis de cuencas hidrograficas con QGIS| Club de
          Ingenieros
        </title>
        <meta
          name="description"
          content="Curso gratuito de análisis de cuencas hidrográficas con QGIS para ingenieros civiles, ambientales "
        />
        <meta name="google-site-verification" content="s7rwNtOiZLTsTJkm10Dj-B1CNfnpkSjX7iDkXcjEVF4" />
        <meta
          name="keywords"
          content="QGIS, Perú, ingeniería civil, cuencas hidrográficas, curso gratuito, ingenieros peruanos,certificado, capacitación, análisis de cuencas, SIG, sistemas de información geográfica"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://clubdeingenieros.vercel.app/contacto"
        />
        <meta
          property="og:title"
          content="Curso Gratuito de ANALISIS DE CUENCAS HIDROGRAFICAS CON QGIS"
        />
        <meta
          property="og:description"
          content="Aprende análisis de cuencas hidrográficas con QGIS en este curso gratuito para ingenieros ."
        />
        <meta
          property="og:image"
          content="https://formulario-iota-swart.vercel.app/fondo.webp"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://clubdeingenieros.vercel.app/contacto"
        />
        <meta
          property="twitter:title"
          content="Curso QGIS para Ingenieros Perú"
        />
        <meta
          property="twitter:description"
          content="Curso gratuito de análisis de cuencas con QGIS para ingenieros en Perú."
        />
        <meta
          property="twitter:image"
          content="https://clubdeingenieros.vercel.app/images/og-peru.jpg"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://clubdeingenieros.vercel.app/contacto"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* --- Facebook Pixel --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '7401436116637387');
              fbq('set', 'country', 'PE');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=7401436116637387&ev=PageView&noscript=1"
          />
        </noscript>
        {/* --- Fin Facebook Pixel --- */}

        {/* --- Google Tag Manager --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX'); // Reemplaza con tu ID de GTM
            `,
          }}
        />
        {/* --- Fin Google Tag Manager --- */}
      </Head>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" // Reemplaza con tu ID de GTM
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <div
        className={`${geistSans.className} ${geistMono.className} relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden`}
      >
        {/* Fondo de Imagen con temática peruana */}
        <Image
          src="/fondo.webp" // Cambia por una imagen relacionada a Perú
          alt="Paisaje de cuencas hidrográficas en Perú"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="z-0"
          priority
        />

        {/* Overlay para mejorar contraste y legibilidad */}
        <div className="absolute inset-0 bg-gray-900 opacity-50 z-10"></div>

        <div className="top-4 z-20 w-36 sm:w-50 h-auto flex items-center justify-center bg-blue-900 bg-opacity-70 p-4 rounded-lg shadow-xl border border-gray-700">
          <Image
            src="/LOGO.png"
            alt="Logo del Club de Ingenieros Perú"
            width={50}
            height={0}
            layout="responsive"
            objectFit="contain"
            priority
          />
        </div>

        <Toaster position="top-center" reverseOrder={false} />

        <main className="relative z-20 flex flex-col gap-8 items-center w-full max-w-sm sm:max-w-md lg:max-w-lg mt-0 sm:mt-0 pt-8">
          {/* Contenido de la tarjeta */}
          {!showForm && (
            <div className="bg-blue-900 bg-opacity-80 p-6 sm:p-8 rounded-xl shadow-xl border border-blue-700 w-full text-white text-center flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-xl sm:text-2xl font-bold">
                  CLUB DE INGENIEROS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-300">
                CURSO GRATUITO
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
                ANÁLISIS DE CUENCAS HIDROGRÁFICAS CON QGIS
              </p>
              <p className="text-sm sm:text-base text-gray-300">
                Capacitación especializada para ingenieros peruanos
              </p>

              {/* Botón principal de inscripción */}
              <button
                type="button"
                onClick={() => {
                  // Evento de Facebook Pixel para inicio de registro
                  if (typeof window !== "undefined" && window.fbq) {
                    window.fbq("track", "InitiateCheckout");
                  }
                  // Evento de Google Analytics
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "begin_checkout", {
                      currency: "PEN",
                      items: [
                        {
                          id: "curso-qgis-peru",
                          name: "Curso QGIS Perú",
                          category: "Educación",
                        },
                      ],
                    });
                  }
                  setShowForm(true);
                }}
                className="cursor-pointer py-3 px-8 rounded-xl bg-yellow-500 text-blue-900 font-extrabold text-xl sm:text-2xl hover:bg-yellow-400 transition-colors duration-300 ease-in-out shadow-lg transform hover:scale-105"
                aria-label="Inscríbete gratis al curso"
              >
                INSCRÍBETE GRATIS
              </button>

              {/* Botón de WhatsApp alternativo */}
              {/* <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 py-2 px-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Contáctanos por WhatsApp
              </button> */}
            </div>
          )}

          {/* Formulario que se muestra condicionalmente */}
          {showForm && (
            <form
              className="bg-blue-900 bg-opacity-90 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700 w-full"
              onSubmit={handleSubmit(onSubmit)}
              aria-label="Formulario de inscripción al curso QGIS Perú"
            >
              <p className="text-md sm:text-xl font-bold text-gray-300 text-center px-4 mb-6">
                Completa tus datos para inscribirte al curso gratuito.
              </p>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-200 text-sm font-semibold mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ej. Juan Pérez"
                  className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", {
                    required: "Por favor ingresa tu nombre completo",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-200 text-sm font-semibold mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Por favor ingresa tu correo electrónico",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Ingresa un correo electrónico válido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-200 text-sm font-semibold mb-2"
                >
                  Teléfono/Celular
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Ej. 987654321"
                  className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                  {...register("phone", {
                    required: "Por favor ingresa tu número de teléfono",
                    minLength: {
                      value: 9,
                      message: "El número debe tener 9 dígitos",
                    },
                    maxLength: {
                      value: 9,
                      message: "El número debe tener 9 dígitos",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Ingresa solo números (sin espacios ni guiones)",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="profession"
                  className="block text-gray-200 text-sm font-semibold mb-2"
                >
                  Profesión
                </label>
                <select
                  name="profession"
                  id="profession"
                  className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
                  {...register("profession", {
                    required: "Por favor selecciona tu profesión",
                  })}
                >
                  <option value="">Selecciona tu profesión</option>
                  <option value="Ingeniero Civil">Ingeniero Civil</option>
                  <option value="Ingeniero Ambiental">
                    Ingeniero Ambiental
                  </option>
                  <option value="Ingeniero Agrícola">Ingeniero Agrícola</option>
                  <option value="Ingeniero Hidráulico">
                    Ingeniero Hidráulico
                  </option>
                  <option value="Estudiante de Ingeniería">
                    Estudiante de Ingeniería
                  </option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.profession && (
                  <p className="text-red-400 text-xs mt-1" role="alert">
                    {errors.profession.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-200 text-sm font-semibold mb-2"
                >
                  ¿Qué esperas aprender en este curso? (Opcional)
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Escribe tus expectativas..."
                  rows="3"
                  className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out resize-y"
                  {...register("message")}
                ></textarea>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl w-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
                aria-busy={loading}
                aria-label={
                  loading ? "Enviando formulario" : "Enviar inscripción"
                }
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      role="status"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "ENVIAR INSCRIPCIÓN"
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mt-4 py-2 px-6 rounded-xl w-full bg-gray-600 text-white font-bold text-md hover:bg-gray-500 transition-colors duration-300 ease-in-out"
              >
                Volver
              </button>
            </form>
          )}
        </main>

        {/* Footer con enlaces semánticos y año dinámico */}
        <footer className="bottom-4 left-0 right-0 z-20 flex gap-4 sm:gap-6 flex-wrap items-center justify-center text-gray-300 text-xs sm:text-sm px-4">
          <span className="text-gray-200 text-center mt-2 w-full">
            © {new Date().getFullYear()} Club de Ingenieros | Todos los derechos
            reservados.
          </span>
        </footer>
      </div>
    </>
  );
}
