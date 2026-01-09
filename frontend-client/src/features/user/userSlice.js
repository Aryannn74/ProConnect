import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";

//old code
// const initialState = {
//   value: null,
// };

//new code
const initialState = {
  value: {},
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const { data } = await api.get("/api/user/data", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.success ? data.user : null;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userData, token }) => {
    const { data } = await api.post("/api/user/update", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.success) {
      toast.success(data.message);
      return data.user;
    } else {
      toast.error(data.message);
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  //! old code 
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.value = action.payload;
  //     })
  //     .addCase(updateUser.fulfilled, (state, action) => {
  //       state.value = action.payload;
  //     });
  // },

  //!new code
  extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload || {};
    })
    .addCase(fetchUser.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch user";
    })

    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload || {};
    })
    .addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to update user";
    });
}

});

export default userSlice.reducer;
