export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="mt-10 text-3xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl">
       Página no encontradaa
      </div>

      <div className="mt-8 text-sm font-medium text-gray-400 md:text-xl lg:text-2xl">
        Tal vez la página que buscas ha sido eliminada o no existe
      </div>
    </div>
  )
}
