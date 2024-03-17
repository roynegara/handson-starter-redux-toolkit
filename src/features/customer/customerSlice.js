import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
  isLoading: false,
}


export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async () => {
    const res = await fetch('https://dummyjson.com/users/1')
    const data = await res.json()
    const customerData = {
      fullName: `${data.firstName} ${data.lastName}`,
      nationalId: data.id,
      createdAt: new Date().toISOString(),
    }
    return customerData
  }
)


const customerSlice = createSlice({
  name: 'customer',
  initialState: initialStateCustomer,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.fullName = action.payload.fullName
        state.nationalId = action.payload.nationalId
        state.createdAt = action.payload.createdAt
      })
      .addCase(fetchCustomer.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { createCustomer, updateName } = customerSlice.actions
export default customerSlice.reducer


// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// const initialStateCustomer = {
//   fullName: '',
//   nationalId: '',
//   createdAt: '',
//   // isLoading: false,
// }

// const customerReducer = (state = initialStateCustomer, action) => {
//   switch (action.type) {
//     case 'customer/create':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       }
//     case 'customer/updateName':
//       return { ...state, fullName: action.payload.fullName }
//     default:
//       return { ...state }
//   }
// }

// export const createCustomer = (fullName, nationalId) => {
//   return {
//     type: 'customer/create',
//     payload: {
//       fullName,
//       nationalId,
//       createdAt: new Date().toISOString(),
//     },
//   }
// }

// export const updateName = (fullName) => {
//   return { type: 'account/updateName', payload: fullName }
// }

// export default customerReducer
