import ReactDOM from 'react-dom/client'
import { Constructor } from './components/Constructor.tsx'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Constructor />
  </ThemeProvider>,
)
