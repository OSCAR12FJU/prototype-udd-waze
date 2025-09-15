import { useState } from 'react'

interface DeliveryPoint {
  id: number
  name: string
  address: string
  lat: number
  lng: number
}

interface Delivery {
  id: number
  orderNumber: string
  customer: string
  pickup: DeliveryPoint
  delivery: DeliveryPoint
  status: 'pendiente' | 'en_camino' | 'entregado'
  estimatedTime: string
}

function App() {
  // Puntos de retiro en Buenos Aires
  const pickupPoints: DeliveryPoint[] = [
    { id: 1, name: "Depósito Central", address: "Av. Corrientes 1234, CABA", lat: -34.6037, lng: -58.3816 },
    { id: 2, name: "Centro Logístico Norte", address: "Av. Santa Fe 3000, Palermo, CABA", lat: -34.5889, lng: -58.3971 },
    { id: 3, name: "Almacén Puerto Madero", address: "Av. Alicia Moreau de Justo 1500, CABA", lat: -34.6107, lng: -58.3631 }
  ]

  // Puntos de entrega en Buenos Aires
  const deliveryPoints: DeliveryPoint[] = [
    { id: 4, name: "Palermo", address: "Av. Santa Fe 2000, Palermo, CABA", lat: -34.5889, lng: -58.3971 },
    { id: 5, name: "Recoleta", address: "Av. Las Heras 2000, Recoleta, CABA", lat: -34.5875, lng: -58.3974 },
    { id: 6, name: "Puerto Madero", address: "Av. Alicia Moreau de Justo 1000, CABA", lat: -34.6107, lng: -58.3631 },
    { id: 7, name: "San Telmo", address: "Defensa 1000, San Telmo, CABA", lat: -34.6214, lng: -58.3731 },
    { id: 8, name: "Belgrano", address: "Av. Cabildo 2000, Belgrano, CABA", lat: -34.5632, lng: -58.4588 },
    { id: 9, name: "Villa Crespo", address: "Av. Corrientes 4000, Villa Crespo, CABA", lat: -34.5928, lng: -58.4378 }
  ]

  // Pedidos de ejemplo con puntos de retiro y entrega
  const [deliveries] = useState<Delivery[]>([
    {
      id: 1,
      orderNumber: "PED-001",
      customer: "María González",
      pickup: pickupPoints[0], // Depósito Central
      delivery: deliveryPoints[0], // Palermo
      status: 'pendiente',
      estimatedTime: '25 min'
    },
    {
      id: 2,
      orderNumber: "PED-002", 
      customer: "Carlos Rodríguez",
      pickup: pickupPoints[1], // Centro Logístico Norte
      delivery: deliveryPoints[1], // Recoleta
      status: 'pendiente',
      estimatedTime: '20 min'
    },
    {
      id: 3,
      orderNumber: "PED-003",
      customer: "Ana López",
      pickup: pickupPoints[2], // Almacén Puerto Madero
      delivery: deliveryPoints[2], // Puerto Madero
      status: 'pendiente',
      estimatedTime: '15 min'
    }
  ])

  // Función para abrir Waze con navegación al punto de retiro
  const openWazeToPickup = (pickup: DeliveryPoint) => {
    const wazeUrl = `https://waze.com/ul?ll=${pickup.lat},${pickup.lng}&navigate=yes`
    window.open(wazeUrl, '_blank')
  }

  // Función para abrir Waze con navegación al punto de entrega
  const openWazeToDelivery = (delivery: DeliveryPoint) => {
    const wazeUrl = `https://waze.com/ul?ll=${delivery.lat},${delivery.lng}&navigate=yes`
    window.open(wazeUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">App Currier</h1>
        <p className="text-gray-600 mb-8">Prototipo de entrega con Wazze</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{delivery.orderNumber}</h3>
                  <p className="text-sm text-gray-600">Cliente: {delivery.customer}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  delivery.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  delivery.status === 'en_camino' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {delivery.status === 'pendiente' ? 'Pendiente' :
                   delivery.status === 'en_camino' ? 'En Camino' : 'Entregado'}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-orange-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">📍 Retirar en:</h4>
                  <p className="text-sm text-gray-600">{delivery.pickup.name}</p>
                  <p className="text-xs text-gray-500">{delivery.pickup.address}</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">🚚 Entregar en:</h4>
                  <p className="text-sm text-gray-600">{delivery.delivery.name}</p>
                  <p className="text-xs text-gray-500">{delivery.delivery.address}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  Tiempo estimado: <span className="font-medium">{delivery.estimatedTime}</span>
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openWazeToPickup(delivery.pickup)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ir a Retirar
                </button>
                
                <button
                  onClick={() => openWazeToDelivery(delivery.delivery)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ir a Entregar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📍 Puntos de Retiro</h2>
            <div className="space-y-3">
              {pickupPoints.map((point) => (
                <div key={point.id} className="bg-orange-50 rounded-lg p-3">
                  <h3 className="font-medium text-gray-800">{point.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{point.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {point.lat}, {point.lng}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🚚 Puntos de Entrega</h2>
            <div className="space-y-3">
              {deliveryPoints.map((point) => (
                <div key={point.id} className="bg-blue-50 rounded-lg p-3">
                  <h3 className="font-medium text-gray-800">{point.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{point.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {point.lat}, {point.lng}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default App
