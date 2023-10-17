import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Profile() {
    const {account} = useContext(AppContext);
  return (
    <div>
        <img src={account.picture}></img>
        <p>{account.name}</p>
    </div>
  )
}

export default Profile