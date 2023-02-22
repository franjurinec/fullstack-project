import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import Admin from './components/Admin'
import Store from './components/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
