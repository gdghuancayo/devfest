import { Check } from 'lucide-react';

export default function Tc() {
  return (
    <div className="px-6 py-32 bg-white lg:px-8">
      <div className="max-w-3xl mx-auto text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Términos y Condiciones</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DevFest Huancayo 2024</h1>
        <p className="mt-6 text-xl leading-8">
          Al participar en el DevFest Huancayo 2024, usted acepta compartir sus datos de contacto con los organizadores del evento para fines de registro y comunicación. Estos datos pueden ser utilizados para informarle sobre actualizaciones relacionadas con el evento, así como futuras actividades organizadas por el Google Developers Group Huancayo.
        </p>
        <div className="max-w-2xl mt-10">
          <p>
            Al unirse al grupo de WhatsApp oficial del evento, acepta recibir notificaciones e información relevante relacionada con la organización y desarrollo del DevFest. Los datos compartidos en el grupo serán visibles para los otros miembros, y su uso debe respetar las normas de convivencia establecidas.
          </p>
          <ul role="list" className="max-w-xl mt-8 space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <Check aria-hidden="true" className="flex-none w-5 h-5 mt-1 text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Pago de inscripción.</strong> El pago por la inscripción al DevFest deberá realizarse directamente a la institución que marque el evento. La inscripción garantiza su participación y acceso a todas las sesiones y actividades programadas.
              </span>
            </li>
            <li className="flex gap-x-3">
              <Check aria-hidden="true" className="flex-none w-5 h-5 mt-1 text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Política de cancelación.</strong> En caso de que no pueda asistir, no se realizarán reembolsos, pero podrá transferir su participación a otra persona, siempre que lo notifique con al menos 7 días de anticipación.
              </span>
            </li>
            <li className="flex gap-x-3">
              <Check aria-hidden="true" className="flex-none w-5 h-5 mt-1 text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Responsabilidades del participante.</strong> Los participantes se comprometen a seguir las reglas del evento, respetar los tiempos y las indicaciones de los organizadores. Cualquier comportamiento inapropiado resultará en la expulsión del evento sin derecho a reembolso.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Todos los datos proporcionados serán tratados de acuerdo con las leyes de protección de datos vigentes. No compartiremos su información personal con terceros sin su consentimiento, salvo para fines relacionados con el evento.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Política de Privacidad</h2>
          <p className="mt-6">
            Al proporcionar sus datos, acepta nuestra política de privacidad. Sus datos serán utilizados exclusivamente para gestionar su participación en el DevFest y mantenerle informado sobre eventos futuros.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                “Nos comprometemos a proteger su privacidad y a garantizar que sus datos sean tratados de manera segura y confidencial. Si tiene alguna duda sobre nuestra política de privacidad, puede contactarnos en cualquier momento.”
              </p>
            </blockquote>
            <figcaption className="flex mt-6 gap-x-4">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="flex-none w-6 h-6 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <strong className="font-semibold text-gray-900">Google Developers Group Huancayo</strong>
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Si tiene alguna duda o desea más información sobre los términos y condiciones, o nuestra política de privacidad, por favor contacte a los organizadores del evento.
          </p>
        </div>
      </div>
    </div>
  );
}
