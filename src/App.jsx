import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import { Header, Footer, Welcome } from "./core";
import "./core/global.scss";
import "./core/layout.scss";
import { PublishersList } from "./features/publishers";
import { BooksList, BooksForm } from "./features/books";
import AuthorsList from "./features/authors/components/AuthorsList";
import { useAuth} from "./context/AuthContext";
import RegisterForm from "./features/auth/components/RegisterForm";
import SignIn from "./features/auth/components/SignIn";
import GoogleCallback from "./features/auth/components/GoogleCallback";

export default function App() {
  const { isAuthenticated, role } = useAuth();

  return (
      <>
        <Router>
          <div className="app-container">
            <Header />
            <Routes>
              <Route path="" element={<Welcome />} />
              <Route path="publishers" element={<PublishersList />} />
              <Route path="books" element={<BooksList />} />
              <Route path="authors" element={<AuthorsList />} />

              {isAuthenticated && (
                    <Route path="books/add" element={<BooksForm />} />
              )}

              {isAuthenticated && (role === "Editor") && (
              <Route path="books/:id" element={<BooksForm />} />
              )}

              <Route path="/signin" element={isAuthenticated ? <Navigate replace to="/" /> : <SignIn />}/>
              <Route path="/register" element={isAuthenticated ? <Navigate replace to="/" /> : <RegisterForm />} />
              <Route path="/google-callback" element={<GoogleCallback />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </>

  );
}
