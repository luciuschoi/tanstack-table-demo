import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import type { User } from './types';

import { format } from 'date-fns';
const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.accessor("id", {
    id: "S.No",
    header: 'S.No',
    cell: info => <div className='text-center'>{info.row.index + 1}</div>,
    footer: props => props.column.id
  }),
  columnHelper.accessor('avatar', {
    header: () => 'Avatar',
    cell: info => <Image src={info.getValue()} width={50} height={50} alt={info.getValue()} className='rounded-full my-1 mx-auto' />,
    footer: props => props.column.id
  }),
  columnHelper.accessor('first_name', {
    header: () => 'First Name',
    cell: info => <div className='px-2'>{info.getValue()}</div>,
    footer: props => props.column.id
  }),
  columnHelper.accessor('last_name', {
    header: () => 'Last Name',
    cell: info => <div className='px-2'>{info.getValue()}</div>,
    footer: props => props.column.id
  }),
  columnHelper.accessor('sex', {
    header: () => 'Gender',
    cell: info => <div className='text-center'>{info.getValue()}</div>,
    footer: props => props.column.id
  }),
  columnHelper.accessor('dob', {
    header: () => 'Birth Date',
    cell: info => <div className='text-center'>{format(info.getValue(), 'yyyy-MM-dd')}</div>,
    footer: props => props.column.id
  }),
]