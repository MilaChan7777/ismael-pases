import {useState} from 'react';
import {Copy,Plus,ShieldCheck,LogIn,RefreshCw} from 'lucide-react';
export default function Admin(){
 const [secret,setSecret]=useState('');
 const [signed,setSigned]=useState(false);
 const [guests,setGuests]=useState([]);
 const [name,setName]=useState('');
 const [type,setType]=useState('individual');
 const [seats,setSeats]=useState(1);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [copied,setCopied]=useState('');
 async function load(key=secret){
  setBusy(true);setError('');
  try{
   const res=await fetch('/api/admin',{headers:{'x-admin-secret':key}});
   const json=await res.json();
   if(!res.ok)throw new Error(json.error||'No se pudo ingresar');
   setGuests(json.guests||[]);setSigned(true);
  }catch(e){setError(e.message)}finally{setBusy(false)}
 }
 async function create(e){
  e.preventDefault();setBusy(true);setError('');
  try{
   const res=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-secret':secret},body:JSON.stringify({guestName:name,greetingType:type,seats:Number(seats)})});
   const json=await res.json();if(!res.ok)throw new Error(json.error||'Error al crear');
   setName('');await load();
  }catch(e){setError(e.message)}finally{setBusy(false)}
 }
 async function copy(token){
   const url=`${window.location.origin}/i/${token}`;
   try{await navigator.clipboard.writeText(url);setCopied(token)}catch{setError('No se pudo copiar el enlace en este navegador')}
 }
 return <main className="admin-app">
  <header className="admin-head"><div><p>🌿 ADMINISTRACIÓN DE LA GRANJA</p><h1>Pases de Ismael</h1></div><a href="/i/demo">Ver portada</a></header>
  {!signed?<div className="login-panel"><ShieldCheck size={32}/><h2>Acceso al panel</h2><p>Ingresa la clave del administrador configurada en Vercel.</p><form onSubmit={e=>{e.preventDefault();load()}}><label>Clave de administración<input type="password" value={secret} onChange={e=>setSecret(e.target.value)} required autoComplete="off"/></label><button disabled={busy}><LogIn size={17}/>{busy?'Comprobando…':'Ingresar'}</button></form></div>:<>
    <section className="admin-stats"><div><span>Pases creados</span><strong>{guests.length}</strong></div><div><span>Cupos asignados</span><strong>{guests.reduce((n,g)=>n+g.seats,0)}</strong></div><button onClick={()=>load()} disabled={busy}><RefreshCw size={16}/> Actualizar</button></section>
    <section className="admin-box"><h2><Plus size={20}/> Nuevo pase personalizado</h2><form className="guest-form" onSubmit={create}>
     <label>Nombre del invitado o familia<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. Familia García" minLength={2} maxLength={90} required/></label>
     <label>Tipo<select value={type} onChange={e=>setType(e.target.value)}><option value="individual">Individual</option><option value="familia">Familiar</option></select></label>
     <label>Cupos<input type="number" value={seats} min={1} max={30} onChange={e=>setSeats(e.target.value)} required/></label>
     <button disabled={busy}>{busy?'Guardando…':'Crear pase'}</button>
    </form></section>
    <section className="admin-box"><h2>Invitados y enlaces</h2><div className="guest-list">
     {guests.map(g=><div key={g.id} className="guest-row"><div><strong>{g.guest_name}</strong><small>{g.greeting_type==='familia'?'Familiar':'Individual'} · {g.seats} {g.seats===1?'cupo':'cupos'} · {g.active?'Activo':'Inactivo'}</small></div><button onClick={()=>copy(g.token)}><Copy size={16}/>{copied===g.token?'Copiado':'Copiar enlace'}</button></div>)}
     {!guests.length&&<p>Aún no has creado pases.</p>}
    </div></section>
    <button className="logout" onClick={()=>{setSecret('');setSigned(false);setGuests([])}}>Cerrar sesión</button>
   </>}
   {error&&<div className="error-inline" role="alert">{error}</div>}
   <p className="admin-footer">Los enlaces y cupos se consultan desde el servidor. No compartas la clave del administrador.</p>
  </main>
}
