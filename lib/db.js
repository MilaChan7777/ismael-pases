
export function getDbConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Faltan variables SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return { url, key };
}

export async function supabaseRequest(path, init = {}) {
  const { url, key } = getDbConfig();

  const headers = new Headers(init.headers);

  headers.set('apikey', key);
  headers.set('Content-Type', 'application/json');

  // Las claves sb_secret_ no deben enviarse como Bearer.
  // El acceso privilegiado se valida con el encabezado apikey.

  const response = await fetch(
    `${url}/rest/v1/${path}`,
    {
      ...init,
      headers
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    // Los detalles quedan en los logs del servidor.
    // Nunca registrar los valores de las claves.
    console.error(
      'Supabase error:',
      response.status,
      errorBody.slice(0, 500)
    );

    throw new Error(
      `Error de base de datos (${response.status})`
    );
  }

  const body = await response.text();

  return body ? JSON.parse(body) : null;
}

export function deny(res, status, message) {
  return res.status(status).json({ error: message });
}
