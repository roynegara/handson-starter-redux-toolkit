import CreateCustomer from './components/CreateCustomer'
import Customer from './components/Customer'
import AccountOperations from './components/AccountOperations'
import BalanceDisplay from './components/BalanceDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCustomer } from './features/customer/customerSlice'

const App = () => {
  const customer = useSelector((state) => state.customer)
  const { fullName, isLoading } = customer
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomer())
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading"><h1>Loading...</h1></div>
  }

  return (
    <div>
      <h1>🏦 Dibimbing Bank</h1>
      {fullName === '' ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  )
}

export default App
