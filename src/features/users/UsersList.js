import React from 'react';
import User from './User';
import { useGetUsersQuery } from './usersApiSlice';

const UsersList = () => {


  const {
    data:users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content
  
  if(isLoading) content = <p>Loading....</p>
  if(isError){
    content=<p className={isError ? "errmsg": "offscreen"}>{error?.data?.message}</p>
  }
  if(isSuccess){
    const {ids} = users
    const tableContent = ids?.length
    ? ids.map(userId=><User key={userId} userId={userId} />)
    : null

    content =(
      <table className='table table--users'>
        <thead className='table_thead'>
          <tr>
            <th scope='col' className='table__th user__username'>
                Username
            </th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default UsersList
