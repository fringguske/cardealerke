import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CarCardProps } from '../CarCard';
import CarForm from './CarForm';
import CarList from './CarList';
import { CarService } from '../../services/carService';

/**
 * Main admin dashboard component for managing car inventory
 */
const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<CarCardProps | null>(null);
  const [error, setError] = useState('');

  /**
   * Load cars from Supabase on component mount
   */
  useEffect(() => {
    loadCars();
  }, []);

  /**
   * Fetch all cars from Supabase
   */
  const loadCars = async () => {
    try {
      setLoading(true);
      const carsData = await CarService.getCars();
      setCars(carsData);
    } catch (error) {
      console.error('Error loading cars:', error);
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new car to Supabase
   */
  const handleAddCar = async (carData: Omit<CarCardProps, 'id'>) => {
    try {
      await CarService.addCar(carData);
      setShowForm(false);
      loadCars(); // Reload the list
    } catch (error) {
      console.error('Error adding car:', error);
      setError('Failed to add car');
    }
  };

  /**
   * Update an existing car in Supabase
   */
  const handleUpdateCar = async (carData: CarCardProps) => {
    if (!carData.id) return;
    
    try {
      const { id, ...updateData } = carData;
      await CarService.updateCar(id, updateData);
      setEditingCar(null);
      loadCars(); // Reload the list
    } catch (error) {
      console.error('Error updating car:', error);
      setError('Failed to update car');
    }
  };

  /**
   * Delete a car from Supabase
   */
  const handleDeleteCar = async (car: CarCardProps) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    try {
      await CarService.deleteCar(car);
      loadCars(); // Reload the list
    } catch (error) {
      console.error('Error deleting car:', error);
      setError('Failed to delete car');
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Car Inventory Management</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-controls">
          <button 
            onClick={() => setShowForm(true)} 
            className="add-car-button"
          >
            Add New Car
          </button>
        </div>

        {error && (
          <div className="admin-error">
            {error}
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}

        {showForm && (
          <CarForm
            onSubmit={handleAddCar}
            onCancel={() => setShowForm(false)}
            title="Add New Car"
          />
        )}

        {editingCar && (
          <CarForm
            car={editingCar}
            onSubmit={handleUpdateCar}
            onCancel={() => setEditingCar(null)}
            title="Edit Car"
          />
        )}

        {loading ? (
          <div className="loading-spinner">Loading cars...</div>
        ) : (
          <CarList
            cars={cars}
            onEdit={setEditingCar}
            onDelete={handleDeleteCar}
          />
        )}
      </main>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #f7fafc;
        }

        .admin-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 0;
        }

        .admin-header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .logout-button {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .logout-button:hover {
          background: #c53030;
        }

        .admin-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .admin-controls {
          margin-bottom: 2rem;
        }

        .add-car-button {
          background: #38a169;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .add-car-button:hover {
          background: #2f855a;
        }

        .admin-error {
          background: #fed7d7;
          color: #c53030;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .error-close {
          background: none;
          border: none;
          color: #c53030;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-spinner {
          text-align: center;
          padding: 2rem;
          color: #718096;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard; 