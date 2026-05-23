import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function OrdenesList({ onSelectOrden }) {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  
  const API_URL = 'http://localhost:8000'; 

  useEffect(() => {
    const obtenerOrdenes = async () => {
      try {
     
  // Cambia la línea de Axios para que quede en singular y con la barra al final:
    const respuesta = await axios.get(`${API_URL}/orden/`);
        setOrdenes(respuesta.data);
      } catch (error) {
        console.error("Error al traer órdenes:", error);
        toast.error("No se pudieron cargar las órdenes");
      } finally {
        setCargando(false);
      }
    };

    obtenerOrdenes();
  }, []);

  if (cargando) return <div className="text-center p-6 text-gray-600 font-medium">Cargando tus órdenes...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Órdenes</h2>
      {ordenes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tienes órdenes registradas todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b">ID Órden</th>
                <th className="p-3 border-b">Total</th>
                <th className="p-3 border-b">Estado</th>
                <th className="p-3 border-b">Acción</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id} className="hover:bg-gray-50 text-gray-600">
                  <td className="p-3 border-b font-semibold">#{orden.id}</td>
                  {/* Ajustamos los nombres de las variables según el backend */}
                  <td className="p-3 border-b">${Number(orden.total || orden.total_price || 0).toLocaleString()}</td>
                  <td className="p-3 border-b">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      orden.estado === 'Pendiente' || orden.status === 'Pendiente'
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {orden.estado || orden.status || 'Pendiente'}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <button 
                      onClick={() => onSelectOrden(orden)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}