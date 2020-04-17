import React from 'react'

const List =({todos, loading}) => {
    
    let todoList = <div>loading...</div>
    if(!loading) todoList = todos.map( (todo) =>  <li key={todo.id}>{todo.title}</li>)
    
    return (
        <ul>
           {todoList}
        </ul>
    )
}
/* 저장되어 있는 리스트 목록을 map을 통해 하나씩 출력 해주는곳 */
export default List;