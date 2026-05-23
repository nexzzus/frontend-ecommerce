import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ProcesarPago({ orden, onPagoExitoso, onCancelar }) {
  const [metodo, setMetodo] = useState('tarjeta');
  const [procesando, setProcesando] = useState(false);
  
  const API_URL = 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcesando(true);

    try {
      // 1. Registramos el pago
      await axios.post(`${API_URL}/pago/`, {
        order_id: orden.id,
        metodo_pago: metodo,
        monto: orden.total || orden.total_price,
        estado: 'Exitoso'
      });

      // 2. AJUSTADO: Actualizamos el estado mandando el objeto que espera OrdenCreate
      await axios.put(`${API_URL}/orden/${orden.id}`, {
        user_id: orden.user_id || 1, // Atributos obligatorios del esquema
        total: orden.total || orden.total_price,
        estado: 'Completado' 
      });

      Swal.fire({
        title: '¡Pago Exitoso!',
        text: 'Tu orden ha sido procesada correctamente.',
        icon: 'success',
        confirmButtonColor: '#16a34a'
      });

      onPagoExitoso(orden.id);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al conectar con el servidor.',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pasarela de Pago</h2>
      <p className="mb-4 text-gray-600 text-sm">
        Estás pagando la órden <strong>#{orden.id}</strong> por un valor de <strong>${Number(orden.total || orden.total_price || 0).toLocaleString()}</strong>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
          <select 
            value={metodo} 
            onChange={(e) => setMetodo(e.target.value)}
            className="w-full border p-2 rounded text-gray-600 focus:outline-none"
            disabled={procesando}
          >
            <option value="tarjeta">Tarjeta de Crédito / Débito</option>
            <option value="PSE">PSE (Transferencia Bancaria)</option>
          </select>
        </div>

        {metodo === 'tarjeta' && (
          <div className="space-y-3">
            <input type="text" placeholder="Número de Tarjeta" required disabled={procesando} className="w-full border p-2 rounded text-gray-600 text-sm focus:outline-none" />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="MM/AA" required disabled={procesando} className="w-full border p-2 rounded text-gray-600 text-sm focus:outline-none" />
              <input type="text" placeholder="CVV" required disabled={procesando} className="w-full border p-2 rounded text-gray-600 text-sm focus:outline-none" />
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onCancelar} disabled={procesando} className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded font-medium hover:bg-gray-300">
            Cancelar
          </button>
          <button type="submit" disabled={procesando} className={`w-1/2 text-white py-2 rounded font-medium ${procesando ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}>
            {procesando ? 'Procesando...' : 'Confirmar Pago'}
          </button>
        </div>
      </form>
    </div>
  );
}