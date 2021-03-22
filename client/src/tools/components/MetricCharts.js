import UsersPerDate from '../charts/usersPerDate'
import GamesPerPlatfrom from '../charts/gamesPerPlatform'
import UserPerLocation from '../charts/usersPerLocation'
import {Tab,Col,Row,Nav} from 'react-bootstrap'

export default function MetricCharts (){

    return (
    <div>
        <div style={{margin:"20px"}}>
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
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>

        </div>

    </div>
    );
    
}
