import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'
import { app } from '../../../firebase/server'
import { getFirestore } from 'firebase-admin/firestore'
import * as bcrypt from 'bcrypt'
export const POST: APIRoute = async ({ request }) => {
  const auth = getAuth(app)
  const db = getFirestore(app)

  /* Obtener los datos del formulario */
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const name = formData.get('name')?.toString()
  const Rut = formData.get('Rut')?.toString()
  const Terminos = formData.get('terms')?.toString()

  if (!email || !password || !name || !Rut) {
    return new Response(JSON.stringify({
      status: 400,
      message: 'Faltan datos en el formulario'
    }), { status: 400 })
  }

  /* Verificar la unicidad del correo electrónico */
  const usersRef = db.collection('users')
  const snapshot = await usersRef.where('email', '==', email).get()

  if (!snapshot.empty) {
    return new Response(JSON.stringify({
      status: 400,
      message: 'El correo ya está en uso'
    }), { status: 400 })
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
      Rut,
      Terminos
    })
    return new Response(JSON.stringify({
      status: 200,
      message: 'Usuario creado con éxito'
    }), { status: 200 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({
      status: 400,
      message: 'Algo salió mal' + error
    }), { status: 400 })
  }
}
