import React, { useState } from "react";
import {
  HeaderUl,
  HeaderLi,
  HeaderLink,
  Dropdown,
  DropdownLink,
} from "./HeaderStyle";

function HeaderComponents() {
  const [showDropdown, setShowDropdown] = useState({
    ego: false,
    garden: false,
  });
  const [isClicked, setIsClicked] = useState({ ego: false, garden: false });

  const toggleDropdown = (type) => {
    setShowDropdown({ ...showDropdown, [type]: !showDropdown[type] });
    setIsClicked({ ...isClicked, [type]: true });
  };

  return (
    <>
      <HeaderUl>
        <HeaderLi
          onMouseEnter={() =>
            !isClicked.ego && setShowDropdown({ ...showDropdown, ego: true })
          }
          onMouseLeave={() => setShowDropdown({ ...showDropdown, ego: false })}
        >
          <HeaderLink to="#" onClick={() => toggleDropdown("ego")}>
            인격/에고 도감
          </HeaderLink>
          {showDropdown.ego && (
            <Dropdown>
              <DropdownLink to={`/identity`}>수감자 도감</DropdownLink>
              <DropdownLink to={`/ego`}>E.G.O 도감</DropdownLink>
              {/* <DropdownLink to={`/egogift`}>에고기프트</DropdownLink> */}
            </Dropdown>
          )}
        </HeaderLi>
        {/* <HeaderLi
          onMouseEnter={() =>
            !isClicked.garden &&
            setShowDropdown({ ...showDropdown, garden: true })
          }
          onMouseLeave={() =>
            setShowDropdown({ ...showDropdown, garden: false })
          }
        >
          <HeaderLink to="#" onClick={() => toggleDropdown("garden")}>
            거던 관련
          </HeaderLink>
          {showDropdown.garden && (
            <Dropdown>
              <DropdownLink to={`/selector`}>선택지</DropdownLink>
              <DropdownLink to={`/build`}>빌드 조합기</DropdownLink>
              <DropdownLink to={`/abnormality`}>환상체 정보</DropdownLink>
            </Dropdown>
          )}
        </HeaderLi> */}
        <HeaderLi>
          <HeaderLink to={`/news`}>업데이트 확인</HeaderLink>
        </HeaderLi>
      </HeaderUl>
    </>
  );
}

export default HeaderComponents;
