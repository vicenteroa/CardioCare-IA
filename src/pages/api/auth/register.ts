import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'
import { app } from '../../../firebase/server'
import { getFirestore } from 'firebase-admin/firestore'
import * as bcrypt from 'bcrypt'
export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app)
  const db = getFirestore(app)

  /* Obtener los datos del formulario */
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const name = formData.get('name')?.toString()
  const Rut = formData.get('Rut')?.toString()

  if (!email || !password || !name || !Rut) {
    return new Response(
      'Faltan datos del formulario',
      { status: 400 }
    )
  }

  /* Verificar la unicidad del correo electrónico */
  const usersRef = db.collection('users')
  const snapshot = await usersRef.where('email', '==', email).get()
  if (!snapshot.empty) {
    return new Response(
      'El correo electrónico ya está en uso',
      { status: 400 }
    )
  }

  /* Encriptar la contraseña */
  const hashedPassword = await bcrypt.hash(password, 10)

  /* Crear un usuario */
  try {
    const userRecord = await auth.createUser({
      email,
      // eslint-disable-next-line object-shorthand
      password: password,
      displayName: name
    })

    /* Añadir el usuario a Firestore */
    await usersRef.doc(userRecord.uid).set({
      name,
      email,
      password: hashedPassword,
      Rut
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(
      'Algo salió mal' + error,
      { status: 400 }
    )
  }
  return redirect('/signin')
}
