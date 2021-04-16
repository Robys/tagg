import {gql} from '@apollo/client'

export const NOTIFY_ADDED = gql` subscription OnNotifyAdded{
    notifyAdded{
      id
      from
      receiver
      content
    }
  }
`;

export const NEW_GAME_ADDED = gql ` subscription OnNewGameAdded{
  newGameAdded{
    id
    owner
    title
    platform
    publisher
    status
    value
    description
    location
    cover{
      filename
      path
    }

  }

}` 