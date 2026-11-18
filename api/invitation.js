import {supabaseRequest,deny} from '../lib/db.js';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET') return deny(res,405,'Método no permitido');
  const token=typeof req.query.token==='string'?req.query.token:'';
  if(!/^[A-Za-z0-9_-]{8,80}$/.test(token)) return deny(res,404,'Pase no encontrado');
  try {
    const matches=await supabaseRequest(`invitations?select=guest_name,greeting_type,seats&token=eq.${encodeURIComponent(token)}&active=eq.true&limit=1`);
    if(!matches?.length) return deny(res,404,'Pase no encontrado');
    return res.status(200).json({guestName:matches[0].guest_name,greetingType:matches[0].greeting_type,seats:matches[0].seats});
  } catch(e){return deny(res,500,'No se pudo consultar el pase');}
}
