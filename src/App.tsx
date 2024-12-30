import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import { Container } from "react-bootstrap";
import List from "./components/List.tsx";
import Form from "./components/Form.tsx";
import View from "./components/View.tsx";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route index element={<List />} />
          <Route path="add" element={<Form />} />
          <Route path="edit/:id" element={<Form />} />
          <Route path="view/:id" element={<View />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
