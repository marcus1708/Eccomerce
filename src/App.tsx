import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import Carr from "./pages/Carr";
import WelcomePage from "./pages/WelcomePage";
import Listar_User from "./pages/Listar_User";
import CadLivros from "./pages/Cad_Livros";
import BookListPage from "./pages/Listar_Livros";
import ListarFilmes from "./pages/Listar_Filmes"; // Importação da página Listar_Filmes
import ProtectedRoute from "./components/ProtectedRoute";
import CadFilmes from "./pages/Cad_Filme";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/" element={<Login />} />

        {/* Rota de Cadastro de Usuário */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Rota protegida para a página de boas-vindas */}
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        />

        {/* Rota protegida para listar usuários */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Listar_User />
            </ProtectedRoute>
          }
        />

        {/* Rota protegida para cadastrar livros */}
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <CadLivros />
            </ProtectedRoute>
          }
        />
        {/* Rota protegida para cadastrar filmes */}
        <Route
          path="/add-movie"
          element={
            <ProtectedRoute>
              <CadFilmes />
            </ProtectedRoute>
          }
        />
        {/* Rota protegida para listar livros */}
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <BookListPage />
            </ProtectedRoute>
          }
        />

        {/* Rota protegida para listar filmes */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <ListarFilmes />
            </ProtectedRoute>
          }
        />

        {/* Rota protegida para o carrinho */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Carr />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;