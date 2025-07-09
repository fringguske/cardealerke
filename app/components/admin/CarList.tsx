import React from 'react';
import { CarCardProps } from '../CarCard';

interface CarListProps {
  cars: CarCardProps[];
  onEdit: (car: CarCardProps) => void;
  onDelete: (car: CarCardProps) => void;
}

/**
 * Car list component for admin dashboard displaying cars in a table format
 */
const CarList: React.FC<CarListProps> = ({ cars, onEdit, onDelete }) => {
  if (cars.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <h3 className="empty-state-title">Nothing to see here yet</h3>
          <p className="empty-state-description">
            No cars are currently listed. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="car-list-container">
      <div className="car-list-header">
        <h3 className="car-list-title">Car Inventory ({cars.length} cars)</h3>
      </div>

      <div className="car-table-container">
        <table className="car-table">
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Type</th>
              <th>Seats</th>
              <th>Luggage</th>
              <th>Gearshift</th>
              <th>Price (KSH)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="car-row">
                <td className="car-image-cell">
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="car-list-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-car.jpg';
                      }}
                    />
                  ) : (
                    <img
                      src={'/placeholder-car.jpg'}
                      alt="No image"
                      className="car-list-image"
                    />
                  )}
                </td>
                <td className="car-name-cell">
                  <div className="car-name">{car.name}</div>
                </td>
                <td className="car-type-cell">
                  <span className="car-type-badge">{car.type}</span>
                </td>
                <td className="car-seats-cell">{car.seats}</td>
                <td className="car-luggage-cell">{car.luggage}</td>
                <td className="car-gearshift-cell">
                  <span className={`gearshift-badge ${car.gearshift.toLowerCase()}`}>
                    {car.gearshift}
                  </span>
                </td>
                <td className="car-price-cell">
                  KSH {car.priceKsh.toLocaleString()}
                </td>
                <td className="car-actions-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(car)}
                      className="edit-button"
                      title="Edit car"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(car)}
                      className="delete-button"
                      title="Delete car"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .car-list-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .car-list-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .car-list-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .car-table-container {
          overflow-x: auto;
        }

        .car-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .car-table th {
          background: #f7fafc;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 1px solid #e2e8f0;
        }

        .car-table td {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .car-row:hover {
          background: #f7fafc;
        }

        .car-image-cell {
          width: 80px;
        }

        .car-list-image {
          width: 60px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        .car-name-cell {
          max-width: 200px;
        }

        .car-name {
          font-weight: 600;
          color: #2d3748;
          line-height: 1.4;
        }

        .car-type-cell {
          width: 100px;
        }

        .car-type-badge {
          background: #e6fffa;
          color: #234e52;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .car-seats-cell,
        .car-luggage-cell {
          text-align: center;
          font-weight: 600;
          color: #4a5568;
        }

        .car-gearshift-cell {
          width: 100px;
        }

        .gearshift-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .gearshift-badge.automatic {
          background: #fef5e7;
          color: #c05621;
        }

        .gearshift-badge.manual {
          background: #e6fffa;
          color: #234e52;
        }

        .car-price-cell {
          font-weight: 700;
          color: #2d3748;
        }

        .car-actions-cell {
          width: 100px;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .edit-button,
        .delete-button {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s;
        }

        .edit-button:hover {
          background: #e6fffa;
        }

        .delete-button:hover {
          background: #fed7d7;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .empty-state-content {
          max-width: 400px;
          margin: 0 auto;
        }

        .empty-state-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 1rem 0;
        }

        .empty-state-description {
          color: #718096;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .car-table th,
          .car-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.8rem;
          }

          .car-name-cell {
            max-width: 150px;
          }

          .car-list-image {
            width: 50px;
            height: 35px;
          }
        }
      `}</style>
    </div>
  );
};

export default CarList; 