import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Books from './pages/Books';
import NewBook from './pages/Books/NewBook';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Login/>}/>
                <Route path='/books' element={<Books/>}/>
                <Route path='/books/new' element={<NewBook/>}/>
                <Route path='/books/:bookId' element={<NewBook/>}/>
            </Routes>            
        </BrowserRouter>
    );
}