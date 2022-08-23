import React, {useState, useEffect} from 'react';
import useFetch from 'use-http';
import { Link } from 'react-router-dom';


type SetProp ={
    id:number | undefined
}
interface Details {
    original_title :string,
    poster_path: string,
    overview: string,
    vote_average: number,
    release_date: string,
    runtime:number
}
export default function Details ({id}:SetProp) {

    const [details, setDetails] = useState<Details>()

    const KEY = '9d18350631eeadf29995e4a5bca1d96e'

    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-U`

    const {loading, get,error} = useFetch(URL)

    async function getMovieDetails() {
        
        try {
            const results = await get ();
            setDetails(results)
            
        } catch (err) {
            console.log(error)
        }

    }


    useEffect (() => {
        if (id) {
            getMovieDetails()
            
        }

    }, [])
    if (loading) {
        return <p>Loading ...</p>
    }
    return(
        <div className='movie-detail'>
            <div className='movie-header'>
                <div className='wrapper'>
                    <Link to="/" className='link'>
                        <span className='icon-header'> <i className="fas fa-arrow-left"></i></span>

                    </Link>
                    <h1>Movie details</h1>
                </div>
              
                <div className='dots'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
                 
            </div>

            <div className='header'> <h3> {details?.original_title} </h3> </div>

            <div className='detail-wrapper'>
                <div className='detail'>

                    <div className='img'>
                        <img src={`https://image.tmdb.org/t/p/w185/${details?.poster_path}`}/>
                    </div>

                    <div className='content-detail'>
                        <div className='time-wrapper'>
                            <p className='date'>{details?.release_date.substring(0, 4)}</p>
                            <p className='runtime'>{details?.runtime} mins</p>
                        </div>

                        <div className='wrapper'>
                            <p><span id='vote'>{details?.vote_average.toFixed(1)}</span>/10</p>
                            <div className='favorite'> Add to Favorite</div>
                        </div>
                    </div>
                </div>

                <p className='plot'>{details?.overview}</p>

                <div className='trailers'>
                    <h2>TRAILERS</h2>
                    <hr />
                    <div className='trailer1'>
                        <span className='icon'></span><p>Play trailer 1</p>
                    </div>
                    <div className='trailer2'>
                        <span className='icon'></span><p>Play trailer 2</p>
                    </div>

                </div>
            </div>
            


        </div>
    )
}
