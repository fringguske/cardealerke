import React from 'react';
import Image from 'next/image';
import { CarService } from '../../services/carService';
import type { CarCardProps } from '../../components/CarCard';
import BackButton from '../../components/BackButton';

async function getCar(id: string): Promise<CarCardProps | null> {
  try {
    // You may need to implement getCarById in your CarService
    // For now, fetch all and find by id
    const cars = await CarService.getCars();
    return cars.find(car => car.id === id) || null;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);
  if (!car) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Car not found.</div>;
  }
  return (
    <div className="car-details-page">
      <BackButton />
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
    </div>
  );
} 
