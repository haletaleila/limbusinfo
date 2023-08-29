import React from "react";
import { FooterContainer } from "./FooterStyle";

function FooterComponents() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <FooterContainer>
        <p>&copy; {currentYear} Loporina Softech. Developed by 하레타.</p>
      </FooterContainer>
    </>
  );
}

export default FooterComponents;
