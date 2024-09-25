import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'
import { Hero } from '@/components/Hero'
import { Gifts } from '@/components/Gifts'

export default function Home() {
  return (
    <>
      <Hero />
      <Speakers />
      <Schedule />
      <Gifts />
      <Sponsors />
    </>
  )
}
