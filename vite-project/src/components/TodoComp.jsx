import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function TodoComp() {

    const [inpToDo, setInpToDo] = useState('')
    const [todos, setToDos] = useState(JSON.parse(localStorage.getItem('todos'))?? [])
    // const alltodo = JSON.parse(localStorage.getItem('todos')) ?? []
    const [isEditing, setIsEditing] = useState(false)
    // const [todosAll , setToDosAll] = useState([])

    useEffect(() => {
        const localTodo = localStorage.getItem('todos')
        if (localTodo) {
            setToDos(JSON.parse(localTodo))
        } else {
            localStorage.setItem('todos', JSON.stringify([]))
        }

    }, [])



    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addHandler = () => {

        let num = 0
        if (inpToDo == '' || inpToDo == null) {
            alert('Please enter a task')
        } else {
            num++
            const newTodo = [...todos, { name: inpToDo, isDone: false }];

            console.log(newTodo);
            setToDos([...todos, { id: Math.random(), name: inpToDo, isDone: false }])
            setInpToDo('')

        }


    }
    console.log(todos);

    //delete

    const deletHandler = (numId) => {
        console.log(numId);
        setToDos(todos.filter((todo) => todo.id !== numId));
    }

    const doneHandler = (val) => {
        console.log(val);

        setToDos(todos.map(todo =>
            todo.id === val.id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    }








    return (
        <div>
            <h1>Todo List</h1>

            <input type="text" value={inpToDo} onChange={(e) => setInpToDo(e.target.value)} placeholder='todo' />
            <button onClick={() => addHandler()}>add todo</button>

            {
                todos?.map((val, index) => {
                    return (
                        <>
                            <hr />
                            <input  type="text"  id='inp' className={`${val.isDone == false ? 'opac1' : 'opac2'}`}  value={isEditing== false ? val.name : newInp}  onChange={(e)=>setNewInp(e.target.value)} />
                            <button onClick={() => deletHandler(val.id)}>delete</button>
                            <button onClick={() => doneHandler(val)}>done</button>
                        
                        </>

                    )

                })

            }

        </div>
    )
}
