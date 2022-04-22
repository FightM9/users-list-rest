import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "types/user/User";
import { request } from "api/service";

export const getUserList: any = createAsyncThunk(
  "users/getUserList",
  async () => {
    const response = await request.get("/users");
    return response.data;
  }
);

export const getUserDetail = createAsyncThunk(
  "users/getUserDetail",
  async (id: number) => {
    const response = await request.get(`/users/${id}`);
    return response.data;
  }
);

export const updateUserDetail = createAsyncThunk(
  "users/updateUserDetail",
  async (user: any) => {  
    await request.put(`/users/${user.id}`, user).then((response) => {
      // PUT log
      console.groupCollapsed('PUT');
      console.log(`Status ${response.status}, User data:`);
      console.log(response.data);
      console.groupEnd()
    });
  }
);

export enum SortKey {
  name = "name",
  city = "city",
  company = "company",
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

interface InitialStateType {
  userList: User[];
  userListSort: { key: string, order: string;};
  userDetail: User;
  loading: boolean;
}

const initialState: InitialStateType = {
  userList: [],
  userListSort: { key: SortKey.name, order: SortOrder.asc },
  userDetail: {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  },
  loading: true,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sortUserList(state) {
      const users = state.userList;
      switch (state.userListSort.key) {
        case SortKey.name:
          users.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case SortKey.city:
          users.sort((a, b) => a.address.city.localeCompare(b.address.city));
          break;
        case SortKey.company:
          users.sort((a, b) => a.company.name.localeCompare(b.company.name));
          break;
      }

      state.userListSort.order === SortOrder.asc
        ? (state.userList = users)
        : (state.userList = users.reverse());
    },
    setSortOrder(state, action: PayloadAction<string>) {
      state.userListSort.order = action.payload;
    },
    setSortKey(state, action: PayloadAction<string>) {
      state.userListSort.key = action.payload;
    },
  },
  extraReducers: {
    // get user list
    [getUserList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserList.fulfilled.toString()]: (
      state,
      action: PayloadAction<User[]>
    ) => {
      if (!action.payload) return;
      state.userList = [...action.payload];
      state.loading = false;
    },
    [getUserList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get user detail
    [getUserDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.userDetail = { ...action.payload };
    },
    [getUserDetail.rejected.toString()]: (state) => {
      state.loading = true;
    },
  },
});

export const { setSortOrder, setSortKey, sortUserList } = usersSlice.actions;
export default usersSlice.reducer;
