import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, useToast } from '@chakra-ui/react'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Admin from './Admin'
import Store from './Store'
import theme from '../theme'

const App = () => {
  const toast = useToast()

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => toast({ title: error.message, status: 'error' }),
    }),
    mutationCache: new MutationCache({
      onError: (error) => toast({ title: error.message, status: 'error' }),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
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
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
