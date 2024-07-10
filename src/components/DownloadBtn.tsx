import React from 'react'
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import type { User } from '@/app/types'
import * as XLSX from 'xlsx';

// 현재 날짜와 시간을 기반으로 타임스탬프 생성
function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// 파일 이름에 타임스탬프 추가
function generateFilenameWithTimestamp(filename: string) {
  const timestamp = generateTimestamp();
  const fileParts = filename.split('.');
  const extension = fileParts.pop();
  const baseName = fileParts.join('.');

  return `${baseName}_${timestamp}.${extension}`;
}

const DownloadBtn = ({ data = [], filename }: { data: User[], filename: string }) => {
  return (
    <button
      className='flex gap-1 items-center px-2 py-1 border rounded-md mr-1 my-1 hover:bg-gray-100'
      onClick={() => {
        const users: User[] = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, generateFilenameWithTimestamp( filename ? `${filename}.xlsx` : "users.xlsx"));

      }}
    >
      <PiMicrosoftExcelLogoFill className='text-green-700' />
      Download
    </button>
  )
}

export default DownloadBtn