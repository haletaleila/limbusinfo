import React from "react";
import { HeaderUl, HeaderLi } from "./HeaderStyle";
import { Link } from "react-router-dom";

function HeaderComponents() {
  return (
    <>
      <HeaderUl>
        <HeaderLi>
          <Link to={`/identity`}>수감자 도감</Link>
        </HeaderLi>
        <HeaderLi>E.G.O 도감</HeaderLi>
        <HeaderLi>인격 티어표</HeaderLi>
      </HeaderUl>
    </>
  );
}

export default HeaderComponents;
