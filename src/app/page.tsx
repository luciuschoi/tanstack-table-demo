'use client';

import Image from "next/image";
import { useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react';
import type { User } from './types';

import DataTable from './data-table';

export default function Home() {

  return (
    <div className='flex flex-col justify-center items-center max-w-5xl mx-auto '>
      <h1 className='text-3xl font-bold my-4'>Demo of TanStack Table</h1>
      <DataTable />
    </div>
  );
}
