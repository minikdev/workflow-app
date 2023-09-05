import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactFlow from 'reactflow';

import 'reactflow/dist/style.css';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
})
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
function App() {
  return (
    <QueryClientProvider client={client}>
      <>
      <div className='w-96 h-96 bg-slate-500'>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
      </div>
      </>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App
