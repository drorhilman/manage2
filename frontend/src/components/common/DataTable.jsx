import React from 'react';
import { usePagination } from '../../hooks/usePagination';

const DataTable = ({
  data,
  columns,
  itemsPerPage = 10,
  actions,
  emptyMessage = 'No data available'
}) => {
  const {
    paginatedData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage
  } = usePagination(data, itemsPerPage);

  if (!data.length) {
    return (
      <div className="text-center py-4">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="border border-gray-300">{column.label}</th>
            ))}
            {actions && <th className="border border-gray-300">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`} className="border border-gray-300">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              {actions && (
                <td className="border border-gray-300">
                  <div className="flex space-x-2">
                    {actions(item)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="bg-gray-300 p-2 rounded"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="bg-gray-300 p-2 rounded"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
