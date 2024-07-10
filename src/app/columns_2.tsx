import { ColumnDef } from '@tanstack/react-table';
import type { User } from './types';
import Image from 'next/image';
import {format}from 'date-fns';

export const columns_2: ColumnDef<User>[] = [
  {
    accessorKey: "S.No",
    header: 'S.No',
    cell: ({row}) => <div className='text-center'>{row.index + 1}</div>,
    footer: row => row.column.id
  },
  {
    accessorKey: 'avatar',
    header: () => 'Avatar',
    cell: ({row}) => <Image src={row.getValue('avatar')} width={50} height={50} alt={row.getValue('avatar')} className='rounded-full my-1 mx-auto' />,
    footer: row => row.column.id
  },
  {
    id: "full_name",
    header: () => 'Full Name',
    footer: row => row.column.id,
    columns: [
      {
        accessorKey: 'first_name',
        header: () => 'First Name',
        cell: ({row}) => <div className='px-2'>{row.getValue('first_name')}</div>,
        footer: row => row.column.id
      },
      {
        accessorKey: 'last_name',
        header: () => 'Last Name',
        cell: ({row}) => <div className='px-2'>{row.getValue('last_name')}</div>,
        footer: row => row.column.id
      }
    ]
  },
  {
    accessorKey: 'sex',
    header: () => 'Gender',
    cell: ({row}) => <div className='text-center'>{row.getValue('sex')}</div>,
    footer: row => row.column.id
  },
  {
    accessorKey: 'dob',
    header: () => 'Birth Date',
    cell: ({row}) => <div className='text-center'>{format(row.getValue('dob'), 'yyyy-MM-dd')}</div>,
    footer: props => props.column.id
  },
]