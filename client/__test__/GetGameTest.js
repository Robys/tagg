import React from 'react'
import {gql} from '@apollo/client'
import {useQuery} from '@apollo/react-hooks'

export const GET_GAME = gql` query GetGame($_id:ID){
  game(_id:$_id){
      id
      title
      description
      
  }
  
}`
export function GetGameTest (props){
    const {data,loading,error} = useQuery(GET_GAME,{variables:{_id:props.id}})
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <div>
          <h1>{data.game.title}</h1>
          <p> description:  {data.game.description}</p>


        </div>
      );
}