import React, { useState } from 'react';
import OrdenesList from './OrdenesList';
import DetalleOrden from './DetalleOrden';
import ProcesarPago from './ProcesarPago';

export default function ModuloOrdenes() {
  const [vista, setVista] = useState('lista'); // Puede ser: 'lista', 'detalle', 'pago'
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  const manejarSeleccionarOrden = (orden) => {
    setOrdenSeleccionada(orden);
    setVista('detalle');
  };

  const manejarProcederPago = () => {
    setVista('pago');
  };

  const manejarPagoExitoso = (ordenId) => {
    setVista('lista');
    setOrdenSeleccionada(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {vista === 'lista' && (
          <OrdenesList onSelectOrden={manejarSeleccionarOrden} />
        )}

        {vista === 'detalle' && (
          <DetalleOrden 
            orden={ordenSeleccionada} 
            onProcederPago={manejarProcederPago} 
            onVolver={() => setVista('lista')} 
          />
        )}

        {vista === 'pago' && (
          <ProcesarPago 
            orden={ordenSeleccionada} 
            onPagoExitoso={manejarPagoExitoso} 
            onCancelar={() => setVista('detalle')} 
          />
        )}

      </div>
    </div>
  );
}