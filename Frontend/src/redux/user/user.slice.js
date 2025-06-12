// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     isLoggedIn: false,
//     user: {},
// }

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             const payload = action.payload
//             state.isLoggedIn = true
//             state.user = payload
//         },
//         removeUser: (state, action) => {
//             state.isLoggedIn = false
//             state.user = {}
//         }
//     },
// })


// export const { setUser, removeUser } = userSlice.actions
// export default userSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const payload = action.payload
            state.isLoggedIn = true
            state.user = payload

            // ✅ Log user info to check role
            // console.log("🧠 Redux setUser: Logged-in user payload:", payload)
            // console.log("🔐 User role saved in Redux:", payload?.role)
        },
        removeUser: (state) => {
            state.isLoggedIn = false
            state.user = {}
            // console.log("🚪 User logged out — Redux state cleared.")
        }
    },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
