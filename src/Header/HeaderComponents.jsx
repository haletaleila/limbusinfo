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
          <HeaderLink to={`/limbusinfo/news`}>업데이트 확인</HeaderLink>
        </HeaderLi>
        {/* <HeaderLi>
          <HeaderLink to={`/limbusinfo/new`}>신규 인격/E.G.O</HeaderLink>
        </HeaderLi>
        <HeaderLi>
          <HeaderLink to={`/limbusinfo/my`}>동기화</HeaderLink>
        </HeaderLi> */}
      </HeaderUl>
    </>
  );
}

export default HeaderComponents;
