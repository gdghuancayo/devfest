export function TicketCard({ attendeeData }) {
  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden text-black bg-white border-none rounded-lg shadow-xl mb-28">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500" />
      <div className="px-6 pt-8 pb-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text">
            Google DevFest 2023
          </h1>
          <p className="text-lg font-semibold">{attendeeData.name}</p>
          <p className="text-sm text-gray-600">Doc: {attendeeData.dni}</p>
        </div>
        <div
          className={`text-md mx-auto w-fit rounded-full px-4 py-1 font-bold ${
            attendeeData.type === 'Presencial' ? 'bg-green-500' : 'bg-blue-500'
          } text-white`}
        >
          Ticket {attendeeData.type || 'Virtual'}
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-gray-700">Actividades:</p>
          {Object.entries(attendeeData.activities)
            .filter(([key, value]) => value === true)
            .map(([key], index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-sm text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-center p-3 px-6 mx-auto bg-green-500 rounded-lg shadow-lg w-fit">
          <a
            href="https://chat.whatsapp.com/DUmr861iWLk8dy2Xk4uKRI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white"
          >
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.83 11.83 0 0012 0C5.37 0 0 5.37 0 12a11.82 11.82 0 001.68 6.06L0 24l6.12-1.62A11.83 11.83 0 0012 24c6.63 0 12-5.37 12-12a11.82 11.82 0 00-3.48-8.52zM12 22c-1.85 0-3.7-.5-5.31-1.44l-.38-.22L3 21l1.66-3.31-.22-.38A9.96 9.96 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.56-7.66c-.31-.16-1.84-.91-2.13-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.18.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.52-.92-.82-1.54-1.84-1.71-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.37.45-.56.15-.19.19-.32.29-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.32-.26-.63-.53-.55-.74-.56-.19-.01-.4-.01-.62-.01s-.56.08-.85.4c-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.14 3.12 1.3 3.34.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.84-.75 2.1-1.48.26-.73.26-1.36.18-1.48-.08-.13-.29-.21-.6-.37z" />
            </svg>
            <span className="text-sm font-semibold">Grupo de WhatsApp</span>
          </a>
        </div>

        <div className="flex justify-center">
          <div className="p-2 bg-gray-100 rounded">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${attendeeData.registerID}`}
              alt="QR Code"
              className="w-32 h-32"
            />
          </div>
        </div>

        <p className="text-sm text-center text-gray-600">
          ID: {attendeeData.registerID}
        </p>
      </div>
      <div className="flex items-center justify-between px-6 py-2 bg-gray-100">
        <div className="text-xs text-gray-600">Fecha: 09 Nov 2023</div>
        <div className="text-xs text-gray-600">Hora: Desde 8:00 AM</div>
      </div>
    </div>
  )
}
