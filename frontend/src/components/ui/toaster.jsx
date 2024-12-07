import React from 'react';

export const toaster = {
  placement: 'bottom-end',
  pauseOnPageIdle: true,
};

export const Toaster = ({ toast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white shadow-lg rounded p-4 ${toast.type === 'loading' ? 'flex items-center' : ''}`}>
        {toast.type === 'loading' && <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full mr-2"></div>}
        <div className="flex flex-col">
          {toast.title && <h4 className="font-bold">{toast.title}</h4>}
          {toast.description && <p>{toast.description}</p>}
        </div>
        {toast.action && (
          <button className="mt-2 bg-blue-500 text-white rounded px-2 py-1">
            {toast.action.label}
          </button>
        )}
        {toast.closable && (
          <button className="absolute top-2 right-2 text-gray-500" onClick={toast.close}>
            &times;
          </button>
        )}
      </div>
    </div>
  );
};
