import styled from "styled-components";

export const PageHeader = styled.header`
  margin-bottom: 2rem;
  background: var(--card-background-color);
  box-shadow: var(--card-box-shadow);
`;

export const Nav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const ThemeSelect = styled.select`
  margin: 0;
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
  width: min-content;
  border: none;
  outline: none;
  background: var(--card-background-color);
`;
