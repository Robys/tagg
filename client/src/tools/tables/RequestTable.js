import {useState,createRef} from 'react'
import {Table,Button} from 'react-bootstrap'
import {FindUser,FindGame} from '../../utils/utils'
import Paginate from '../../components/Paginate'
import ReactToPdf from 'react-to-pdf'

export default function RequestsTable(props){

    const info = props.list.map(itens => {
        const required = FindGame(itens.required)
        const selected = FindGame(itens.selected)
        const owner = FindUser(required.owner)
        const user = FindUser(selected.owner)

        return [itens,required,selected,owner,user]
    })

    const ref = createRef()
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const indexOfLastPage = currentPage*postPerPage;
    const indexOfFirstPage = currentPage-postPerPage;

    const list = info.slice(indexOfFirstPage,indexOfLastPage)

    const size = Object.values(props.list).map(itens => {
        return Object.keys(itens).length
    })

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(<div>

            <Table striped bordered hover ref={ref}>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Dono</th>
                        <th>Solicitante</th>
                        <th>Requisitado</th>
                        <th>Selecionado</th>
                        <th>Criação</th>
                        <th>Andamento</th>
                        </tr>
                    </thead>
                    <tbody>

                {list.map( ([item,required,selected,owner,user]) => 
                <tr key={item.id}>
                    <th>{item.id}</th>
                    <th>
                        {owner? <a href={`/profile/${owner.id}`}> {owner.firstName} {owner.lastName} </a>: "não encontrado" }
                    </th>
                    <th>
                    {user? <a href={`/profile/${user.id}`}> {user.firstName} {user.lastName} </a>: "não encontrado" }
                    </th>
                    <th>
                        <a href={`/details/${required.id}`}>
                        {required.title} {required.platform}
                        </a>
                    </th>
                    <th>
                        <a href={`/details/${selected.id}`}>
                        {selected.title} {selected.platform}
                        </a>
                    </th>
                    <th>{item.createdAt}</th>
                    <th>{item.accepted? "aceita" : "negada/pendente"}</th>




                </tr>)

                }
                </tbody>


            </Table>

            <ReactToPdf targetRef={ref} filename="tabela-usuarios.pdf" x={.5} y={.5}>
                    {({toPdf}) => (
                    <Button onClick={toPdf}>Gerar pdf</Button>
                    )}
                </ReactToPdf>

            {size>10
                ?<Paginate postPerPage={postPerPage} totalPosts={size} paginate={paginate}/>
                : ""}

                
        </div>
        
    )
}