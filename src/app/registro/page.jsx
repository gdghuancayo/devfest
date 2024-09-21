

import Form from "./Form"
import { Suspense } from 'react';

export default function Registro() {
  return (
    <Suspense fallback={<div></div>}>
      <Form />
    </Suspense>
  )
}
