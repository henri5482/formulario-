// Este es el código que iría en pages/api/contacto.js (o app/api/contacto/route.ts si usas App Router)

// Importa NextApiResponse y NextApiRequest para tipado si usas Pages Router.
// Si usas App Router, no necesitas estos imports para tipado en Route Handlers.
// import type { NextApiRequest, NextApiResponse } from 'next'; 

export default async function handler(req, res) {
  // Solo permite solicitudes POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Método no permitido. Solo se aceptan solicitudes POST." });
  }

  // Valida que el cuerpo de la solicitud exista y sea un objeto
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Cuerpo de la solicitud inválido o vacío." });
  }

  const data = req.body;
  console.log("Datos recibidos en la API:", data); // Esto es útil para depuración

  const scriptUrl = process.env.GOOGLE_SCRIPT_FROM;

  // Asegúrate de que GOOGLE_SCRIPT_FROM esté definida
  if (!scriptUrl) {
    console.error("Error de configuración: GOOGLE_SCRIPT_FROM no está definida en las variables de entorno.");
    return res.status(500).json({ 
      status: "error", 
      message: "Error de configuración del servidor. Por favor, contacta al administrador." 
    });
  }

  try {
    // Implementa un tiempo de espera (timeout) para las solicitudes a Apps Script
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Puedes añadir un User-Agent si quieres identificar la fuente de la solicitud en Apps Script
        "User-Agent": "Next.js Contact Form API" 
      },
      body: JSON.stringify(data),
      signal: controller.signal // Asocia el signal del AbortController a la solicitud
    });

    clearTimeout(timeoutId); // Limpia el timeout si la solicitud se completa a tiempo

    // Manejo de respuestas no exitosas de Apps Script
    if (!response.ok) {
      let errorMessage = `Error de Apps Script: ${response.status} - ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Ignora si no se puede parsear como JSON, usa el mensaje por defecto
      }
      console.error("Error al enviar datos a Apps Script:", errorMessage);
      return res.status(response.status).json({ 
        status: "error", 
        message: errorMessage 
      });
    }

    const result = await response.json();

    // Puedes añadir una validación simple de la respuesta de Apps Script si devuelve un formato específico
    if (result.status === "error") {
      console.error("Apps Script reportó un error:", result.message);
      return res.status(400).json(result); // Devuelve el error tal cual de Apps Script
    }

    return res.status(200).json({ 
      status: "success", 
      message: "Formulario enviado con éxito.", 
      data: result 
    });

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("La solicitud a Apps Script excedió el tiempo límite:", error.message);
      return res.status(504).json({ // 504 Gateway Timeout
        status: "error", 
        message: "La operación tardó demasiado en responder. Por favor, inténtalo de nuevo." 
      });
    }
    console.error("Error inesperado en la API de contacto:", error.message, error.stack);
    return res.status(500).json({ 
      status: "error", 
      message: `Error interno del servidor: ${error.message}` 
    });
  }
}