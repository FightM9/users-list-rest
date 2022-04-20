import Layout from "layout/Layout";
import NotFoundPage from "pages/NotFoundPage";
import UserDetailPage from "pages/UserDetailPage";
import UserListPage from "pages/UserListPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<UserListPage />} />
        <Route path='user/:id' element={<UserDetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
