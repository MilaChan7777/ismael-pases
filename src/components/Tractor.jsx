import {useState} from 'react';

export default function Tractor(){
  const [imageFailed,setImageFailed]=useState(false);

  if(!imageFailed){
    return <img
      className="tractor-svg tractor-image"
      src="/tractor.png"
      alt="Tractor"
      onError={()=>setImageFailed(true)}
    />;
  }

  return <svg className="tractor-svg" viewBox="0 0 420 255" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tractor verde vintage con remolque">
    <ellipse cx="226" cy="224" rx="179" ry="17" fill="#3e311d" opacity=".2"/>
    <g className="trailer-group">
      <path d="M32 157 L95 157 L113 197 L25 197 Z" fill="#ab6d35" stroke="#754323" strokeWidth="7" />
      <path d="M25 152 L102 152" fill="none" stroke="#dba15d" strokeWidth="9" strokeLinecap="round"/>
      <path d="M89 181 H150" stroke="#594425" strokeWidth="9" />
      <circle cx="64" cy="209" r="27" fill="#242820" stroke="#493b27" strokeWidth="5"/>
      <circle cx="64" cy="209" r="12" fill="#d5ba79"/>
      <path d="M30 143 C44 106 86 110 99 147" fill="#b6c05e" stroke="#667a3c" strokeWidth="6" />
    </g>
    <g className="tractor-body">
      <path d="M160 143 L200 143 L224 103 L309 105 L339 171 L159 184 Z" fill="#4c6f2d" stroke="#2f4426" strokeWidth="9" strokeLinejoin="round"/>
      <path d="M206 125 L229 40 L296 39 L316 126 Z" fill="#4f7f3c" stroke="#2e4a29" strokeWidth="10" strokeLinejoin="round" />
      <path d="M234 50 L285 51 L296 120 L217 120 Z" fill="#bee0d6" stroke="#2d462b" strokeWidth="6" />
      <path d="M297 107 L359 107 L379 143 L308 143 Z" fill="#5b823b" stroke="#344b2b" strokeWidth="7" strokeLinejoin="round"/>
      <path d="M334 78 V110" stroke="#2b3826" strokeWidth="11" strokeLinecap="round"/>
      <path d="M327 77 H345" stroke="#2b3826" strokeWidth="11" strokeLinecap="round"/>
      <path d="M159 156 H187" stroke="#d69c47" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="367" cy="136" r="13" fill="#f2d387" stroke="#7a512c" strokeWidth="5" />
      <path d="M159 180 H385" stroke="#b88b44" strokeWidth="12" strokeLinecap="round"/>
      <g className="wheel wheel-back"><circle cx="212" cy="188" r="55" fill="#282e25" stroke="#1d251c" strokeWidth="7"/><circle cx="212" cy="188" r="30" fill="#baae8d"/><circle cx="212" cy="188" r="15" fill="#67755c"/><path d="M212 159 V217 M183 188 H241" stroke="#77765f" strokeWidth="7" /></g>
      <g className="wheel wheel-front"><circle cx="345" cy="197" r="39" fill="#2c3025" stroke="#1f251e" strokeWidth="6"/><circle cx="345" cy="197" r="21" fill="#bcae86"/><circle cx="345" cy="197" r="10" fill="#718067"/><path d="M345 179 V216 M326 197 H364" stroke="#787965" strokeWidth="5" /></g>
    </g>
  </svg>;
}
