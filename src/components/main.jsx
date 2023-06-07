import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Admin from './Admin'
import Store from './Store'
import theme from '../theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={theme}
        toastOptions={{ defaultOptions: { duration: 2000 } }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Store />} />
            <Route path="admin/*" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
