import React, { useContext } from "react";
import Alert from "@material-ui/lab/Alert";

import AlertContext from "../../context/alert/AlertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert, index) => (
      <Alert key={alert.id} id={index} severity='error'>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
