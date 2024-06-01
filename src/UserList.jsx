import { fetchDataSucess, showError} from './Redux/Action'
import { useState, useEffect } from 'react'
import axios from "axios"
import reducer from './Redux/Reducer'
import {applyMiddleware, createStore} from 'redux'
import {thunk} from "redux-thunk"


const store = createStore(reducer, applyMiddleware(thunk))

function fetchUsers(){
    return  () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response =>{
            store.dispatch(fetchDataSucess(response.data))
        })
        .catch((error)=>{
            store.dispatch(showError(error.message));
    });
    };
}


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Function to handle store updates
    const handleStoreUpdate = () => {
        const state = store.getState();
        setUsers(state.data);
        setError(state.error);
    };

    useEffect(() => {
        const unsubscribe = store.subscribe(handleStoreUpdate);
        handleStoreUpdate();
        return () => {
            unsubscribe();
        };
    }, []);

    const handleFetchUsers = () => {
        store.dispatch(fetchUsers());
    };

    return (
        <div>
            <button onClick={handleFetchUsers}>Fetch Data</button>
            {error && <p>{error}</p>}
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <hr />
                    </div>
                ))}
                {users.length > 0 && (
                    <button onClick={() => setUsers([])}>Close</button>
                )}
            </div>
        </div>
    );
};

export default UserList;