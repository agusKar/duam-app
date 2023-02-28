import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
    children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Layout