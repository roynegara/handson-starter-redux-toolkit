import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
  // isError: false,
}

export const deposit = createAsyncThunk(
  'account/deposit',
  async (payload, thunkAPI) => {
    const { amount, currency } = payload
    const {rejectWithValue} = thunkAPI

    if ( currency === 'IDR') return amount
    
try {
  const res = await fetch
    (`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=IDR`)
  const data = await res.json()
  const converted = data.rates.IDR
  return converted

} catch (error) {
  return rejectWithValue('Something went wrong')
    }
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    
    withdraw(state, action) {
      state.balance = state.balance - action.payload
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        }
      },
      reducer(state, action) {
        if (state.loan > 0) {
          return
        }

        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance = state.balance + action.payload.amount
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - state.loan
      state.loan = 0
      state.loanPurpose = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deposit.fulfilled, (state, action) => {
      state.isLoading = false
      state.balance = state.balance + action.payload
    })
    builder.addCase(deposit.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deposit.rejected, (state) => {
      state.isLoading = false
      // state.isError = true
    })
  }
})

export const {  withdraw, payLoan, requestLoan } = accountSlice.actions

export default accountSlice.reducer
