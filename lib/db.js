// Solo para funciones del servidor de Vercel; NO importar en src/.
export function getDbConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Faltan variables SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  return { url, key };
}
export async function supabaseRequest(path, init={}) {
  const {url,key}=getDbConfig();
  const response=await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey:key, Authorization:`Bearer ${key}`, 'Content-Type':'application/json', ...init.headers }
  });
  if(!response.ok) throw new Error(`Error de base de datos (${response.status})`);
  const body=await response.text();
  return body ? JSON.parse(body) : null;
}
export function deny(res, status, message) {return res.status(status).json({error:message});}
