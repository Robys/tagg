import UsersPerDate from '../charts/usersPerDate'
import UserPerLocation from '../charts/usersPerLocation'
import GamesPerPlatfrom from '../charts/gamesPerPlatform'
import GamesPerValue from '../charts/gamesPerValue'
import RequestsPerDate from '../charts/RequestsPerDate'
import {Tab,Col,Row,Nav} from 'react-bootstrap'

export default function MetricCharts (){

    return (
    <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Novos cadastros por dia</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Platformas mais usadas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Regiões com mais cadastros</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="forth">Jogos mais caros</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="fith">Pedidos de troca por dia</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <UsersPerDate/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <GamesPerPlatfrom />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <UserPerLocation/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="forth">
                    <GamesPerValue/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fith">
                    <RequestsPerDate/>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>

    </div>
    );
    
}
