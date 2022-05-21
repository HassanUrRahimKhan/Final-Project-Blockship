import React, { FC } from "react";
import "./index.css";

const index: FC = () => {
  return (
    <div>
      <div>
        <div
          className="snippet"
          data-title=".dot-flashing"
          style={{
            width: "40px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="stage">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
