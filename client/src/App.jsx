import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImage from './pages/GenerateImage'
import Removebackground from './pages/Removebackground'
import RemoveObject from './pages/RemoveObject'
import Review from './pages/Review'
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/ai" element={<Layout />}>

        <Route index element={<Dashboard />} />

        <Route
          path="write-article"
          element={<WriteArticle />}
        />

        <Route
          path="blog-titles"
          element={<BlogTitles />}
        />

        

        <Route
          path="generate-images"
          element={<GenerateImage />}
        />

        <Route
          path="remove-background"
          element={<Removebackground />}
        />

        <Route
          path="remove-object"
          element={<RemoveObject />}
        />

        <Route
          path="review"
          element={<Review />}
        />

      </Route>

    </Routes>
    </>
  )
}

export default App
