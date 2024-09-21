
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'
import { Hero } from '@/components/Hero'
import { Gifts } from '@/components/Gifts'
import { Suspense } from 'react';

export default function Home() {
  return (
   <>
      <Suspense fallback={<div></div>}>
        <Hero />
      </Suspense>
      <Speakers />
      <Schedule />
      <Gifts />
      <Sponsors />
   </>
  )
}
