import GameFeed from '../components/GameFeed'
import {Container,Row,Col} from 'react-bootstrap'
import TopBar from '../utils/TopBar'

export default function Dashboard(){

    return(
        <div>
        <TopBar/>

        <Container className="dashboard">
                <Row>
                <Col>
                    <GameFeed/>
                </Col>
                </Row>

        </Container>

        </div>

    )
}
