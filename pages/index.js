import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast'; // Para notificaciones al usuario

// Inicializa las fuentes (esto ya lo tienes)
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

      // Manejo de errores basado en la respuesta de la API
      if (!response.ok || result.status === "error") {
        const errorMessage = result.message || "Error desconocido al enviar el formulario.";
        throw new Error(errorMessage); // Lanza el error para que sea capturado por el catch
      }

      toast.success("¡Formulario enviado con éxito! Nos pondremos en contacto pronto.");
      reset(); // Limpia el formulario solo si el envío fue exitoso

    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
      toast.error(`Hubo un problema al enviar el formulario: ${error.message}`);
    } finally {
      setLoading(false); // Siempre desactiva el loading al finalizar
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Toaster position="top-center" reverseOrder={false} /> {/* Componente para mostrar las notificaciones */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form
          className="border border-neutral-300 p-8 rounded-2xl min-w-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ingresa tu nombre"
              className="py-4 px-6 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              {...register("name", {
                required: "El campo nombre es obligatorio",
                minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo
            </label>
            <input
              type="email" // Cambiado a type="email" para mejor validación nativa
              name="email"
              id="email"
              placeholder="Ingresa tu correo"
              className="py-4 px-6 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              {...register("email", {
                required: "El campo correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Formato de correo inválido"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Ingresa tu celular"
              className="py-4 px-6 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              {...register("phone", {
                required: "El campo teléfono es obligatorio",
                minLength: { value: 7, message: "El teléfono debe tener al menos 7 dígitos" },
                maxLength: { value: 15, message: "El teléfono no debe exceder 15 dígitos" },
                pattern: {
                  value: /^[0-9+() -]*$/, // Permite números, +, paréntesis, guiones y espacios
                  message: "Formato de teléfono inválido"
                }
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Mensaje
            </label>
            <textarea
              name="message" // Cambiado de 'type="text"' a solo 'name' para textarea
              id="message"
              placeholder="Ingresa tu mensaje"
              rows="5" // Añade filas para que el textarea sea más grande
              className="py-4 px-6 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              {...register("message", {
                required: "El campo mensaje es obligatorio",
                minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" }
              })}
            ></textarea> {/* Cierre correcto de textarea */}
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <button 
            type="submit" // Siempre es buena práctica especificar type="submit"
            className="py-4 px-6 rounded-xl w-full bg-cyan-800 text-white font-bold hover:bg-cyan-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Deshabilita el botón mientras se envía el formulario
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Tu footer existente */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}