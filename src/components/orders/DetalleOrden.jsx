import React from 'react';

export default function DetalleOrden({ orden, onProcederPago, onVolver }) {
  // Productos de prueba dentro de la orden
  const items = [
    { id: 1, producto: 'Camiseta Oficial Bad Era', cantidad: 1, precio: 70000 },
    { id: 2, producto: 'Gorra Vinilo Negro', cantidad: 2, precio: 25000 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button onClick={onVolver} className="text-blue-600 hover:underline mb-4 inline-block text-sm font-medium">
        ← Volver a mis órdenes
      </button>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Detalle de Órden #{orden.id}</h2>
      <p className="text-sm text-gray-500 mb-4">Estado actual: {orden.estado}</p>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-2 text-gray-600">
            <div>
              <p className="font-medium">{item.producto}</p>
              <p className="text-xs text-gray-400">Cantidad: {item.cantidad}</p>
            </div>
            <p className="font-semibold">${(item.precio * item.cantidad).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center font-bold text-lg text-gray-800 mb-6">
        <span>Total de la Órden:</span>
        <span>${orden.total.toLocaleString()}</span>
      </div>

      {orden.estado === 'Pendiente' && (
        <button 
          onClick={onProcederPago}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition tracking-wide"
        >
          Proceder al Pago Seguro
        </button>
      )}
    </div>
  );
}