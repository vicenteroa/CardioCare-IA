import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString(); //boton de enviar ojito
  const age = formData.get("age")?.toString();
  const isBestFriend = formData.get("isBestFriend") === "on";

  if (!name || !age) {
    return new Response("Faltan campos obligatorios", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const friendsRef = db.collection("friends"); //Vendria a ser parte del testimonio.
    await friendsRef.add({
      name,
      age: parseInt(age),
      isBestFriend,
    });
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};