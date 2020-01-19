import React from "react";

const BaseLayout = props => {
  const { children, className } = props;
  console.log("props", props);

  return <div className="container mx-auto">{children}</div>;
};

export default BaseLayout;
