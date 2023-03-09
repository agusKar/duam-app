import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavBar from "./NavBar";
import {StateProp} from '../types/dataTypes'
import Footer from "./Footer";
import { Prompt } from "./Prompt";

type Props = {
    setState: (arg0:StateProp) => void;
    children?: JSX.Element | JSX.Element[];
};

const Layout = ({ setState, children }: Props) => {
    return (
        <div>
            <NavBar setState={setState} />
            <Container className="customContainer h-100">
                <Row>
            <Prompt />
                    <Col style={{"paddingBottom":"70px"}}>
                        {children}
                    </Col>
                </Row>
            </Container>
            <Footer setState={setState}  />
        </div>
    )
}

export default Layout