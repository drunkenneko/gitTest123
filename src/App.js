import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";
// import PropTypes from 'prop-types';

// const foodILike = [
//   {
//     id:1,
//     name: "Kimchi",
//     image:
//       "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
//       rating : 5
//   },
//   {
//     id:2,
//     name: "Samgyeopsal",
//     image:
//       "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
//       rating : 4.9
//   },
//   {
//     id:3,
//     name: "Bibimbap",
//     image:
//       "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
//       rating : 4.8
//   },
//   {
//     id:4,
//     name: "Doncasu",
//     image:
//       "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
//       rating : 4.3
//   },
//   {
//     id:5,
//     name: "Kimbap",
//     image:
//       "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
//       rating : 4.7
//   }
// ];

// function Food({ name, picture, rating }){
//   return ( <div>
//     <h2>I like {name}</h2>
//     <h4>{rating}/5.0</h4>
//     <img src={picture} alt={name} />
//   </div>
//   );
//   }

//   Food.propTypes = {
//     name: PropTypes.string.isRequired,
//     picture: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired
//   };

// function App() {
//   return (
//     <div>
//       {foodILike.map(dish => (
//         <Food key={dish.id} 
//         name={dish.name} 
//         picture={dish.image}
//         rating={dish.rating} />
//       ))}
//     </div>
//   );
// }

// class App extends React.Component {
//   state = {
//     count:0
//   };
//   add = () => {
//    this.setState(current => ({count: current.count +1}));
//   };
//   minus = () => {
//     this.setState(current => ({count: current.count -1}));
//   };
  
//  render(){
//  return (
//   <div>
//    <h1>The Number is: {this.state.count}</h1>
//    <button onClick={this.add}>Add</button>
//    <button onClick={this.minus}>Minus</button>
//    </div>
//  );
//  }
// }

const App = () => {
  const [isLoading,setIsLoading] = useState([]);
  const [movies,setMovies] = useState([]);

  /* useState를 통해 state를 사용 */

  const getMovies = async () => {
         const {data: { data : {movies}}}=await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
         setMovies({movies});
         setIsLoading(false);  
       }
/* setMovies 함수를 작동하여 받아온 movies 데이터를 저장한다 */

   useEffect( () => {
    getMovies();
  },[]);

  /*2.그후 useEffect의 getMovies 함수가 작동되어 데이터를 요청하고*/

  return (
    <>
    <section className="container">
     {isLoading ? (
     <div className="loader">
       <span className="loader__text">Loading...</span>
     </div> 
     ) : ( 
       <div className="movies">
         {movies.movies.map(movie => (
      <Movie 
       key={movie.id}
       id={movie.id} 
       year={movie.year} 
       title={movie.title}
       summary={movie.summary} 
       poster={movie.medium_cover_image}
       genres={movie.genres}
       />
       ))}
       </div>
     )}
    </section>
  </>
  );
};
/*1.처음 랜더링은 isLoading이 참이라 로딩중이란 화면이 뜨고

3.isLoading이 false로 바뀌어 받아온 Movie의 데이터를 송출하게 됩니다. */


// class App extends React.Component {
//   state = {
//     isLoading: true,
//     movies: []
//   };
//   getMovies = async () => {
//     const{data: { data : {movies}}}=await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
//     this.setState({movies,isLoading: false})
//   }
//   componentDidMount(){
//    this.getMovies();
//   }
//   render() {
//     const { isLoading,movies } = this.state;
//     return (
//     <section className="container">
//      {isLoading ? (
//      <div className="loader">
//        <span className="loader__text">Loading...</span>
//      </div> 
//      ) : ( 
//        <div className="movies">
//          {movies.map(movie => (
//       <Movie 
//        key={movie.id}
//        id={movie.id} 
//        year={movie.year} 
//        title={movie.title}
//        summary={movie.summary} 
//        poster={movie.medium_cover_image}
//        genres={movie.genres}
//        />
//        ))}
//        </div>
//      )}
//     </section>
//     );
//   }
// }

export default App;
