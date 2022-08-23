import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import Movies from './components/Movies';

interface Movie {
  id:number,
  backdrop_path:string
}

function App() {

  const [id, setId] = useState<number>();

  return (
    <BrowserRouter>
      <div className="App">
          <main>
            <Routes>
              <Route 
                path="/"
                element={<Movies setId={setId}/>}
              />
              <Route 
                path="/details"
                element={<Details id={id}/>}
              />
            </Routes>
          </main>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
