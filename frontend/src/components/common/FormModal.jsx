import React from 'react';

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  isSubmitting = false,
  submitLabel = 'Save',
  size = 'md'
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white p-4 rounded-md shadow-lg ${size === 'md' ? 'w-1/2' : 'w-3/4'}`}
        as="form"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="bg-transparent text-black" onClick={onClose} disabled={isSubmitting}>
            Close
          </button>
        </div>
        <div className="space-y-4">
          {children}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-transparent text-black mr-3"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            type="submit"
            disabled={isSubmitting}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
