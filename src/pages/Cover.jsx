import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {Ticket,AlertCircle} from 'lucide-react';
import Tractor from '../components/Tractor.jsx';
import {CANVA_URL,DEMO_INVITATION} from '../config.js';
export default function Cover(){
 const {token}=useParams();
 const [data,setData]=useState(token==='demo'?DEMO_INVITATION:null);
 const [loading,setLoading]=useState(token!=='demo');
 const [error,setError]=useState('');
 const [arrived,setArrived]=useState(false);
 useEffect(()=>{
   if(token==='demo')return;
   const c=new AbortController();
   setLoading(true);
   fetch(`/api/invitation?token=${encodeURIComponent(token)}`,{signal:c.signal})
     .then(async r=>{if(!r.ok)throw new Error(r.status===404?'Este pase no existe o está desactivado.':'No pudimos cargar tu pase.');return r.json()})
     .then(setData).catch(e=>{if(e.name!=='AbortError')setError(e.message)}).finally(()=>setLoading(false));
   return ()=>c.abort();
 },[token]);
 useEffect(()=>{const t=setTimeout(()=>setArrived(true),3300);return ()=>clearTimeout(t)},[]);
 const openInvitation=()=>{
   if(!CANVA_URL){alert('Falta configurar VITE_CANVA_INVITATION_URL con el enlace público de Canva Site.');return}
   window.location.assign(CANVA_URL);
 };
 return <main className="cover-app">
  <section className="storybook">
   <div className="title-card"><small>¡Acompáñame a celebrar!</small><h1>Ismael<br/>Alejandro</h1><span>¡MIS 2 AÑITOS!</span></div>
   <div className="tractor-path"><button className="tractor-moving tractor-button" type="button" onClick={openInvitation} aria-label="Abrir invitación de Canva" title="Abrir invitación"><Tractor/></button></div>
   <div className={`welcome-pass ${arrived?'welcome-pass--visible':''}`}>
    {loading ? <p>Cargando tu pase…</p> : error ? <div className="pass-error"><AlertCircle size={22}/><p>{error}</p></div> : <>
      <p className="overline">✦ PASE DE INVITACIÓN ✦</p>
      <h2>{data?.greetingType==='familia'?`¡Hola, ${data.guestName}!`:`¡Hola, ${data?.guestName}!`}</h2>
      <div className="ticket-line"><Ticket size={24}/><strong>{data?.seats} {data?.seats===1?'persona':'personas'}</strong></div>
      <p className="pass-message">¡Nos encantaría que nos acompañaras en esta aventura de granja!</p>
     </>}
   </div>
   <div className="ground-decoration" aria-hidden="true">🌿 ✿ 🌼 ✿ 🌿</div>
  </section>
 </main>
}
