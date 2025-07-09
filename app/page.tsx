"use client"
import React, { Suspense, useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
const CarCard = React.lazy(() => import("./components/CarCard"));
import type { CarCardProps } from "./components/CarCard";
import HeroSection from "./components/HeroSection";
import { CarService } from "./services/carService";
import CarDetailsModal from "./components/CarDetailsModal";
import CarDetailsPanel from "./components/CarDetailsPanel";

export default function Home() {
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<CarCardProps[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarCardProps | null>(null);
  // Track selected filter values
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  // Load cars from Supabase on component mount
  useEffect(() => {
    loadCars();
  }, []);

  // Apply all filters whenever cars or filter values change
  useEffect(() => {
    let filtered = [...cars];
    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(car => car.type.toLowerCase() === selectedType.toLowerCase());
    }
    if (selectedPrice) {
      const maxPrice = parseInt(selectedPrice, 10);
      console.log('Filtering by price:', { selectedPrice, maxPrice });
      filtered = filtered.filter(car => {
        const price = typeof car.priceKsh === 'string' ? parseInt(car.priceKsh, 10) : car.priceKsh;
        console.log('Car:', car.name, 'priceKsh:', car.priceKsh, 'parsed:', price);
        return price <= maxPrice;
      });
    }
    setFilteredCars(filtered);
  }, [cars, selectedType, selectedPrice]);

  /**
   * Load cars from Supabase
   */
  const loadCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const carsData = await CarService.getCars();
      setCars(carsData);
    } catch (err) {
      console.error('Error loading cars:', err);
      setError('Failed to load cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Only keep async handlers for sort, gearshift, seats, etc.
  const handleSortChange = async (value: string) => {
    try {
      let sortedCars: CarCardProps[];
      switch (value) {
        case 'price-low':
          sortedCars = await CarService.getCarsSortedByPrice(true);
          break;
        case 'price-high':
          sortedCars = await CarService.getCarsSortedByPrice(false);
          break;
        default:
          sortedCars = cars;
      }
      setFilteredCars(sortedCars);
    } catch (err) {
      console.error('Error sorting cars:', err);
    }
  };

  // New filter handlers just set state
  const handleVehicleTypeChange = (value: string) => setSelectedType(value);
  const handlePriceChange = (value: string) => setSelectedPrice(value);

  // Keep other filters as is (if needed)
  const handleGearshiftChange = async (value: string) => {
    try {
      if (value === 'all') {
        setFilteredCars(cars);
      } else {
        const filteredCars = await CarService.getCarsByGearshift(value as 'Automatic' | 'Manual');
        setFilteredCars(filteredCars);
      }
    } catch (err) {
      console.error('Error filtering by gearshift:', err);
    }
  };

  const handleSeatsChange = async (value: number) => {
    try {
      if (value === 0) {
        setFilteredCars(cars);
      } else {
        const filteredCars = await CarService.getCarsBySeats(value);
        setFilteredCars(filteredCars);
      }
    } catch (err) {
      console.error('Error filtering by seats:', err);
    }
  };

  const handleAgeChange = (value: number) => {
    // Age filter not implemented in this version
    console.log('Age filter:', value);
  };

  // Example car image for hero section
  const heroCarImage = "/carr/Toyota-Corolla_Hatchback-2023-thb.jpg";

  return (
    <div className="landing-glassboard-root">
      <img
        src="/carr/a-chosen-soul-rxfmrBY3S5U-unsplash.jpg"
        alt="Background car"
        className="landing-bg-image"
      />
      <div className="landing-glassboard-content">
        <HeroSection />
        <FilterBar
          onSortChange={handleSortChange}
          onVehicleTypeChange={handleVehicleTypeChange}
          onGearshiftChange={handleGearshiftChange}
          onSeatsChange={handleSeatsChange}
          onAgeChange={handleAgeChange}
          onPriceChange={handlePriceChange}
        />
        
        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner">Loading cars...</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="error-container">
            <div className="error-message">
              {error}
              <button onClick={loadCars} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Car grid */}
        {!loading && !error && (
          <>
            <div className="car-grid">
              {filteredCars.length > 0 ? (
                filteredCars.map((car, idx) => (
                  <Suspense fallback={<div style={{height: 320}}></div>} key={car.id || idx}>
                    <CarCard {...car} onClick={() => setSelectedCar(car)} />
                  </Suspense>
                ))
              ) : (
                <div className="no-cars-message">
                  <h3>Nothing to see here yet</h3>
                  <p>No cars are currently listed. Please check back later.</p>
                </div>
              )}
            </div>
            {selectedCar && (
              <CarDetailsPanel car={selectedCar} onClose={() => setSelectedCar(null)} />
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .loading-container,
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          padding: 2rem;
        }

        .loading-spinner {
          color: #718096;
          font-size: 1.1rem;
        }

        .error-message {
          text-align: center;
          color: #e53e3e;
          background: #fed7d7;
          padding: 1.5rem;
          border-radius: 8px;
          max-width: 400px;
        }

        .retry-button {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          margin-top: 1rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .retry-button:hover {
          background: #c53030;
        }

        .no-cars-message {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .no-cars-message h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #4a5568;
        }
      `}</style>
    </div>
  );
}
