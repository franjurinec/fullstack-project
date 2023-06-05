import { useState } from 'react'
import {
  useProductRemoveMutation,
  useProductsQuery,
} from '../../../../hooks/productHooks'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import MiniButton from '../../../common/MiniButton'

const RowActions = (props) => {
  const id = props.row.original.id

  const toast = useToast()
  const { mutate: removeProduct } = useProductRemoveMutation()

  const onEdit = () => {
    console.log(id)
  } // TODO: Open edit modal

  const onRemove = () =>
    removeProduct(id, {
      onSuccess: () =>
        toast({
          title: 'Product removed successfully!',
          status: 'success',
        }),
      onError: () =>
        toast({ title: 'Failed to remove product!', status: 'error' }),
    })

  return (
    <Flex gap={4}>
      <MiniButton onClick={onEdit}>Edit</MiniButton>
      <MiniButton onClick={onRemove}>Delete</MiniButton>
    </Flex>
  )
}

const AdminProductsTable = () => {
  const { data, isLoading, error } = useProductsQuery()
  const [sorting, setSorting] = useState([])

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('name', {
      header: 'Product Name',
    }),
    columnHelper.accessor('price', {
      header: 'Price',
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => <RowActions row={props.row} />,
    }),
  ]

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  if (isLoading || error) return null
  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              )
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default AdminProductsTable
