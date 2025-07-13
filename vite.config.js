import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  const { default: netlify } = await import('@netlify/vite-plugin')

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      netlify(),
    ],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'https://www.themealdb.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api/json/v1/1'),
          secure: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log(
                'Received Response from the Target:',
                proxyRes.statusCode,
                req.url
              )
            })
          },
        },
      },
    },
    build: {
      outDir: 'build',
    },
  }
})
