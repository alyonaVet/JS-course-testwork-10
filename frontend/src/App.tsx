import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import MainPage from './features/Pages/MainPage';
import AddPostPage from './features/AddPostPage/AddPostPage';
import OneNewsPage from './features/Pages/OneNewsPage';

const App = () => {

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new-post" element={<AddPostPage />} />
          <Route path="/news/:newsId" element={<OneNewsPage />} />

        </Routes>
      </main>
    </>
  );
};

export default App;
