import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderUl = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
`;

export const HeaderLi = styled.li`
  padding: 10;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
`;

export const HeaderLink = styled(Link)`
  padding: 0.9375rem 1.25rem;
  display: block;
  user-select: none;
  &:hover {
    background-color: #e6e6e6;
  }
`;
