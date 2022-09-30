import React, { useState } from "react";
import styels from "./index.less";

export default function Tooltip ({ children, text, ...rest }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styels.tooltipWrap}>
      <div
        className={styels.tooltip}
        style={show ? { visibility: "visible" } : {}}
      >
        {text}
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
