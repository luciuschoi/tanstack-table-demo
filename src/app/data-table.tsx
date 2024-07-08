'use client'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { getAllUsers } from './data'
import type { User } from './types'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import DownloadBtn from '@/components/DownloadBtn'
import DebouncedInput from '@/components/DebouncedInput'

const DataTable = () => {
  const [data, setData] = useState<User[]>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers()
      setData(users)
    }
    fetchData()
  }, [])

  console.log("data", data)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    }
  })


  return (
    <div className='w-full mx-auto border rounded-lg overflow-auto mb-4'>
      <div className='flex justify-between m-2'>
        <div className='flex w-full items-center gap-2 ml-2'>
          <FaSearch />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value: string) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/3 focus:w-1/2 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
        <DownloadBtn data={data} filename={"users"} />
      </div>
      <table className='w-full'>
        <thead className=' bg-gray-100'>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id} className='border py-2'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getFilteredRowModel().rows.length ? (table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f3f363]'} hover:bg-gray-100`}>
                {
                  row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='border'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))
                }
              </tr>
            ))) : (
              <tr>
                <td colSpan={columns.length} className='text-center text-gray-400 h-[5rem]'>No data found</td>
              </tr>
            )
          }
        </tbody>
        <tfoot className='bg-gray-100'>
          {
            table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {
                  footerGroup.headers.map(footer => (
                    <th key={footer.id} className='border py-2'>
                      {flexRender(footer.column.columnDef.footer, footer.getContext())}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
      <div className='flex justify-around items-center py-3'>
        <div>
          Selected Rows: {table.getFilteredRowModel().rows.length}
        </div>

        <div className='flex gap-2 p-2 justify-center items-center'>
          <button className='border rounded-md p-0.5 disabled:opacity-30' onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
            <MdFirstPage className='text-xl' />
          </button>
          <button className='border rounded-md p-1 disabled:opacity-30' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <IoIosArrowBack />
          </button>

          <div>
            Page {' '}
            <input
              type='number'
              className='border rounded-md w-12 text-center'
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const value = Number(e.target.value)
                if (value > 0 && value <= table.getPageCount()) {
                  table.setPageIndex(value - 1)
                }
              }}
            /> of {' '}
            {table.getPageCount()}
          </div>

          <button className='border rounded-md p-1 disabled:opacity-30' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <IoIosArrowForward />
          </button>
          <button className='border rounded-md p-0.5 disabled:opacity-30' onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
            <MdLastPage className='text-xl' />
          </button>
        </div>
        <div>
          Page Size
          <select
            defaultValue={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            className='border rounded-md px-1 py-0.5 disabled:opacity-30'
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div >
  )
}

export default DataTable