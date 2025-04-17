'use client';

import { tablelocalization } from '@/constants/localization/localization';
import Button from '@/shared/Button/Button';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from 'react-icons/fa';


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

export default function Table({
  columns,
  data = [],
  rowsPerPage = 10,
}: TableProps) {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('newest');

  if (!Array.isArray(data)) {
    return <div>Invalid data format</div>;
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortOption === 'expensive') return b.price - a.price;
    if (sortOption === 'cheap') return a.price - b.price;
    if (sortOption === 'newest')
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

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
    <div>
      <div className="flex justify-between pl-2 items-center">
        <div className="flex items-center gap-3 -mr-6 mb-5 font-sahel">
          <p>{tablelocalization.sort}:</p>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-lg border"
          >
            <option value="newest">{tablelocalization.newest}</option>
            <option value="oldest">{tablelocalization.oldest}</option>
            <option value="expensive">{tablelocalization.expensive}</option>
            <option value="cheap">{tablelocalization.cheap}</option>
          </select>
        </div>
        <div>
          <Button className="bg-custom-200 rounded-lg p-3 active:scale-95 text-sm font-semibold">
            {tablelocalization.addproduct}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-custom-500 bg-gradient-to-br from-custom-100 via-white to-custom-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] py-6 px-3 -mr-9 space-y-4 transition-all">
        <div className="overflow-hidden rounded-xl border border-custom-500 shadow-inner backdrop-blur-md">
          <table className="min-w-full text-sm font-medium">
            <thead className="bg-custom-400 text-xs uppercase font-sahel tracking-wider">
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
                <th className="px-6 py-4 text-center whitespace-nowrap">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom-500 bg-white font-sahel text-sm font-medium">
              {paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-gradient-to-r hover:from-white hover:to-custom-50 transition-colors duration-300 ease-in-out hover:shadow-sm"
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] transition-all duration-200"
                      title={
                        typeof row[col.key] === 'string' ? row[col.key] : ''
                      }
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                  <td className="py-4 px-1 text-center whitespace-nowrap">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        className="hover:text-blue-600 text-lg transition-all duration-200"
                        title="ویرایش"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button className="hover:text-red-600 transition-all duration-200">
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </div>
  );
}