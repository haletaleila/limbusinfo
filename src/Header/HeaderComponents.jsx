import React from "react";
import { HeaderUl, HeaderLi, HeaderLink } from "./HeaderStyle";

function HeaderComponents() {
  return (
    <>
      <HeaderUl>
        <HeaderLi>
          <HeaderLink to={`/limbusinfo/identity`}>수감자 도감</HeaderLink>
        </HeaderLi>
        <HeaderLi>
          <HeaderLink to={`/limbusinfo/ego`}>E.G.O 도감</HeaderLink>
        </HeaderLi>
        <HeaderLi>
          <HeaderLink to={`/limbusinfo/tier`}>인격 티어표</HeaderLink>
        </HeaderLi>
      </HeaderUl>
    </>
  );
}

export default HeaderComponents;
