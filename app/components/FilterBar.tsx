"use client"
import React from 'react';

// Props for filter options
interface FilterBarProps {
  // You can extend these as needed
  onSortChange?: (value: string) => void;
  onVehicleTypeChange?: (value: string) => void;
  onGearshiftChange?: (value: string) => void;
  onSeatsChange?: (value: number) => void;
  onAgeChange?: (value: number) => void;
  onPriceChange?: (value: string) => void;
}

/**
 * FilterBar component displays filter controls for car selection.
 * Modular and reusable. Extend as needed for real filter logic.
 */
const FilterBar: React.FC<FilterBarProps> = ({
  onSortChange,
  onVehicleTypeChange,
  onGearshiftChange,
  onSeatsChange,
  onAgeChange,
  onPriceChange,
}) => {
  return (
    <div className="filter-bar">
      <select onChange={e => onVehicleTypeChange?.(e.target.value)}>
        <option value="all">Vehicle type</option>
        <option value="all">All</option>
        <option value="Sedan">Sedan</option>
        <option value="Hatchback">Hatchback</option>
        <option value="SUV">SUV</option>
        <option value="Crossover (CUV)">Crossover (CUV)</option>
        <option value="Coupe">Coupe</option>
        <option value="Convertible (Cabriolet)">Convertible (Cabriolet)</option>
        <option value="Wagon (Estate)">Wagon (Estate)</option>
        <option value="Pickup Truck">Pickup Truck</option>
        <option value="Van">Van</option>
        <option value="Minivan">Minivan</option>
        <option value="MPV (Multi-Purpose Vehicle)">MPV (Multi-Purpose Vehicle)</option>
        <option value="Roadster">Roadster</option>
        <option value="Limousine">Limousine</option>
        <option value="Microcar">Microcar</option>
        <option value="Kei Car (Japan)">Kei Car (Japan)</option>
      </select>
      <select onChange={e => onPriceChange?.(e.target.value)}>
        <option value="">Price</option>
        <option value="250000">Below 250k</option>
        <option value="400000">Below 400k</option>
        <option value="600000">Below 600k</option>
        <option value="1000000">Below 1 million</option>
        <option value="2000000">Below 2 million</option>
        <option value="4000000">Below 4 million</option>
        <option value="8000000">Below 8 million</option>
      </select>
      <style jsx>{`
        .filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        select {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
        @media (min-width: 900px) {
          select {
            background: #fff !important;
            color: #222 !important;
            border: 1px solid #bbb;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar; 