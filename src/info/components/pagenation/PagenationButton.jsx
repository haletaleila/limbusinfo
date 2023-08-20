import React from "react";
import {
  PaginationButton,
  ActivePaginationButton,
} from "../../Identity/IdentityInfoStyle"; // 필요한 스타일 컴포넌트를 임포트합니다.

export const PaginationButtons = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  let startPage, endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <PaginationButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        처음으로
      </PaginationButton>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </PaginationButton>
      {pageNumbers.map((number) =>
        currentPage === number ? (
          <ActivePaginationButton key={number}>{number}</ActivePaginationButton>
        ) : (
          <PaginationButton key={number} onClick={() => onPageChange(number)}>
            {number}
          </PaginationButton>
        )
      )}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </PaginationButton>
      <PaginationButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        마지막으로
      </PaginationButton>
    </div>
  );
};
