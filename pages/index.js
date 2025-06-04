import { Geist, Geist_Mono } from "next/font/google";
import Head from 'next/head';
import Image from "next/image";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';

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
        const errorMessage = result.message || "Error desconocido al enviar el formulario.";
        throw new Error(errorMessage);
      }

      toast.success("¡Formulario enviado con éxito! Redirigiendo...");
      reset();

      // Redirigir a página externa después de 2 segundos
      setTimeout(() => {
        window.location.href = "https://kick.com/pieroarenast/clips?sort=view&range=month"; // Reemplaza con tu URL
      }, 500);

    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
      toast.error(`Hubo un problema al enviar el formulario: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contacto para Ingenieros | Consultoría Profesional</title>
        <meta name="description" content="Formulario de contacto especializado para ingenieros. Envíanos tu consulta o proyecto y te responderemos a la brevedad." />
        <meta name="keywords" content="ingeniería, consultoría, contacto, proyectos, asesoría técnica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tusitio.com/contacto" />
        <meta property="og:title" content="Contacto para Ingenieros | Consultoría Profesional" />
        <meta property="og:description" content="Formulario de contacto especializado para ingenieros. Envíanos tu consulta o proyecto." />
        <meta property="og:image" content="https://tusitio.com/images/og-contact.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tusitio.com/contacto" />
        <meta property="twitter:title" content="Contacto para Ingenieros | Consultoría Profesional" />
        <meta property="twitter:description" content="Formulario de contacto especializado para ingenieros. Envíanos tu consulta o proyecto." />
        <meta property="twitter:image" content="https://tusitio.com/images/og-contact.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://tusitio.com/contacto" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div
        className={`${geistSans.className} ${geistMono.className} relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden`}
      >
        {/* Fondo de Imagen con atributos alt descriptivos */}
        <Image
          src="/nord.jpg"
          alt="Fondo técnico de ingeniería con esquemas y herramientas de diseño"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="z-0"
          priority
        />

        {/* Overlay para mejorar contraste y legibilidad */}
        <div className="absolute inset-0 bg-gray-900 opacity-90 z-10"></div>
        
        <div className="top-4 z-20 w-36 sm:w-50 h-auto flex items-center justify-center bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-xl border border-gray-700">
          <Image
            src="/LOGO.png"
            alt="Logo de Consultoría de Ingeniería Profesional"
            width={50}
            height={0}
            layout="responsive"
            objectFit="contain"
            priority
            className=""
          />
        </div>

        <Toaster position="top-center" reverseOrder={false} />

        <main className="relative z-20 flex flex-col gap-8 items-center w-full max-w-sm sm:max-w-md lg:max-w-lg mt-0 sm:mt-0 pt-8">
          <p className="text-md sm:text-xl font-bold text-gray-300 text-center px-4">
            Envíanos tu consulta o proyecto. Nuestro equipo de expertos te responderá pronto.
          </p>
          
          {/* Formulario accesible con ARIA */}
          <form
            className="bg-gray-800 bg-opacity-90 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700 w-full"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Formulario de contacto para servicios de ingeniería"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-200 text-sm font-semibold mb-2">
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
                  required: "El campo nombre es obligatorio",
                  minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
                })}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-200 text-sm font-semibold mb-2">
                Correo Electrónico Profesional
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="ejemplo@empresa.com"
                className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "El campo correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Formato de correo inválido"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-200 text-sm font-semibold mb-2">
                Teléfono de Contacto
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+51 987 654 321"
                className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
                {...register("phone", {
                  required: "El campo teléfono es obligatorio",
                  minLength: { value: 9, message: "El teléfono debe tener al menos 9 dígitos" },
                  maxLength: { value: 15, message: "El teléfono no debe exceder 15 caracteres" },
                  pattern: {
                    value: /^[0-9+() -]*$/,
                    message: "Formato de teléfono inválido"
                  }
                })}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-200 text-sm font-semibold mb-2">
                Describe tu Consulta o Proyecto
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Explica detalladamente tu necesidad o proyecto..."
                rows="5" 
                className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out resize-y"
                aria-required="true"
                aria-invalid={errors.message ? "true" : "false"}
                {...register("message", {
                  required: "El campo mensaje es obligatorio",
                  minLength: { value: 8, message: "El mensaje debe tener al menos 8 caracteres para ser descriptivo" }
                })}
              ></textarea>
              {errors.message && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl w-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
              aria-busy={loading}
              aria-label={loading ? "Enviando formulario" : "Enviar consulta"}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar Consulta"
              )}
            </button>
          </form>
        </main>

        {/* Footer con enlaces semánticos y año dinámico */}
        <footer className="bottom-4 left-0 right-0 z-20 flex gap-4 sm:gap-6 flex-wrap items-center justify-center text-gray-300 text-xs sm:text-sm px-4">
          {/* <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors duration-200"
            href="https://tusitio.com/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a la política de privacidad"
          >
            <Image aria-hidden src="/shield.svg" alt="" width={16} height={16} className="filter invert" />
            Privacidad
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors duration-200"
            href="https://tusitio.com/terminos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a los términos y condiciones"
          >
            <Image aria-hidden src="/file-text.svg" alt="" width={16} height={16} className="filter invert" />
            Términos
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors duration-200"
            href="mailto:contacto@tusitio.com"
            rel="noopener noreferrer"
            aria-label="Enviar un correo electrónico para contactar"
          >
            <Image aria-hidden src="/mail.svg" alt="" width={16} height={16} className="filter invert" />
            Contacto
          </a> */}
          <span className="text-gray-400 text-center mt-2 w-full">
            © {new Date().getFullYear()} Consultoría Ingeniería
          </span>
        </footer>
      </div>
    </>
  );
}