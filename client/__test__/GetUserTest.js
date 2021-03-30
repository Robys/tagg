import React from 'react'
import {gql} from '@apollo/client'
import {useQuery} from '@apollo/react-hooks'

export const GET_USER = gql` query GetUser($_id:ID){
    user(_id:$_id){
        id
        firstName
        roles
    }

}`

export function GetUserTest (props){
    const {data,loading,error} = useQuery(GET_USER,{variables:{_id:props.id}})
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <p data-testid="username">
          {data.user.firstName} is a {data.user.roles}
        </p>
      );
}