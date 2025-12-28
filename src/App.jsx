import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, Welcome } from "./core";
import "./core/global.scss";
import "./core/layout.scss";
import { PublishersList } from "./features/publishers";
import { BooksList, BooksForm } from "./features/books";
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="" element={<Welcome />} />
          <Route path="publishers" element={<PublishersList />} />
          <Route path="books" element={<BooksList />} />
          <Route path="books/new" element={<BooksForm />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
