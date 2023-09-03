import React from "react";
import { FooterContainer } from "./FooterStyle";

function FooterComponents() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <FooterContainer>
        <p>Copyright &copy; {currentYear} 하레타 All rights reserved.</p>
        <p style={{ fontSize: "14px", color: "#888", marginLeft: "10px" }}>
          version 1.0.1
        </p>
      </FooterContainer>
    </>
  );
}

export default FooterComponents;
