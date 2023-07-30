import styled from "styled-components";

export const HeaderUl = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
`;

export const HeaderLi = styled.li`
  padding: 0.9375rem 1.25rem;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
`;
