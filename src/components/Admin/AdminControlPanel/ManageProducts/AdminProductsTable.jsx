import { useState } from 'react'
import { useProductsQuery } from '../../../../hooks/productHooks'
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Flex } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import MiniButton from '../../../common/MiniButton'

const AdminProductsTable = ({ onEditProduct, onRemoveProduct }) => {
  const { data, isLoading, error } = useProductsQuery()

  // Helper for cearing TanStack Table columns
  const columnHelper = createColumnHelper()
  const columns = [
    // Display 'Product Name' column by accessing the 'name' property for each product
    columnHelper.accessor('name', {
      header: 'Product Name',
    }),
    // Display 'Price' column by accessing the 'price' property for each product
    columnHelper.accessor('price', {
      header: 'Price',
    }),
    // Display actions for each product
    columnHelper.display({
      id: 'actions',
      cell: (props) => {
        const id = props.row.original.id
        return (
          <Flex gap={4}>
            <MiniButton onClick={() => onEditProduct(id)}>Edit</MiniButton>
            <MiniButton onClick={() => onRemoveProduct(id)}>Delete</MiniButton>
          </Flex>
        )
      },
    }),
  ]

  // TanStack Table main object
  const [sorting, setSorting] = useState([])
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
