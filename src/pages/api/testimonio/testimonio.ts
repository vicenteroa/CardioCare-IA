import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import * as bcrypt from 'bcrypt';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("nombreDeUsuario")?.toString(); //boton de enviar ojito
  const uid = formData.get("uid")?.toString();
  const pregunta1 = formData.get("chestPain")?.toString(); // Respuesta a la pregunta 1
  const pregunta2 = formData.get("shortnessOfBreath")?.toString(); // Respuesta a la pregunta 2
  const pregunta3 = formData.get("familyHistory")?.toString(); // Respuesta a la pregunta 3
  const testimonioTexto = formData.get('textoTestimonio')?.toString(); // Contenido del testimonio

  if (!name|| !uid || !pregunta1 || !pregunta2 || !pregunta3|| !testimonioTexto) {
    return new Response('Faltan campos obligatorios', { status: 400 });
  }

  try {
    const db = getFirestore(app);
    const testRef = db.collection("testimonio"); //Vendria a ser parte del testimonio.
    const currentDate = new Date(); //Se obtiene la fecha y hora actual del servidor
    const timestamp = currentDate.toISOString();
    const encryptedText = await bcrypt.hash(testimonioTexto, 10); // Encriptar el texto del testimonio
    await testRef.add({
      name,
      uid,
      pregunta1,
      pregunta2,
      pregunta3,
      testimonioTexto: encryptedText,
      timestamp
    });
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }
  return redirect("/IA");
};