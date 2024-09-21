'use client'

import { AppContext } from '@/app/context'
import {
  doc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore'
import { Check, Info, TriangleAlert } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

const InputField = ({ label, value, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative w-full mb-8">
      {/* Div para el borde de arcoíris */}
      <div className={`rainbow-border ${isFocused || value ? 'focused' : ''}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`peer w-full rounded-lg bg-black p-2 text-sm outline-none transition-all duration-300 ${props.disabled ? 'text-gray-400' : 'text-white'} `}
          placeholder=" "
          {...props}
        />
      </div>
      {/* Label siempre visible */}
      <label
        className={`absolute left-3 text-gray-400 transition-all duration-300 ${isFocused || value ? 'top-[-15px] bg-black px-1 text-sm text-white' : 'text-md top-3 z-10'}`}
      >
        {label}
      </label>
    </div>
  )
}
const SelectField = ({ label, value, onChangeValue, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selectRef = useRef(null)
  const optionRefs = useRef({})
  const isActive = isOpen || value

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOptionClick = (option) => {
    onChangeValue(option)
    setIsOpen(false)
    setSearchTerm('')
  }

  const highlightText = (text) => {
    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase())
    if (index === -1) {
      return text
    }
    const before = text.substring(0, index)
    const match = text.substring(index, index + searchTerm.length)
    const after = text.substring(index + searchTerm.length)
    return (
      <>
        {before}
        <strong className="bg-yellow-200">{match}</strong>
        {after}
      </>
    )
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full mb-8" ref={selectRef}>
      {/* Rainbow border */}
      <div className={`rainbow-border ${isActive ? 'focused' : ''}`}>
        <div
          className="w-full p-2 text-sm text-white transition-all duration-300 bg-black rounded-lg outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
        >
          {value || '‎'}
        </div>
      </div>
      {/* Label */}
      <label
        className={`absolute left-3 text-gray-400 transition-all duration-300 ${
          isActive
            ? 'top-[-15px] bg-black px-1 text-sm text-white'
            : 'text-md top-3 z-10'
        }`}
      >
        {label}
      </label>
      {isOpen && (
        <div className="absolute z-40 w-full mt-2 bg-white border rounded-md shadow-sm">
          <div className="flex p-1 border-b rounded-t-md bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ marginTop: '0.35rem' }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-3 py-1 text-sm outline-none rounded-t-md bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto containerScroll max-h-48">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                ref={(el) => (optionRefs.current[option] = el)}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-200 ${
                  value === option ? 'bg-doctoc-100' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {highlightText(option)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const getOrg = (org) => {
  switch (org) {
    case 'uc':
      return 'Universidad Continental'
    case 'ic':
      return 'Instituto Continental'
    case 'cuf':
      return 'Continental University of Florida'
    case 'ext':
      return 'Externo'
    default:
      return 'Universidad Continental'
  }
}

export default function Registro() {
  // Contexto
  const { loginInfo } = useContext(AppContext)
  // Parámetros de búsqueda
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const router = useRouter()

  const tipo = searchParams.get('type')
  const org = searchParams.get('org')
  // Estados
  const [type, setType] = useState(
    tipo === 'presencial' ? 'Presencial' : 'Virtual',
  )
  const [name, setName] = useState('')
  const [correo, setCorreo] = useState('')
  const [phone, setPhone] = useState('')
  const [dni, setDNI] = useState('')
  const [organization, setOrganization] = useState(getOrg(org))
  const [program, setProgram] = useState('')
  const [activities, setActivities] = useState({
    conferencia: true,
    talleres: true,
    taller: '',
    final: true,
    after: true,
    feria: true,
  })
  const [tc, setTC] = useState(true)
  const [stats, setStats] = useState('')
  const [stock, setStock] = useState(true)
  const [ready, setReady] = useState(true)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setName(loginInfo.name)
    setCorreo(loginInfo.email)
  }, [loginInfo])

  const handleSubmit = async () => {
    setLoader(true)

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }
    var dniData = {}

    if (dni.length === 8) {
      const dniResponse = await fetch(
        `https://api.perudevs.com/api/v1/dni/complete?document=${dni}&key=cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjZlZGNkNDU5ZmE0MTczZjYxMzIwMzk0`,
        requestOptions,
      )

      dniData = await dniResponse.json()
    }

    const db = getFirestore()
    await setDoc(doc(db, 'register', loginInfo.uid), {
      registerID: loginInfo.uid,
      name,
      correo,
      phone,
      dni,
      organization,
      program,
      activities,
      dniData: dniData.resultado,
    })

    const startsRef = doc(db, 'stats', 'entradas')
    
    if (type === 'Presencial') {
      if (organization === 'Universidad Continental') {
        await updateDoc(startsRef, {
          uc: increment(1),
        })
      }
      if (organization === 'Instituto Continental') {
        await updateDoc(startsRef, {
          ic: increment(1),
        })
      }
      if (organization === 'Continental University of Florida') {
        await updateDoc(startsRef, {
          cuf: increment(1),
        })
      }
      if (organization === 'Externo') {
        await updateDoc(startsRef, {
          ext: increment(1),
        })
      }
    }
    router.push('/panel')
  }
  useEffect(() => {
    const db = getFirestore()
    const execute = async () => {
      const docRef = doc(db, 'stats', 'entradas')
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setStats(docSnap.data())
      }
    }
    execute()
  }, [])

  useEffect(() => {
    if (stats) {
      if (organization === 'Universidad Continental') {
        if (stats.uc >= 200) {
          setStock(false)
        } else {
          setStock(true)
        }
      }
      if (organization === 'Instituto Continental') {
        if (stats.ic >= 75) {
          setStock(false)
        } else {
          setStock(true)
        }
      }
      if (organization === 'Continental University of Florida') {
        if (stats.cuf >= 5) {
          setStock(false)
        } else {
          setStock(true)
        }
      }
      if (organization === 'Externo') {
        if (stats.ext >= 10) {
          setStock(false)
        } else {
          setStock(true)
        }
      }
    }
  }, [organization, stats])

  useEffect(() => {
    if (
      name?.length > 0 &&
      phone.length > 0 &&
      dni.length > 0 &&
      program.length > 0 &&
      tc &&
      stock
    ) {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [name, phone, dni, organization, tc, program])
  return (
    <div className="overflow-hidden isolate">
      {loader ? (
        <div className="flex items-center justify-center h-96">
          <div class="wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center pb-96">
            <div className="relative mt-6">
              <svg
                viewBox="0 0 1208 1024"
                className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
              >
                <ellipse
                  cx={604}
                  cy={512}
                  rx={604}
                  ry={512}
                  fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
                />
                <defs>
                  <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#030712" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flow-root">
            <div className="-mt-96">
              <div className="px-6 mx-auto">
                <div className="max-w-lg mx-auto">
                  <div className="p-6 mb-10 bg-black border shadow-md boder-gray-100 rounded-5xl bg-opacity-60 sm:p-10">
                    <h2 className="mb-8 text-2xl font-semibold leading-7 text-white">
                      Registro {type}
                    </h2>
                    <div className="pb-4 mb-6 border-b border-white/20">
                      <h2 className="text-base font-semibold leading-7 text-white">
                        Datos Personales
                      </h2>
                    </div>
                    <InputField
                      value={name}
                      onChange={setName}
                      label={'Nombre'}
                    />
                    {/* <InputField
                  value={correo}
                  onChange={setCorreo}
                  label={'Correo'}
                  disabled
                /> */}
                    <InputField
                      value={phone}
                      onChange={setPhone}
                      label={'Teléfono'}
                    />
                    <InputField
                      value={dni}
                      onChange={setDNI}
                      label={'Documento'}
                    />
                    <div className="pb-4 mb-6 border-b border-white/20">
                      <h2 className="text-base font-semibold leading-7 text-white">
                        Afiliación
                      </h2>
                    </div>
                    <SelectField
                      label="Institución"
                      value={organization}
                      onChangeValue={(val) => setOrganization(val)}
                      options={[
                        'Universidad Continental',
                        'Instituto Continental',
                        'Continental University of Florida',
                        'Externo',
                      ]}
                    />
                    {organization !== 'Externo' && (
                      <SelectField
                        label="Programa"
                        value={program}
                        onChangeValue={(val) => setProgram(val)}
                        options={
                          organization === 'Universidad Continental'
                            ? [
                                'Ingeniería de Sistemas e Informática',
                                'Ingeniería Empresarial',
                                'Ingeniería Industrial',
                                'Ingeniería Ambiental',
                                'Otro',
                              ]
                            : organization === 'Instituto Continental'
                              ? [
                                  'Desarrollo de Sistema de Información',
                                  'Ciencias de datos e Inteligencia Artificial',
                                  'Otro',
                                ]
                              : organization ===
                                  'Continental University of Florida'
                                ? [
                                    'Data Science',
                                    'Psychology',
                                    'Industrial Engineering',
                                    'Administration',
                                    'Other',
                                  ]
                                : []
                        }
                      />
                    )}
                    <div className="pb-4 mb-6 border-b border-white/20">
                      <h2 className="text-base font-semibold leading-7 text-white">
                        Actividades
                      </h2>
                    </div>
                    <div className="space-y-5">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                            checked={activities.conferencia}
                            onChange={(e) =>
                              setActivities((prev) => ({
                                ...prev,
                                conferencia: e.target.checked,
                              }))
                            }
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label className="font-medium text-white">
                            Conferencia
                          </label>
                          <p
                            id="comments-description"
                            className="text-gray-300"
                          >
                            Ponencias de expertos (2 pm - 8 pm)
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                            checked={activities.talleres}
                            onChange={(e) =>
                              setActivities((prev) => ({
                                ...prev,
                                talleres: e.target.checked,
                              }))
                            }
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label className="font-medium text-white">
                            Talleres
                          </label>
                          <p
                            id="comments-description"
                            className="text-gray-300"
                          >
                            Aprende practicando (8 am - 10 am)
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                            checked={activities.final}
                            onChange={(e) =>
                              setActivities((prev) => ({
                                ...prev,
                                final: e.target.checked,
                              }))
                            }
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label className="font-medium text-white">
                            Concurso de Apps
                          </label>
                          <p
                            id="comments-description"
                            className="text-gray-300"
                          >
                            Final en vivo (10 am - 12 pm)
                          </p>
                        </div>
                      </div>
                      {type === 'Presencial' && (
                        <>
                          {' '}
                          <div className="relative flex items-start">
                            <div className="flex items-center h-6">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                checked={activities.after}
                                onChange={(e) =>
                                  setActivities((prev) => ({
                                    ...prev,
                                    after: e.target.checked,
                                  }))
                                }
                              />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                              <label className="font-medium text-white">
                                After Party
                              </label>
                              <p
                                id="comments-description"
                                className="text-gray-300"
                              >
                                Música & Piqueos (8 pm - 9 pm)
                              </p>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex items-center h-6">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                checked={activities.feria}
                                onChange={(e) =>
                                  setActivities((prev) => ({
                                    ...prev,
                                    feria: e.target.checked,
                                  }))
                                }
                              />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                              <label className="font-medium text-white">
                                Feria
                              </label>
                              <p
                                id="comments-description"
                                className="text-gray-300"
                              >
                                VS Gaming, VR / AR (10 am - 5 pm)
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="p-4 mt-8 rounded-md bg-green-50">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check
                            aria-hidden="true"
                            className="w-5 h-5 text-green-400"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            {type === 'Presencial'
                              ? 'Tu entrada incluye acceso total al evento, breaks, regalos y certificado.'
                              : 'Tu entrada incluye acceso a la transmisión en vivo evento, sorteos y certificado.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {organization !== 'Continental University of Florida' && (
                      <div className="p-4 mt-4 rounded-md bg-blue-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Info
                              aria-hidden="true"
                              className="w-6 h-6 text-blue-400"
                            />
                          </div>
                          <div className="flex-1 ml-3 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">
                              {organization === 'Externo' ? (
                                <>
                                  El costo de la entrada es{' '}
                                  <span className="font-medium">
                                    S/. {type === 'Presencial' ? 45 : 15}
                                  </span>{' '}
                                  (
                                  <span className="line-through">
                                    S/. {type === 'Presencial' ? 250 : 50}
                                  </span>
                                  ), contactaremos contigo para coordinar el
                                  pago.
                                </>
                              ) : (
                                <>
                                  El costo de la entrada para tu Institución es{' '}
                                  <span className="font-medium">
                                    S/. {type === 'Presencial' ? 15 : 10}
                                  </span>{' '}
                                  (
                                  <span className="line-through">
                                    S/. {type === 'Presencial' ? 250 : 50}
                                  </span>
                                  ), este monto se cargará a tu cuenta.
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!stock && (
                      <div className="p-4 mt-4 rounded-md bg-yellow-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <TriangleAlert
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Entradas Agotadas
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>
                                Hemos llegado al límite de entradas presenciales
                                disponibles para tu Institución, si deseas
                                asistir de forma virtual por favor click{' '}
                                <button
                                  className="font-bold text-yellow-800 underline"
                                  onClick={() => {
                                    const params = new URLSearchParams(
                                      searchParams,
                                    )
                                    params.set('type', 'online')
                                    replace(`${pathname}?${params.toString()}`)
                                    setType('Virtual')
                                  }}
                                >
                                  aquí
                                </button>
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mt-1 border-gray-300 rounded text-doctoc-600 focus:ring-doctoc-500"
                          checked={tc}
                          onChange={(e) => setTC(e.target.checked)}
                        />
                        <div className="block w-full ml-3 text-sm text-justify text-white">
                          He leído y acepto los{' '}
                          <a
                            href="https://doctoc.health/terminos-y-condiciones"
                            target="»_blank»"
                            className="text-indigo-400 underline"
                          >
                            términos y condiciones
                          </a>{' '}
                          y las{' '}
                          <a
                            href="https://doctoc.health/politicas-de-privacidad"
                            target="»_blank»"
                            className="text-indigo-400 underline"
                          >
                            políticas de privacidad
                          </a>
                          .
                        </div>
                      </div>
                    </div>

                    <button
                      className={`mt-8 w-full rounded-lg bg-indigo-500 py-2 font-semibold text-white transition-all duration-300 ${
                        ready
                          ? 'hover:bg-indigo-600'
                          : 'cursor-not-allowed bg-opacity-25'
                      }`}
                      onClick={() => handleSubmit()}
                      disabled={!ready}
                    >
                      Registrarse
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// LoginInfo register -> Login
