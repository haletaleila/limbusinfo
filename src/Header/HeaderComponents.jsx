import React from "react";
import { HeaderUl, HeaderLi } from "./HeaderStyle";
import { Link } from "react-router-dom";

function HeaderComponents() {
  return (
    <>
      <HeaderUl>
        <HeaderLi>
          <Link to={`/limbusinfo/identity`}>수감자 도감</Link>
        </HeaderLi>
        <HeaderLi>
          <Link to={`/limbusinfo/ego`}>E.G.O 도감</Link>
        </HeaderLi>
        <HeaderLi>
          <Link to={`/limbusinfo/tier`}>인격 티어표</Link>
        </HeaderLi>
      </HeaderUl>
    </>
  );
}

export default HeaderComponents;
