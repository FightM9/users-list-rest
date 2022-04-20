import styled from "styled-components";

export const ProfileHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;

  & .title {
    margin: 0;
  }

  & .switch {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
  }
`;

export const FormGroupe = styled.fieldset`
  margin-top: 2rem;

  & legend > * {
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  &:focus:invalid {
    border: 1px solid red;
    outline: none;
  }
`;
