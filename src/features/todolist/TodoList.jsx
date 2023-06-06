import React, { useState } from 'react';
import styled from 'styled-components';

const TodoListWrapper = styled.div`
    padding: 15px;
    background-color: #efefef; 
    color: #000000;
    height: 100vh
`;

const TodoListHeading = styled.h1`
    color: #ff0000;
    margin: 0px 0px 15px 0px;
    font-size: 20px
`;

const TodoInput = styled.input`
    padding: 5px 15px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #eee;
    width: 100%;
    margin-bottom: 20px;
`;

const TodoListItems = styled.div`
    background-color: #ffffff;
    padding: 5px 15px;
`;

const ListItem = styled.div` 
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DeleteButton = styled.button` 
    background-color: #ff0000;
    color: #ffffff;
    border: none;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

const DoneButton = styled.button` 
    background-color: #00ff00;
    color: #000000;
    border: none;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    cursor: pointer;
`;


// Listing Component
const ListingRenderer = ({ items, onDelete, onDone }) => {
    return <TodoListItems>
        {items && items.map((item, index) => {
            return <ListItem key={`item_${index}`}>
                {item.done ?
                    <del>{item.title}</del>
                    :
                    <span>{item.title}</span>
                }
                <span>
                    <DoneButton onClick={() => onDone && onDone(item.id)}>{item.done ? "☑" : "☐"}</DoneButton>
                    <DeleteButton onClick={() => onDelete && onDelete(item.id)}>&times;</DeleteButton>
                </span>
            </ListItem>
        })}
    </TodoListItems>
}

// Input Component
const ListInputRenderer = () => {
    return <>
        <TodoInput 
        
        />
    </>
}

// Input Component
const HeadingRenderer = ({ title, count }) => {
    return <TodoListHeading>
        {title} <span>({count})</span>
    </TodoListHeading>
}

// Main Wrapper Component

const dummyItems = [{
    id: 1,
    title: "Item 1",
    done: true,
},
{
    id: 2,
    title: "Item 2",
    done: false,
}]




const TodoList = () => {

let [add,setAdd] = useState(dummyItems); 
let [newWork,setNewWork] = useState('');  

let addItemm = () => {
    if (newWork.trim() !== '') {
        let newItem = {
            id : Date.now(),
            title : newWork,
            done : false,
        };

        setAdd([...add,newItem]);
        setNewWork('');
    }

}

let handleDeleteWork = (itemid) => {
    let  updateWork = add.filter((items) => items.id !== itemid);
    setAdd(updateWork);
};

let handleDoneWork = (itemid) => {
    let updateWork = add.map((items) => {
        if (items.id === itemid) {
            return {
                ...items,
                done : !items.done
            }
        }
        return items
    });

    setAdd(updateWork);
}


    return (
        <TodoListWrapper>
            <HeadingRenderer title="My Todo List" count={add.length} />

            <TodoInput 
            value={newWork}
            onChange={(e) => setNewWork(e.target.value)}
            placeholder='add new items'/>
            <button onClick={addItemm}>add</button>
            <ListingRenderer items={add} 
            onDelete={handleDeleteWork}
            onDone={handleDoneWork}/>
        </TodoListWrapper>
    )
}

export default TodoList;