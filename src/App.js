import React, { useState, useEffect} from 'react';
import './App.css';
import List from './List.jsx';
import List2 from './List2.jsx';
//import userFetch from '/userFetch.js';
import Header from './Header.jsx';

 const useFetch = (callback,url) => {

   const [loading, setLoading] = useState(false);

   const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetch(url);
     const initialData = await response.json();
     callback(initialData);
     setLoading(false);
   }
   /*2.그 데이터를 받아 온다 settodos에 이니셜데이터에 넣어준다   */

   useEffect ( () => {
     fetchInitialData();
  }, [])

  return loading;
/* 랜더링후에 fetchInitialdata가 돈다 */
 }

 const App = () => {
   const [todos, setTodos] = useState([]);
   const [newTodo, setNewTodo] = useState();
  
   const loading = useFetch(setTodos,'http://localhost:8000/todo');
/*1.useFetch를 통해 패치 요청을 하고 */
   const changeInputData = (e) => {
      setNewTodo(e.target.value);
  }
   /*setNewtodo를 통해 value로 사용자가 적은 텍스트 데이터를 받습니다 */
   const addTodo = (e) => {
     e.preventDefault();
     setTodos([...todos, {'title': newTodo,'id' : todos.length, 'status' : 'todo'}]);
   }
  /*받은 데이터를 setTodos를 통해 실제 todos에 저장 */

  
   useEffect( () => {
     console.log("새로운 내용이 렌더링됐네요",todos);
   }, [todos])


   return (
     <>  
     <Header todos={todos} />

     <form action="">
        <input type="text" name="" onChange={changeInputData}/>
        <button onClick={addTodo}>할일추가</button>
     </form>

     <List  todos={todos} loading={loading}/>
     </>
     /*input에 onChange를 통해 사용자가 입력하는 값을 받고
     버튼의 onClick을 통해 데이터를 추가 하는 방식 */

    
   );
 };



export default App;

