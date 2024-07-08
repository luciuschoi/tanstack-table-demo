import React from 'react'
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import type { User } from '../app/types'
import * as XLSX from 'xlsx';

const DownloadBtn = ({ data = [], filename }: { data: User[], filename: string }) => {
  return (
    <button
      className='flex gap-1 items-center px-2 py-1 border rounded-md mr-1 my-1 hover:bg-gray-100'
      onClick={() => {
        const users: User[] = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1:Users");
        XLSX.writeFile(workbook, filename ? `${filename}.xlsx` : "users.xlsx");

      }}
    >
      <PiMicrosoftExcelLogoFill className='text-green-700' />
      Download
    </button>
  )
}

export default DownloadBtn