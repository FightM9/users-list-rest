import styled from "styled-components";

// Sort

export const Sort = styled.article`
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  gap: 1rem 2rem;
  padding: var(--block-spacing-horizontal) var(--block-spacing-horizontal);
`;

export const SortItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  & select {
    margin: 0;
    padding: 0.6rem 0;
    background: var(--card-background-color);
  }
`;

// List

export const List = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  padding: 0;

  & li {
    height: 100%;
    padding: 0;
    list-style: none;
  }
`;

export const User = styled.article`
  margin: 0;

  & header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--block-spacing-vertical) - 1rem);
  }

  & header > * {
    margin: 0;
  }
`;

export const Address = styled.address`
  margin-bottom: 0;
`;
