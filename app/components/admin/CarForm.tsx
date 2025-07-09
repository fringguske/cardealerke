import React, { useState, useEffect } from 'react';
import { CarCardProps } from '../CarCard';
import { supabase } from '../../lib/supabase';

interface CarFormProps {
  car?: CarCardProps;
  onSubmit: (carData: Omit<CarCardProps, 'id'> | CarCardProps) => void;
  onCancel: () => void;
  title: string;
}

/**
 * Form component for adding and editing car details
 * Features improved styling, better contrast, and enhanced usability
 */
const CarForm: React.FC<CarFormProps> = ({ car, onSubmit, onCancel, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    seats: 5,
    gearshift: 'Automatic' as 'Automatic' | 'Manual',
    images: [] as string[],
    priceKsh: 0,
    topSpeed: '',
    brakesType: '',
    fuelConsumption: '',
    acceleration: '',
    torque: '',
    gasTankCapacity: '',
    color: '',
    mileage: '',
    year: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Initialize form with car data if editing
  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name,
        type: car.type,
        seats: car.seats,
        gearshift: car.gearshift,
        images: car.images || [],
        priceKsh: car.priceKsh,
        topSpeed: car.topSpeed || '',
        brakesType: car.brakesType || '',
        fuelConsumption: car.fuelConsumption || '',
        acceleration: car.acceleration || '',
        torque: car.torque || '',
        gasTankCapacity: car.gasTankCapacity || '',
        color: car.color || '',
        mileage: car.mileage || '',
        year: car.year || '',
      });
    }
  }, [car]);

  /**
   * Validate form data before submission
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Car name is required';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Car type is required';
    }

    if (formData.seats < 1 || formData.seats > 10) {
      newErrors.seats = 'Seats must be between 1 and 10';
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    if (formData.priceKsh <= 0) {
      newErrors.priceKsh = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (car) {
      // Editing existing car
      onSubmit({ ...formData, id: car.id });
    } else {
      // Adding new car
      onSubmit(formData);
    }
  };

  /**
   * Handle input changes with improved validation
   */
  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'priceKsh') {
      const num = parseInt(value as string, 10);
      setFormData(prev => ({ ...prev, [field]: isNaN(num) ? 0 : num }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Handle file input change and upload to Supabase Storage
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    let uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validTypes.includes(file.type)) {
        setUploadError('Please select a valid image file (JPEG, PNG, or WebP)');
        continue;
      }
      if (file.size > maxSize) {
        setUploadError('Image size must be less than 5MB');
        continue;
      }
      try {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `car-images/${fileName}`;
        const { data, error } = await supabase.storage
          .from('car-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        if (error) {
          throw error;
        }
        const { data: urlData } = supabase.storage
          .from('car-images')
          .getPublicUrl(filePath);
        uploadedUrls.push(urlData.publicUrl);
      } catch (error) {
        console.error('Upload error:', error);
        setUploadError('Failed to upload image. Please try again.');
      }
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
    setUploadProgress(100);
    setTimeout(() => setUploadProgress(null), 1000);
  };

  return (
    <div className="car-form-overlay">
      <div className="car-form-modal">
        <div className="car-form-header">
          <h2 className="car-form-title">{title}</h2>
          <button 
            onClick={onCancel} 
            className="car-form-close"
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Car Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g., STANDARD (VOLKSWAGEN JETTA)"
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Car Type <span className="required">*</span>
              </label>
              <input
                type="text"
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className={`form-input ${errors.type ? 'error' : ''}`}
                placeholder="e.g., Sedan, SUV"
                required
              />
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="seats" className="form-label">
                Number of Seats <span className="required">*</span>
              </label>
              <input
                type="number"
                id="seats"
                value={formData.seats}
                onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
                className={`form-input ${errors.seats ? 'error' : ''}`}
                min="1"
                max="10"
                required
              />
              {errors.seats && <span className="error-message">{errors.seats}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gearshift" className="form-label">
                Gearshift Type <span className="required">*</span>
              </label>
              <select
                id="gearshift"
                value={formData.gearshift}
                onChange={(e) => handleInputChange('gearshift', e.target.value as 'Automatic' | 'Manual')}
                className="form-input"
                required
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priceKsh" className="form-label">
                Price (KSH) <span className="required">*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">KSH</span>
                <input
                  type="number"
                  id="priceKsh"
                  value={isNaN(formData.priceKsh) ? '' : formData.priceKsh}
                  onChange={(e) => handleInputChange('priceKsh', e.target.value)}
                  className={`form-input price-input ${errors.priceKsh ? 'error' : ''}`}
                  min="1"
                  placeholder="12500"
                  required
                />
              </div>
              {errors.priceKsh && <span className="error-message">{errors.priceKsh}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="topSpeed" className="form-label">Top Speed</label>
              <input
                type="text"
                id="topSpeed"
                value={formData.topSpeed}
                onChange={e => handleInputChange('topSpeed', e.target.value)}
                className="form-input"
                placeholder="e.g., 220 km/h"
              />
              <small className="form-helper">Maximum speed the car can reach.</small>
            </div>
            <div className="form-group">
              <label htmlFor="brakesType" className="form-label">Types of Brakes</label>
              <input
                type="text"
                id="brakesType"
                value={formData.brakesType}
                onChange={e => handleInputChange('brakesType', e.target.value)}
                className="form-input"
                placeholder="e.g., Disc, Drum"
              />
              <small className="form-helper">Type(s) of brakes (e.g., Disc, Drum).</small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fuelConsumption" className="form-label">Fuel Consumption</label>
              <input
                type="text"
                id="fuelConsumption"
                value={formData.fuelConsumption}
                onChange={e => handleInputChange('fuelConsumption', e.target.value)}
                className="form-input"
                placeholder="e.g., 10 km/L"
              />
              <small className="form-helper">Average fuel consumption.</small>
            </div>
            <div className="form-group">
              <label htmlFor="acceleration" className="form-label">Acceleration</label>
              <input
                type="text"
                id="acceleration"
                value={formData.acceleration}
                onChange={e => handleInputChange('acceleration', e.target.value)}
                className="form-input"
                placeholder="e.g., 0-100 km/h: 4.4 seconds"
              />
              <small className="form-helper">Time to accelerate from 0-100 km/h.</small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="torque" className="form-label">Torque</label>
              <input
                type="text"
                id="torque"
                value={formData.torque}
                onChange={e => handleInputChange('torque', e.target.value)}
                className="form-input"
                placeholder="e.g., 320 Nm"
              />
              <small className="form-helper">Maximum torque output.</small>
            </div>
            <div className="form-group">
              <label htmlFor="gasTankCapacity" className="form-label">Gas Tank Capacity</label>
              <input
                type="text"
                id="gasTankCapacity"
                value={formData.gasTankCapacity}
                onChange={e => handleInputChange('gasTankCapacity', e.target.value)}
                className="form-input"
                placeholder="e.g., 50 L"
              />
              <small className="form-helper">Total fuel tank capacity.</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color" className="form-label">Color</label>
              <input
                type="text"
                id="color"
                value={formData.color}
                onChange={e => handleInputChange('color', e.target.value)}
                className="form-input"
                placeholder="e.g., Red, Blue, Black"
              />
              <small className="form-helper">Car color (optional).</small>
            </div>
            <div className="form-group">
              <label htmlFor="mileage" className="form-label">Mileage</label>
              <input
                type="text"
                id="mileage"
                value={formData.mileage}
                onChange={e => handleInputChange('mileage', e.target.value)}
                className="form-input"
                placeholder="e.g., 50,000 km"
              />
              <small className="form-helper">Car mileage (optional).</small>
            </div>
            <div className="form-group">
              <label htmlFor="year" className="form-label">Year</label>
              <input
                type="text"
                id="year"
                value={formData.year}
                onChange={e => handleInputChange('year', e.target.value)}
                className="form-input"
                placeholder="e.g., 2022"
              />
              <small className="form-helper">Year of manufacture (optional).</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images" className="form-label">
              Car Images <span className="required">*</span>
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="images"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className={`file-input ${errors.images ? 'error' : ''}`}
                disabled={uploading}
                multiple
                required={formData.images.length === 0}
              />
              <div className="file-upload-info">
                <p className="file-upload-text">
                  Accepted formats: JPEG, PNG, WebP (max 5MB). You can select multiple images.
                </p>
              </div>
            </div>
            {uploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress || 0}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  Uploading: {uploadProgress ? uploadProgress.toFixed(0) : 0}%
                </span>
              </div>
            )}
            {formData.images.length > 0 && !uploading && (
              <div className="uploaded-image-preview" style={{flexDirection: 'row', flexWrap: 'wrap', gap: '1rem'}}>
                {formData.images.map((img, idx) => (
                  <div key={img} style={{position: 'relative'}}>
                    <img 
                      src={img} 
                      alt={`Car preview ${idx+1}`}
                      className="preview-image"
                    />
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      style={{position: 'absolute', top: 2, right: 2, padding: '0.2rem 0.5rem'}}
                      onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {uploadError && <span className="error-message">{uploadError}</span>}
            {errors.images && !uploading && <span className="error-message">{errors.images}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={uploading}>
              {uploading ? 'Uploading...' : (car ? 'Update Car' : 'Add Car')}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .car-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(4px);
        }

        .car-form-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
        }

        .car-form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #f3f4f6;
          background: #fafafa;
          border-radius: 16px 16px 0 0;
        }

        .car-form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .car-form-close {
          background: none;
          border: none;
          font-size: 1.75rem;
          color: #6b7280;
          cursor: pointer;
          padding: 0.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-weight: 300;
        }

        .car-form-close:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .car-form {
          padding: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .required {
          color: #dc2626;
          font-weight: 700;
        }

        .form-input {
          padding: 0.875rem 1rem;
          border: 2px solid #d1d5db;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: white;
          color: #111827;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input:hover:not(:focus) {
          border-color: #9ca3af;
        }

        .form-input.error {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .form-input.error:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .price-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency-symbol {
          position: absolute;
          left: 1rem;
          color: #6b7280;
          font-weight: 500;
          z-index: 1;
        }

        .price-input {
          padding-left: 3.5rem;
        }

        .file-upload-container {
          border: 2px dashed #d1d5db;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .file-upload-container:hover {
          border-color: #3b82f6;
          background: #f0f9ff;
        }

        .file-input {
          width: 100%;
          padding: 0.75rem;
          border: none;
          background: transparent;
          color: transparent;
          cursor: pointer;
        }

        .file-input::-webkit-file-upload-button {
          visibility: hidden;
        }

        .file-input::before {
          content: 'Choose Image';
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          margin-right: 1rem;
          transition: background-color 0.2s ease;
        }

        .file-input:hover::before {
          background: #2563eb;
        }

        .file-upload-info {
          margin-top: 0.75rem;
        }

        .file-upload-text {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0;
        }

        .upload-progress {
          margin-top: 1rem;
          padding: 1rem;
          background: #f0f9ff;
          border-radius: 8px;
          border: 1px solid #bae6fd;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e0f2fe;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          transition: width 0.3s ease;
        }

        .progress-text {
          color: #0369a1;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .uploaded-image-preview {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .preview-image {
          max-width: 200px;
          max-height: 150px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          object-fit: cover;
        }

        .remove-image-btn {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .remove-image-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .error-message {
          color: #dc2626;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f3f4f6;
        }

        .cancel-button {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 0.875rem 1.75rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .cancel-button:hover {
          background: #e5e7eb;
          border-color: #9ca3af;
        }

        .submit-button {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          padding: 0.875rem 1.75rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-1px);
          box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
        }

        .submit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .car-form-modal {
            margin: 1rem;
            max-height: 95vh;
          }
          
          .car-form {
            padding: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .form-actions {
            flex-direction: column-reverse;
          }
          
          .car-form-header {
            padding: 1rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .car-form-overlay {
            padding: 0.5rem;
          }
          
          .car-form {
            padding: 1rem;
          }
          
          .car-form-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CarForm; 