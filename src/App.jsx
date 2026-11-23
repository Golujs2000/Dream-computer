import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { StorefrontProvider } from './context/StorefrontContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <StorefrontProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <AppRoutes />
                  <Toaster
                    position="bottom-left"
                    toastOptions={{
                      duration: 3500,
                      style: {
                        background: '#121826',
                        color: '#F5F5F7',
                        border: '1px solid #303746',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                      },
                      success: {
                        iconTheme: {
                          primary: '#BEF8A1',
                          secondary: '#0A101E',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#ef4444',
                          secondary: '#0A101E',
                        },
                      },
                    }}
                  />
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </StorefrontProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
