import React, { useEffect, useState } from "react";
import "../books.scss";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../services/booksService";
import { useForm } from "react-hook-form";
import { getAllAuthors } from "../../authors/services/authorsService";
import { getPublishers } from "../../publishers/services/publishersService";

export default function BooksForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { register, handleSubmit, formState, reset } = useForm();
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) return;

    async function loadBook() {
      try {
        const book = await getBookById(id);

        reset({
          id: book.id,
          title: book.title,
          pageCount: book.pageCount,
          publishedDate: book.publishedDate?.split("T")[0],
          authorId: book.authorId,
          publisherId: book.publisherId,
          isbn: book.isbn,
        });
      } catch (err) {
        setError("Failed to load book.");
      }
    }

    loadBook();
  }, [id, isEditMode, reset]);

  async function handleCreate(formData) {
    try {
      let bookPayload;
      if (isEditMode) {
        const existingBook = await getBookById(id);

        bookPayload = {
          ...existingBook,
          ...formData,
          publishedDate: new Date(formData.publishedDate).toISOString(),
          isbn: formData.isbn || existingBook.isbn,
          author: existingBook.author,
          publisher: existingBook.publisher,
        };

        await updateBook(id, bookPayload);
      } else {
        bookPayload = {
          ...formData,
          publishedDate: new Date(formData.publishedDate).toISOString(),
          isbn: formData.isbn || "000-0000000000",
        };
        await createBook(bookPayload);
      }

      navigate("/books");
    } catch (error) {
      setError("Failed to save book.");
    }
  }

  async function loadAuthors() {
    try {
      const response = await getAllAuthors();
      setAuthors(response);
    } catch (error) {
      setError("Failed to load authors");
    }
  }

  async function loadPublishers() {
    try {
      const response = await getPublishers();
      setPublishers(response);
    } catch (error) {
      setError("Failed to load publishers");
    }
  }

  useEffect(() => {
    loadAuthors();
    loadPublishers();
  }, []);

  return (
    <div className="book-page">
      <div className="book-hero">
        <h1>{isEditMode ? "Edit Book" : "Add Book"}</h1>
      </div>
      <div className="book-form">
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className="input-field">
            <label>Title</label>
            <input {...register("title", { required: "Title is required" })} />
            {formState.errors.title && (
              <p className="error-message">{formState.errors.title.message}</p>
            )}
          </div>

          <div className="input-field">
            <label>Pages</label>
            <input
              type="number"
              {...register("pageCount", {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Page count needs to be greater then 0",
                },
              })}
            />
            {formState.errors.pageCount && (
              <p className="error-message">
                {formState.errors.pageCount.message}
              </p>
            )}
          </div>

          <div className="input-field">
            <label>ISBN</label>
            <input {...register("isbn", { required: "ISBN is required" })} />
            {formState.errors.isbn && (
              <p className="error-message">{formState.errors.isbn.message}</p>
            )}
          </div>

          <div className="input-field">
            <label>Author</label>
            <select
              {...register("authorId", {
                required: "Author is required",
                valueAsNumber: true,
              })}
            >
              <option value="">Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.fullName}
                </option>
              ))}
            </select>
            {formState.errors.authorId && (
              <p className="error-message">
                {formState.errors.authorId.message}
              </p>
            )}
          </div>

          <div className="input-field">
            <label>Publisher</label>
            <select
              {...register("publisherId", {
                required: "Publisher is required",
                valueAsNumber: true,
              })}
            >
              <option value="">Select publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
            {formState.errors.publisherId && (
              <p className="error-message">
                {formState.errors.publisherId.message}
              </p>
            )}
          </div>

          <div className="input-field">
            <label>Publishing Date</label>
            <input
              type="date"
              {...register("publishedDate", { required: "Date is required" })}
            />
            {formState.errors.publishedDate && (
              <p className="error-message">
                {formState.errors.publishedDate.message}
              </p>
            )}
          </div>

          <div className="btnSbmt">
            <button type="submit">
              {isEditMode ? "Update Book" : "Create Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
