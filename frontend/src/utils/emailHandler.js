// src/utils/emailHandler.js
import { resend } from "./resend";
import WelcomeEmail from "../components/email/WelcomeEmail.jsx";
import React from "react";
import ReactDOMServer from "react-dom/server";

export async function sendWelcomeEmail(to, user) {
  // Renderizar JSX a HTML
  const emailHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(WelcomeEmail, { user }),
  );

  try {
    const data = await resend.emails.send({
      from: "biblioteca@tu-dominio.com",
      to,
      subject: "Bienvenido a la Biblioteca Digital",
      html: emailHtml,
    });
    console.log("Correo enviado:", data);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
}
