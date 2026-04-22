// src/components/email/WelcomeEmail.jsx
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Button } from "@react-email/button";

export default function WelcomeEmail({ user }) {
  return (
    <Html>
      <Text>Hola {user}, ¡bienvenido a la Biblioteca Digital!</Text>
      <Button href="https://tu-biblioteca.com">Explorar libros</Button>
    </Html>
  );
}
