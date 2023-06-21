import { Routes, Route } from 'react-router-dom';
import AddArticleForm from './components/AddArticleForm/AddArticleForm';
import Article from './components/Article/Article';
import ArticleList from './components/ArticleList/ArticleList';
import { Navbar } from './components/Navbar/Navbar';
import OneArticle from './components/OneArticle/OneArticle';

function App() {
  return (
    <>
        
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ArticleList />}></Route>
        <Route path="/post/:id" element={<OneArticle />}></Route>
        <Route path="/posts/:id" element={<Article />}></Route>
        <Route path="/add-post" element={<AddArticleForm />}></Route>
        <Route path="/posts/:id/edit" element={<AddArticleForm />}></Route>
      </Routes>
    </div>
    </>
  );
}

export default App;
