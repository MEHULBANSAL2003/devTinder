
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './redux/appStore.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
      </Provider>

)
