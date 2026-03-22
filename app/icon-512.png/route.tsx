import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          width="340"
          height="340"
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
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
