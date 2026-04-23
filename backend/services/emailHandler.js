// backend/services/emailHandler.js
import { resend } from "./resend.js";
import React from "react";
import ReactDOMServer from "react-dom/server";
import WelcomeEmail from "../templates/WelcomeEmail.jsx";

export async function sendWelcomeEmail(to, user) {
  // Renderizar JSX a HTML
  const emailHtml = ReactDOMServer.renderToStaticMarkup(
    <WelcomeEmail user={user} />,
  );

  try {
    const data = await resend.emails.send({
      from: "biblioteca@gmail.com", // dominio verificado en Resend
      to,
      subject: "Bienvenido a la Biblioteca Digital",
      html: emailHtml,
    });
    console.log("Correo enviado:", data);
    return data;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
}
