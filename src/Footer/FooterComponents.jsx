import React from "react";
import { FooterContainer } from "./FooterStyle";

function FooterComponents() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <FooterContainer>
        <p>Copyright &copy; {currentYear} 하레타 All rights reserved.</p>
      </FooterContainer>
    </>
  );
}

export default FooterComponents;
