import crypto from 'node:crypto';
import {supabaseRequest,deny} from '../lib/db.js';
function authorized(req){
  const secret=process.env.ADMIN_SECRET;
  if(!secret || secret.length<24) return false;
  const supplied=req.headers['x-admin-secret'] || '';
  if(typeof supplied!=='string') return false;
  const a=Buffer.from(secret); const b=Buffer.from(supplied);
  return a.length===b.length && crypto.timingSafeEqual(a,b);
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(!authorized(req))return deny(res,401,'Acceso no autorizado');
  if(!['GET','POST'].includes(req.method))return deny(res,405,'Método no permitido');
  try{
    if(req.method==='GET'){
      const data=await supabaseRequest('invitations?select=id,token,guest_name,greeting_type,seats,active,created_at&order=created_at.desc&limit=300');
      return res.status(200).json({guests:data});
    }
    const {guestName,greetingType,seats}=req.body||{};
    if(typeof guestName!=='string'||guestName.trim().length<2||guestName.trim().length>90) return deny(res,400,'Nombre inválido');
    if(!['individual','familia'].includes(greetingType))return deny(res,400,'Tipo inválido');
    if(!Number.isInteger(seats)||seats<1||seats>30)return deny(res,400,'Cupos inválidos');
    const token=crypto.randomBytes(18).toString('base64url');
    const inserted=await supabaseRequest('invitations',{
      method:'POST',
      headers:{Prefer:'return=representation'},
      body:JSON.stringify({token,guest_name:guestName.trim(),greeting_type:greetingType,seats})
    });
    return res.status(201).json({guest:inserted?.[0]});
  } catch(e){return deny(res,500,'No se pudo completar la operación');}
}
