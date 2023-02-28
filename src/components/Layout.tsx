import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavBar from "./NavBar";
import {StateProp} from '../types/dataTypes'

type Props = {
    setState: (arg0:StateProp) => void;
    children?: JSX.Element | JSX.Element[];
};

const Layout = ({ setState, children }: Props) => {
    return (
        <div>
            <NavBar setState={setState} />
            <Container className="customContainer h-100">
                <Row className="align-items-center">
                    <Col className="mb-5">
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Layout