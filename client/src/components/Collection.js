import GameThumbnail from './GameThumbnail'
import { FindCollection } from '../utils/utils'

export default function Collection(props){
    const array = FindCollection(props.user)

    return(
        <div className="profile-lib">
            <h3>Coleção</h3>
            {array.length > 0 ? array.map(res => <GameThumbnail key={res} games={res}/> ): ""}
            


        </div>
    )
}