import {FindCurrent,FindRequests} from '../utils/utils'
import RequestMiniCard from '../components/RequestMiniCard'
import {Jumbotron} from 'react-bootstrap'
import TopBar from '../utils/TopBar'

export default function Requests (){
    const current = FindCurrent()

    const reqs = FindRequests(current.id)

    const getData = () => {
        
            if(reqs.length > 0){
            return reqs.map(itens => <RequestMiniCard info={itens} key={itens} /> )
    
            }

            else{
                return <Jumbotron>
                    <h2>Que pena, você ainda não possui nenhuma troca em andamento...</h2>
                    <p>mas não se preoculpe, retorne e comece agora! </p>
                </Jumbotron>
            }
    }
    

return(
    <div>
         <TopBar/>
        {getData()}

    </div>

)


}

/*
 if( (itens.madeBy) === current.id) {
                    
                }



*/