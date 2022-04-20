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
      <h1 >User List</h1>
      <Sort>
        <h2 className="visually-hidden">Sort user list</h2>
        <SortItem>
          Sort
          <select onChange={(e) => dispatch(setSortKey(e.target.value))}>
            <option value='name' selected>
              Name
            </option>
            <option value='city'>City</option>
            <option value='company'>Company</option>
          </select>
        </SortItem>
        <SortItem>
          Order
          <select onChange={(e) => dispatch(setSortOrder(e.target.value))}>
            <option value='asc' selected>
              ASC
            </option>
            <option value='desc'>DESC</option>
          </select>
        </SortItem>
      </Sort>

      <List>
        {userList.map((user) => (
          <li>
            <User>
              <header>
                <h2>{user.name}</h2>
                <Link role='button' to={`user/${user.id}`}>
                  Edit
                </Link>
              </header>
              <div><b>Company:</b> {user.company.name}</div>
              <Address><b>City:</b> {user.address.city}</Address>
            </User>
          </li>
        ))}
      </List>
    </>
  );
}
