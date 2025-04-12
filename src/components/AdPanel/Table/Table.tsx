'use client';

import { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

type TableProps = {
  columns: {
    key: string;
    title: string;
    width?: string;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  data: any[];
  rowsPerPage?: number;
};

export default function FancyTable({
  columns,
  data,
  rowsPerPage = 10,
}: TableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const getPageNumbers = () => {
    const range = [];
    const maxPagesToShow = 3;
    let start = Math.max(page - 1, 1);
    let end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="overflow-x-auto rounded-[2rem] border border-custom-500 bg-gradient-to-br from-custom-100 via-white to-custom-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-6 space-y-4 transition-all">
      <div className="overflow-hidden rounded-xl border border-custom-500 shadow-inner backdrop-blur-md">
        <table className="min-w-full text-sm font-medium">
          <thead className="bg-custom-400 text-xs uppercase tracking-wider">
            <tr className="transition-all duration-300">
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{ width: col.width || 'auto' }}
                  className="px-6 py-4 text-center whitespace-nowrap"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-custom-500 bg-white">
            {paginatedData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gradient-to-r hover:from-white hover:to-custom-50 transition-colors duration-300 ease-in-out hover:shadow-sm"
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className="py-4 text-center whitespace-nowrap transition-all duration-200"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-3">
        <span className="text-xs">
          نمایش <b>{startIndex + 1}</b> تا{' '}
          <b>{Math.min(startIndex + rowsPerPage, data.length)}</b> از{' '}
          <b>{data.length}</b>
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40 transition-all duration-300"
          >
            <FaChevronLeft className="w-3 h-3" />
          </button>

          {getPageNumbers().map(pageNum => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1.5 rounded-xl border-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out
                ${
                  page === pageNum
                    ? 'bg-custom-400 text-white border-custom-500 scale-105'
                    : 'bg-white border-custom-500 hover:bg-custom-200 hover:scale-[1.05]'
                }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40 transition-all duration-300"
          >
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
