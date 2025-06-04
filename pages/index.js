import { Geist, Geist_Mono } from "next/font/google";
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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataToSend) => {
    setLoading(true);
    // console.log("Datos a enviar:", dataToSend); // Para depuración

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

      toast.success("¡Formulario enviado con éxito! Nos pondremos en contacto pronto.");
      reset();

    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
      toast.error(`Hubo un problema al enviar el formulario: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} relative min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden`}
    >
      {/* Fondo de Imagen */}
      <Image
        src="/nord.jpg" // Asegúrate de que esta ruta sea correcta
        alt="Fondo de ingeniería"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="z-0" // Asegura que la imagen esté detrás del contenido
      />

      {/* Overlay para oscurecer la imagen y mejorar la legibilidad en modo oscuro */}
      <div className="absolute inset-0 bg-gray-900 opacity-90 z-10"></div> {/* Oscurecido y más opaco */}

      <Toaster position="top-center" reverseOrder={false} />

      <main className="relative z-20 flex flex-col gap-8 items-center w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-lg">
          Contacto para Ingenieros
        </h1>
        <form
          className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-xl border border-gray-700 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-200 text-sm font-semibold mb-2"> {/* Texto más claro */}
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ej. Juan Pérez"
              className="py-3 px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out" 
              {...register("name", {
                required: "El campo nombre es obligatorio",
                minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p> 
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200 text-sm font-semibold mb-2"> {/* Texto más claro */}
              Correo Electrónico Profesional
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ejemplo@empresa.com"
              className="py-3 px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out" 
              {...register("email", {
                required: "El campo correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Formato de correo inválido"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1"> {/* Rojo más brillante para errores */}
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-200 text-sm font-semibold mb-2"> {/* Texto más claro */}
              Teléfono de Contacto
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+51 987 654 321"
              className="py-3 px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out" 
              {...register("phone", {
                required: "El campo teléfono es obligatorio",
                minLength: { value: 9, message: "El teléfono debe tener al menos 9 dígitos" },
                maxLength: { value: 9, message: "El teléfono no debe exceder 10 dígitos" },
                pattern: {
                  value: /^[0-9+() -]*$/,
                  message: "Formato de teléfono inválido"
                }
              })}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1"> {/* Rojo más brillante para errores */}
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
              rows="6"
              className="py-3 px-5 rounded-lg w-full border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out resize-y" 
              {...register("message", {
                required: "El campo mensaje es obligatorio",
                minLength: { value: 8, message: "El mensaje debe tener al menos 20 caracteres para ser descriptivo" }
              })}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-xs mt-1"> 
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-xl w-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

      {/* Footer mejorado en modo oscuro */}
      <footer className="absolute bottom-4 left-0 right-0 z-20 flex gap-6 flex-wrap items-center justify-center text-gray-300 text-sm"> {/* Texto más claro para el footer */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors duration-200"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} className="filter invert" />
          Aprende Next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors duration-200"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} className="filter invert" />
          Ejemplos
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors duration-200"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} className="filter invert" />
          nextjs.org
        </a>
      </footer>
    </div>
  );
}