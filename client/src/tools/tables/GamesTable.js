import {createRef} from 'react'
import {Table,Button} from 'react-bootstrap'
//import Paginate from '../../components/Paginate'
import {ExportGamesPDF} from '../components/ExportPDF'

export default function GamesTable(props){
    const ref = createRef()
    
    return(<div>
        <Table striped bordered hover ref={ref}>
                <thead>
                        <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Plataforma</th>
                        <th>Local</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.list
                        ? props.list.games.map(res =>
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{res.title}</td>
                                <td>{res.platform}</td>
                                <td>{res.location}</td>
                                <td>{res.status}</td>
                            </tr>
                        )
                        :""}
                    </tbody>

        </Table>

        <Button onClick={e => {
                    e.preventDefault()
                    ExportGamesPDF(props.list.games)
        }}>Exportar PDF</Button>
            
                
        </div>
        
    )
}

/*<tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.title}</td>
                                <td>{game.platform}</td>
                                <td>{game.location}</td>
                                <td>{game.status}</td>
                            </tr> */