import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useFetch from 'use-http';

interface Movie {
    id:number,
    poster_path:string
  }
type SetProp = {
    setId: React.Dispatch<React.SetStateAction<number | undefined>>;

}

export default function Movies ({setId}: SetProp) {
    const KEY = '9d18350631eeadf29995e4a5bca1d96e'
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`
    const {loading, get,error} = useFetch(URL)
    const [movies, setMovies] = useState<Movie[]>();
    
   async function getPopularMovies() {
    try {
      const {results} = await get();
      setMovies(results);
  
    } catch (err){
      console.log(error)
  
    }
   } 
  
   useEffect(() => {
    getPopularMovies()
   }, [])
   if (loading){
    return <p>Loading ...</p>
   }
    return (
        <>
            <div className='movie-header'>
                <h1>Pop Movies</h1>
                <div className='dots'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
                 
            </div>
            <div className='pop-movies'>
                {movies && movies.map((movie)=> <div className='movie' key={movie.id} >
                    <Link to='/details' onClick={() => setId(movie.id)} >
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
                    </Link>
                    </div>)}

            </div>
        </>

    )
}