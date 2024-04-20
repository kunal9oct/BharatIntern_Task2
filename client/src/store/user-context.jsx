import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext({
  user: {},
  postData: {},
  addUser: () => {},
  updateUser: () => {},
  addPostData: () => {}
});

function userReducer(state, action) {
  if (action.type === "ADD_USER") {
    return { ...state, user: action.payload}
  }

  if (action.type === "UPDATE_USER") {
    return { ...state, user: action.payload}
  }

  return state;
}

function postReducer(state, action) {
  if (action.type === "ADD_POST") {
    return { ...state, postData: action.payload}
  }

  return state;
}

export default function UserContextProvider({ children }) {
    const initialUser = {
        id: null,
        name: null,
        username: null,
        email: null,
        avatarImgURL: null,
        profileImgURL: null,
        accountType: null
    }

    const initialPost = {
        userId: null,
        name: null,
        avatarImgURL: null,
        profileImgURL: null,
        location: null,
        rteText: null,
        title: null,
        image: null,
        createdAt: null,
        _id: null,
    }

    const [userState, userDispatch] = useReducer(userReducer, {user: initialUser});

    const [postState, postDispatch] = useReducer(postReducer, {postData: initialPost});

    function handleAddUser(user) {
        userDispatch({
            type: 'ADD_USER',
            payload: user
        })
    }

    function handleUpdateUser(user) {
        userDispatch({
            type: 'UPDATE_USER',
            payload: user
        })
    }

    function handleAddPostData(postData) {
        postDispatch({
            type: 'ADD_POST',
            payload: postData
        })
    }

    const ctxValue = {
        user: userState.user,
        postData: postState.postData,
        addUser: handleAddUser,
        updateUser: handleUpdateUser,
        addPostData: handleAddPostData
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) {
            handleAddUser(user);
        }

        const postData = JSON.parse(localStorage.getItem("postData"));
        if(postData) {
            handleAddPostData(postData);
        }
    }, [])

    return (
        <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
    )
}
