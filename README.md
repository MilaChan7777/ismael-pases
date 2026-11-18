# Invitación personalizada · Ismael Alejandro 🚜

Este proyecto **sí incluye los archivos fuente de React** y utiliza la ilustración original de la granja compartida en el chat.

## Lo que hace
- Una sola portada para todos los invitados (`/i/:token`).
- Paisaje de granja real, tractor animado, pase de madera, saludo personalizado y número de cupos.
- Botón para abrir **tu Canva Site ya publicado**.
- Panel `/admin` para agregar invitados y copiar enlaces, respaldado por Supabase a través de funciones privadas de Vercel.
- Ruta `/i/demo` para ver el diseño sin base de datos.

## 1. Vista local (sin backend)

Instala Node.js 20 o posterior. Luego desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Entra a `http://localhost:5173/i/demo` para ver la animación de ejemplo.

La ruta `/admin` **no funciona en el servidor de desarrollo de Vite**: requiere las funciones serverless de Vercel y las variables de entorno. Para probar todo con la CLI de Vercel, usa `vercel dev` una vez configuradas las variables.

## 2. Publica la invitación principal de Canva

En Canva, usa **Compartir → Sitio web → Publicar**. Copia el enlace público (normalmente `https://...canva.site/...`), **no** el enlace del editor `/edit`.

En la raíz del proyecto, crea `.env.local` y coloca:

```env
VITE_CANVA_INVITATION_URL=https://TU-SITIO-PUBLICADO.canva.site/
```

Reinicia el servidor Vite. El botón «¡ABRIR INVITACIÓN!» enviará a esa URL.

## 3. Configura Supabase

1. Crea un proyecto en Supabase.
2. Abre **SQL Editor** y ejecuta `sql/schema.sql`.
3. Busca la URL del proyecto y la clave privada **service_role** en la configuración API de Supabase. **No compartas nunca esa clave ni la coloques en archivos `VITE_`**.
4. Crea una clave larga (mínimo 24 caracteres) para `ADMIN_SECRET`.

## 4. Publica en Vercel

1. Sube este proyecto a un repositorio GitHub o impórtalo desde Vercel.
2. Framework: **Vite**. Build command `npm run build`; carpeta de salida `dist`.
3. En *Project Settings → Environment Variables* añade:
   - `SUPABASE_URL` (servidor)
   - `SUPABASE_SERVICE_ROLE_KEY` (servidor; secreta)
   - `ADMIN_SECRET` (servidor; secreta)
   - `VITE_CANVA_INVITATION_URL` (pública)
4. Despliega. Abre `https://TU-DOMINIO.vercel.app/admin` y escribe la misma `ADMIN_SECRET`.
5. Añade «Familia García», 4 cupos, y pulsa «Copiar enlace». La URL se verá así: `https://TU-DOMINIO.vercel.app/i/UN_TOKEN_ALEATORIO`.

**Importante:** si cambias las variables de entorno tendrás que redeplegar para que se apliquen.

## Cómo funciona técnicamente

- Los enlaces utilizan tokens aleatorios generados en el servidor (18 bytes de aleatoriedad).
- Las páginas `/i/:token` consultan **solo nombre, tipo de saludo y número de cupos**.
- La tabla Supabase tiene RLS activado y no tiene políticas públicas.
- El navegador **nunca recibe** las credenciales Supabase.
- La administración se comprueba en el servidor mediante una clave que no se almacena persistentemente en el navegador.

## Qué falta para un sistema comercial completo

- Autenticación de administradores con Supabase Auth o equivalente, MFA y rate limiting en la API de administración.
- Funciones para editar, desactivar y reenviar pases.
- Confirmación de asistencia conectada a cada token; por ahora la portada entrega el enlace a la invitación de Canva pero **no almacena RSVP**.
- Reemplazar el tractor SVG provisional por el tractor ilustrado exacto extraído como PNG transparente si deseas fidelidad total.
- Verificación en móviles y accesibilidad antes de compartir con los invitados.

No uses datos reales de invitados en la demo. Publica en Vercel y comprueba el funcionamiento del backend antes de distribuir pases personalizados.
