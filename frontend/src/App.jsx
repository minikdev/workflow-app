// 3RD PARTY IMPORTS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// COMPONENT IMPORTS
import { Header } from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import { Home } from './views/Home/Home';

// STYLES
import './App.css'
import 'reactflow/dist/style.css';
import './index.css'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={client}>
        <div className='flex flex-col justify-between h-screen' >
          <Header />
           <Home/>
          <Footer />
        </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App
