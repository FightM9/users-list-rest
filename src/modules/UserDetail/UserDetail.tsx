import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetail, updateUserDetail } from "store/users.slice";
import { RootState } from "store/store";

import { ProfileHeader, FormGroupe, Input } from "./userDetail.styles";

export default function UserDetail() {
  const { id } = useParams<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editable, setEdtable] = useState(false);
  const { userDetail, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (id) {
      // @ts-ignore
      dispatch(getUserDetail(Number(id)));
    }
  }, [dispatch, id]);

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // @ts-ignore
    const data = new FormData(evt.target);
    const value = Object.fromEntries(data.entries());

    const user = {
      id: id,
      name: value.name,
      username: value.username,
      address: {
        city: value.city,
        street: value.street,
        zipcode: value.zipcode,
      },
      email: value.email,
      phone: value.phone,
      website: value.website,
      comment: value?.comment,
    };

    // @ts-ignore
    dispatch(updateUserDetail(Number(id), user));
    console.log(user);
    navigate("/");
  };

  return loading ? (
    <div aria-busy></div>
  ) : (
    <>
      <ProfileHeader>
        <h1 className='title'>User Profile</h1>
        <label className='switch'>
          <span className=''>Edit</span>
          <input
            onChange={(e) => setEdtable(e.target.checked)}
            checked={editable}
            type='checkbox'
            role='switch'
            name='switch'
            defaultValue={userDetail.name}
          />
        </label>
      </ProfileHeader>

      <form onSubmit={(evt) => onFormSubmit(evt)}>
        <FormGroupe disabled={!editable}>
          <legend>
            <h2>User</h2>
          </legend>
          <label>
            Name
            <Input
              type='text'
              name='name'
              defaultValue={userDetail.name}
              minLength={4}
              required
            />
          </label>
          <label>
            Username
            <Input
              type='text'
              name='username'
              defaultValue={userDetail.username}
              minLength={4}
              maxLength={20}
              pattern='^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$'
              required
            />
          </label>
        </FormGroupe>

        <FormGroupe disabled={!editable}>
          <legend>
            <h2>Address</h2>
          </legend>
          <div className='grid'>
            <label>
              City
              <Input
                type='text'
                name='city'
                defaultValue={userDetail.address.city}
                required
              />
            </label>
            <label>
              ZIP Code
              <Input
                type='text'
                name='zipcode'
                defaultValue={userDetail.address.zipcode}
                required
              />
            </label>
          </div>
          <label>
            Street
            <Input
              type='text'
              name='street'
              defaultValue={userDetail.address.street}
              required
            />
          </label>
        </FormGroupe>
        <FormGroupe disabled={!editable}>
          <legend>
            <h2>Contact</h2>
          </legend>
          <label>
            E-mail
            <Input
              type='email'
              name='email'
              defaultValue={userDetail.email}
              required
            />
          </label>
          <div className='grid'>
            <label>
              Phone
              <Input
                type='text'
                name='phone'
                defaultValue={userDetail.phone}
                required
              />
            </label>
            <label>
              Website
              <Input
                type='text'
                name='website'
                defaultValue={userDetail.website}
                pattern='^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$'
                required
              />
            </label>
          </div>
        </FormGroupe>

        {editable ? (
          <>
            <FormGroupe>
              <legend>
                <hgroup>
                  <h2>Comment</h2>
                  <span>We're happy to plan whatever you like.</span>
                </hgroup>
              </legend>

              <textarea name='comment'></textarea>
            </FormGroupe>
          </>
        ) : null}

        <FormGroupe className='grid'>
          <button className='secondary' onClick={() => navigate(-1)}>
            Back
          </button>
          {editable ? <button type='submit'>Save</button> : null}
        </FormGroupe>
      </form>
    </>
  );
}
