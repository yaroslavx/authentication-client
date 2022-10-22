import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from ".";
import LoginForm from "./components/LoginForm";
import { observer } from 'mobx-react-lite'
import { User } from "./models/User";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  const handleLogout = () => {
    store.logout()
  }

  const handleGetAllUsers = async () => {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }

  }
  if (!store.isAuth) {
    return (
      <div className="App">
        <h1>No authorization</h1>
        <LoginForm />
      </div >

    );
  }

  return (
    <>
      <h1>User {store.user.email} authorized</h1>
      <h2>{store.user.isActivated ? "Your account is activated" : " Activate your account"}</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <button onClick={handleGetAllUsers}>Get All Users</button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </>
  )

}

export default observer(App);
