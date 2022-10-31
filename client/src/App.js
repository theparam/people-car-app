import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import 'antd/dist/antd.css'
import Home from './components/containers/Home'
import Show from './components/containers/Show'
import { Route, Routes, BrowserRouter } from 'react-router-dom'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:id" element={<Show />} />
      </Routes>
      </BrowserRouter>

    </div>
  </ApolloProvider>
)

export default App
