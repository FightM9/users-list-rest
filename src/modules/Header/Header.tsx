import React from "react";
import { Link } from "react-router-dom";
import { Nav, PageHeader, ThemeSelect } from "./Header.style";

export default function Header() {
  const onChangeTheme = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    document.documentElement.setAttribute("data-theme", value);
  };

  return (
    <PageHeader>
      <Nav className='container'>
        <Link to='/'>
          <strong>Database user</strong>
        </Link>
        <ThemeSelect aria-label='Change color theme' onChange={onChangeTheme}>
          <option value='auto'>Auto</option>
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
        </ThemeSelect>
      </Nav>
    </PageHeader>
  );
}
