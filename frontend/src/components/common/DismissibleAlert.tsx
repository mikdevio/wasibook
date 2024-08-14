import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";

interface DismissibleAlertProps {
  message: string;
}

const DismissibleAlert: React.FC<DismissibleAlertProps> = (
  props: DismissibleAlertProps
) => {
  const { message } = props;
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const onCloseClick = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <Alert variant="info" onClose={() => setShow(false)} dismissible>
          <div className="d-flex justify-content-between align-items-center">
            {message}
            <Button className="btn-close" onClick={onCloseClick}></Button>
          </div>
        </Alert>
      )}
    </>
  );
};

export default DismissibleAlert;
