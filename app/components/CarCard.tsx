import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Props for car data
export interface CarCardProps {
  id?: string;
  name: string;
  type: string;
  seats: number;
  luggage: number;
  gearshift: 'Automatic' | 'Manual';
  images: string[];
  priceKsh: number;
  /** Top speed of the car, e.g., '220 km/h' */
  topSpeed?: string;
  /** Types of brakes, e.g., 'Disc, Drum' */
  brakesType?: string;
  /** Fuel consumption, e.g., '10 km/L' */
  fuelConsumption?: string;
  /** Acceleration, e.g., '0-100 km/h: 4.4 seconds' */
  acceleration?: string;
  /** Torque, e.g., '320 Nm' */
  torque?: string;
  /** Amount it takes to fill the gas tank, e.g., '50 L' */
  gasTankCapacity?: string;
  /** Car color, e.g., 'Red' */
  color?: string;
  /** Car mileage, e.g., '50,000 km' */
  mileage?: string;
  /** Car year, e.g., '2022' */
  year?: string;
}

/**
 * CarCard component displays a car's details in a card layout with a slider for multiple images.
 */
const CarCard: React.FC<CarCardProps> = ({ id, name, type, seats, luggage, gearshift, images, priceKsh, topSpeed, brakesType, fuelConsumption, acceleration, torque, gasTankCapacity, color, mileage, year }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const numImages = images.length;
  const router = useRouter();

  useEffect(() => {
    if (numImages <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % numImages);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [numImages]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + numImages) % numImages);
  const next = () => setCurrent((prev) => (prev + 1) % numImages);

  return (
    <div className="car-card" style={{ cursor: id ? 'pointer' : 'default' }}>
      <Link href={id ? `/car/${id}` : '#'} className="car-card-link" tabIndex={-1}>
        <div className="car-image-wrapper">
          {images && images.length > 0 && (
            <Image
              src={images[0]}
              alt={name}
              className="car-image"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="/globe.svg"
              loading="lazy"
              style={{ objectFit: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18, backgroundColor: '#e5e7eb', objectPosition: 'center' }}
            />
          )}
          {numImages > 1 && (
            <>
              <button className="slider-arrow left" onClick={prev} aria-label="Previous image">&#8592;</button>
              <button className="slider-arrow right" onClick={next} aria-label="Next image">&#8594;</button>
              <div className="slider-dots">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={"slider-dot" + (idx === current ? " active" : "")}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="car-info">
          <h2 className="car-title">{name}</h2>
          <div className="car-type">{type}</div>
          <div className="car-icons">
            <span>Seats: {seats}</span>
            <span>Gearshift: {gearshift}</span>
          </div>
          <div className="car-price">Ksh {priceKsh.toLocaleString()}</div>
          {(topSpeed || brakesType || fuelConsumption || acceleration || torque || gasTankCapacity || color || mileage || year) && (
            <div className="car-features">
              {topSpeed && <div><strong>Top Speed:</strong> {topSpeed}</div>}
              {brakesType && <div><strong>Brakes:</strong> {brakesType}</div>}
              {fuelConsumption && <div><strong>Fuel Consumption:</strong> {fuelConsumption}</div>}
              {acceleration && <div><strong>Acceleration:</strong> {acceleration}</div>}
              {torque && <div><strong>Torque:</strong> {torque}</div>}
              {gasTankCapacity && <div><strong>Gas Tank:</strong> {gasTankCapacity}</div>}
              {color && <div><strong>Color:</strong> {color}</div>}
              {mileage && <div><strong>Mileage:</strong> {mileage}</div>}
              {year && <div><strong>Year:</strong> {year}</div>}
            </div>
          )}
        </div>
      </Link>
      <Link href="/order">
        <button
          className="order-now-btn"
          onClick={e => e.stopPropagation()}
          type="button"
        >
          Order Now
        </button>
      </Link>
      <style jsx>{`
          .car-card {
            background: rgba(243,244,246,0.85);
            color: #222;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0,0,0,0.12);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 0 1rem 0;
            min-width: 260px;
          }
          .car-card-link {
            width: 100%;
            height: 100%;
            display: block; /* Ensure the link covers the entire card */
            text-decoration: none;
            color: inherit;
          }
          .car-image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 2/1;
            min-height: 160px;
            background: #e5e7eb;
          }
          .car-image {
            border-top-left-radius: 18px;
            border-top-right-radius: 18px;
          }
          .car-title {
            font-size: 1.4rem;
            font-weight: bold;
            margin: 0 0 0.5rem 0;
          }
          .car-type {
            font-size: 1rem;
            color: #111;
            margin-bottom: 1rem;
          }
          .car-icons {
            display: flex;
            gap: 1.2rem;
            font-size: 1rem;
            align-items: center;
          }
          .icon {
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-right: 0.3rem;
          }
          .car-price {
            margin-top: 1rem;
            font-size: 1.1rem;
            font-weight: normal;
            color: #111;
            background: none;
            border-radius: 0;
            padding: 0;
            display: block;
          }
          .slider-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.3);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 2;
            opacity: 0.7;
            transition: opacity 0.2s;
          }
          .slider-arrow.left { left: 12px; }
          .slider-arrow.right { right: 12px; }
          .slider-arrow:hover { opacity: 1; }
          .slider-dots {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            display: flex;
            justify-content: center;
            gap: 8px;
            z-index: 2;
          }
          .slider-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
            opacity: 0.5;
            border: none;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          .slider-dot.active {
            opacity: 1;
            background: #2563eb;
          }
          .order-now-btn {
            margin-top: 1rem;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 0.5rem 1.2rem;
            font-size: 1rem;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.2s;
          }
          .order-now-btn:hover {
            background: #1d4ed8;
          }
          .car-features {
            margin: 1rem 0 0.5rem 0;
            background: rgba(243,244,246,0.85);
            border-radius: 8px;
            padding: 0.7rem 1rem;
            font-size: 0.98rem;
            color: #222;
          }
          .car-features div {
            margin-bottom: 0.2rem;
          }
          .car-features strong {
            color: #2563eb;
          }
        `}</style>
    </div>
  );
};

export default CarCard; 