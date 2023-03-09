import * as React from "react";
import { Card, Button } from "react-bootstrap";
import { useAddToHomescreenPrompt } from "../hooks/useAddHome";

export function Prompt() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );

  if (!isVisible) {
    return <div />;
  }

  return (
    <Card onClick={hide} className={`prompt p-0 bg-dark ${isVisible && 'd-none'}`}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        ¿Quisieras agregar esta página como una APP?
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="outline-danger" onClick={hide}>Cerrar</Button>
        <Button variant="outline-success" onClick={promptToInstall}>Agregar a Inicio</Button>
      </Card.Footer>
    </Card>
  );
}