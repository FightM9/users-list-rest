import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/store";
import {
  getUserList,
  setSortKey,
  setSortOrder,
  sortUserList,
} from "store/users.slice";
import { Address, List, Sort, SortItem, User } from "./UserList.style";

export default function UserList() {
  const dispatch = useDispatch();
  const { userList, loading, userListSort } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortUserList());
  }, [dispatch, userListSort]);

  return loading ? (
    <div aria-busy></div>
  ) : (
    <>
      <h1>User List</h1>
      <Sort>
        <h2 className='visually-hidden'>Sort user list</h2>
        <SortItem>
          Sort
          <select onChange={(e) => dispatch(setSortKey(e.target.value))}>
            <option value='name'> Name</option>
            <option value='city'>City</option>
            <option value='company'>Company</option>
          </select>
        </SortItem>
        <SortItem>
          Order
          <select onChange={(e) => dispatch(setSortOrder(e.target.value))}>
            <option value='asc'> ASC</option>
            <option value='desc'>DESC</option>
          </select>
        </SortItem>
      </Sort>

      <List>
        {userList.map((user) => (
          <li key={user.id}>
            <User>
              <header>
                <h2>{user.name}</h2>
                <Link role='button' to={`user/${user.id}`} aria-label="Open user profile">
                <svg viewBox="64 64 896 896" focusable="false" width="1rem" height="1rem" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
                </Link>
              </header>
              <div>
                <b>Company:</b> {user.company.name}
              </div>
              <Address>
                <b>City:</b> {user.address.city}
              </Address>
            </User>
          </li>
        ))}
      </List>
    </>
  );
}
