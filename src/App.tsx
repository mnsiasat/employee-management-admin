import './App.css'
import EmployeesProvider from './store/EmployeesContext'
import Main from './components/Main'

function App() {

  return (
    <EmployeesProvider>
      <div className="App">
        <Main/>
      </div>
    </EmployeesProvider>
  )
}

export default App
