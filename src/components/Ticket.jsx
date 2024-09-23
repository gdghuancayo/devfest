export function TicketCard({ attendeeData }) {
  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden text-black bg-white border-none rounded-lg shadow-xl">
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
