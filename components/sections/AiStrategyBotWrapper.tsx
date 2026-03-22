'use client';

import dynamic from 'next/dynamic';

export const AiStrategyBot = dynamic(
  () => import('@/components/sections/AiStrategyBot').then((mod) => mod.AiStrategyBot),
  { ssr: false }
);
