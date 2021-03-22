import {Pagination} from 'react-bootstrap'

export default function Paginate({postPerPage,totalPosts,paginate}){

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pageNumber.push(i);
    }

    return(
        <Pagination className="paginate">
            <Pagination.First onClick={e => {
                e.preventDefault()
                paginate(pageNumber[0])
                } }  />
            {pageNumber.map(numbers => 
            <Pagination.Item key={numbers} onClick={e => {
                e.preventDefault()
                paginate(numbers)
                } }>
                {numbers}
                </Pagination.Item> 
            )}
            <Pagination.Last onClick={e => {
                e.preventDefault()
                paginate(pageNumber.length)
                } } />
        </Pagination>
        
    )
}

/***
 * 
 * <nav>
            <ul>
                {pageNumber.map(numbers => <li key={numbers} style={{display:"inline-block",margin:"2px"}}>
                    <Button onClick={e => {
                        e.preventDefault()
                        paginate(numbers)
                        } }> {numbers}</Button>
                </li>)
                }

            </ul>
        </nav>
 * 
 * 
 * 
 * 
 * 
 */