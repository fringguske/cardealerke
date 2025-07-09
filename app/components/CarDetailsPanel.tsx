import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import type { CarCardProps } from './CarCard';

interface CarDetailsPanelProps {
  car: CarCardProps;
  onClose: () => void;
}

const CarDetailsPanel: React.FC<CarDetailsPanelProps> = ({ car, onClose }) => {
  // SSR safety: only render portal on client
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(
    <div className="car-details-modal-overlay" onClick={onClose}>
      <div className="car-details-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close details">&times;</button>
        <div className="car-details-images">
          {car.images && car.images.length > 0 ? (
            car.images.map((img, idx) => (
              <div key={img} className="car-details-image-wrapper">
                <Image src={img} alt={`Car image ${idx + 1}`} width={400} height={260} style={{ objectFit: 'contain', width: '100%', height: 'auto', borderRadius: 12, background: '#e5e7eb' }} />
              </div>
            ))
          ) : (
            <div>No images available.</div>
          )}
        </div>
        <div className="car-details-info">
          <h2>{car.name}</h2>
          <div><strong>Type:</strong> {car.type}</div>
          <div><strong>Seats:</strong> {car.seats}</div>
          <div><strong>Gearshift:</strong> {car.gearshift}</div>
          <div><strong>Price:</strong> Ksh {car.priceKsh.toLocaleString()}</div>
          {car.topSpeed && <div><strong>Top Speed:</strong> {car.topSpeed}</div>}
          {car.brakesType && <div><strong>Brakes:</strong> {car.brakesType}</div>}
          {car.fuelConsumption && <div><strong>Fuel Consumption:</strong> {car.fuelConsumption}</div>}
          {car.acceleration && <div><strong>Acceleration:</strong> {car.acceleration}</div>}
          {car.torque && <div><strong>Torque:</strong> {car.torque}</div>}
          {car.gasTankCapacity && <div><strong>Gas Tank:</strong> {car.gasTankCapacity}</div>}
          {car.color && <div><strong>Color:</strong> {car.color}</div>}
          {car.mileage && <div><strong>Mileage:</strong> {car.mileage}</div>}
          {car.year && <div><strong>Year:</strong> {car.year}</div>}
        </div>
        <style jsx>{`
          .car-details-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.55);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .car-details-modal {
            background: #fff;
            border-radius: 18px;
            max-width: 700px;
            width: 95vw;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
            padding: 2rem 1.5rem 1.5rem 1.5rem;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #e53e3e;
            color: #fff;
            border: 2px solid #fff;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            font-size: 2.2rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0,0,0,0.10);
            transition: background 0.2s, color 0.2s;
          }
          .close-btn:hover {
            background: #fff;
            color: #e53e3e;
            border: 2px solid #e53e3e;
          }
          .car-details-images {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
          }
          .car-details-image-wrapper {
            flex: 1 1 180px;
            max-width: 400px;
            min-width: 180px;
            background: #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .car-details-info {
            font-size: 1.1rem;
            color: #23272f;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
          .car-details-info h2 {
            margin-bottom: 0.7rem;
            font-size: 2rem;
            color: #1d1d1d;
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
};

export default CarDetailsPanel; 