import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'TEKGUYZ - Architecting the Intelligent Enterprise'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b', // zinc-950
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Blurple Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(87,76,250,0.3) 0%, rgba(9,9,11,0) 70%)',
          }}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', zIndex: 10 }}>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="160"
          >
            <polygon 
              points="12 2, 21 7, 21 17, 12 22, 3 17, 3 7" 
              stroke="#574cfa" 
              strokeWidth="2" 
              strokeLinejoin="round"
            />
            <polyline 
              points="9 10, 6 12, 9 14" 
              stroke="#574cfa" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <polyline 
              points="15 10, 18 12, 15 14" 
              stroke="#574cfa" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <line 
              x1="10" 
              y1="17" 
              x2="14" 
              y2="17" 
              stroke="#574cfa" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '64px', fontWeight: 900, letterSpacing: '0.05em', color: '#ffffff', textTransform: 'uppercase' }}>
              <span>TEKGUYZ <span style={{ color: '#574cfa', margin: '0 16px' }}>|</span> Architecting the Advantage</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
