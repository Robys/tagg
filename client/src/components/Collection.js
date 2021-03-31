import React from 'react'
import GameThumbnail from './GameThumbnail'
import ScrollArea from '@xico2k/react-scroll-area';
import { FindCollection } from '../utils/utils'

export default function Collection(props){
    const array = FindCollection(props.user)

    return(
        <div data-testid="ndata" className="collection" style={{height:"548px"}}>
            <h3>Coleção</h3>
            <ScrollArea height="100%">

            {array.length > 0 ? array.map(res => <GameThumbnail key={res} games={res}/> ): ""}
            </ScrollArea>
            


        </div>
    )
}