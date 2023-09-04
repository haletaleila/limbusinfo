import React, { useEffect, useMemo, useState } from "react";
import {
  EgoBoxContainer,
  EgoSelectBox,
  HighlightText,
  InputKeyword,
  LoadingAni,
  LoadingText,
  ResetButton,
  SearchDiv,
  SearchDivDiv,
  SearchSpan,
  StyledButton,
  ButtonText,
  FilterButton,
  RecommendationDiv,
} from "./EgogiftStyle";
import { PaginationButtons } from "../components/pagenation/PagenationButton";
import ItemComponents from "../components/egogift/ItemComponents";

export default function EgogiftInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonData, setButtonData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      // 일부만 일치하는 추천어를 찾은 후, Set 객체를 이용해 중복을 제거합니다.
      const newRecommendations = Array.from(
        new Set(
          data
            .flatMap((egogift) => egogift.keyword)
            .filter((key) => key.includes(searchTerm))
        )
      );
      setRecommendations(newRecommendations);
    } else {
      setRecommendations([]);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const newSuggestions = Array.from(
        new Set(
          data
            .flatMap((egogift) => egogift.keyword)
            .filter((key) => key === searchTerm)
        )
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, data]);

  const handleKeywordClick = (keyword) => {
    setFilterTerm(keyword);
    setCurrentPage(1);
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade); // 상태 변수 업데이트
    setCurrentPage(1);
  };

  function highlightText(text, searchTerm) {
    const parts = text.split(new RegExp(`(${searchTerm})`, "i"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} style={HighlightText}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/Egogift/egokeyword.json`)
      .then((response) => response.json())
      .then((data) => setButtonData(data));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.PUBLIC_URL}/json/Egogift/egogift.json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.reverse());
        setIsLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((egogift) => {
      return (
        (selectedGrade === "" || egogift.rank === selectedGrade) &&
        (filterTerm === "" || egogift.keyword.includes(filterTerm))
      );
    });
  }, [data, selectedGrade, filterTerm]);

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedGrade(""); // 모든 필터 초기화
  };

  const handleButtonClick = (desc) => {
    setFilterTerm(desc);
    setSearchTerm(desc);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <>
          <LoadingAni></LoadingAni>
          <LoadingText>정보 불러오는 중...</LoadingText>
        </>
      ) : (
        <>
          <EgoSelectBox>
            {buttonData.map((button, index) => (
              <StyledButton
                key={index}
                isSelected={searchTerm === button.desc}
                onClick={() => handleButtonClick(button.desc)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/status/${button.img}`}
                  alt={button.title}
                />
                <ButtonText>{button.title}</ButtonText>
              </StyledButton>
            ))}
          </EgoSelectBox>
          <SearchDiv>
            <SearchDivDiv></SearchDivDiv>
            <SearchDivDiv>
              <SearchSpan>등급별 필터: </SearchSpan>
              {[1, 2, 3, 4, 5].map((grade) => (
                <FilterButton
                  key={grade}
                  isSelected={selectedGrade === grade}
                  onClick={() => handleGradeClick(grade)}
                >
                  {grade}
                </FilterButton>
              ))}
              <FilterButton
                isSelected={selectedGrade === ""}
                onClick={() => setSelectedGrade("")}
              >
                모두
              </FilterButton>
            </SearchDivDiv>
            <SearchDivDiv></SearchDivDiv>
          </SearchDiv>
          <SearchDiv>
            <SearchDivDiv></SearchDivDiv>
            <SearchDivDiv>
              <SearchSpan>키워드 검색 : </SearchSpan>
              <InputKeyword
                type="text"
                placeholder="키워드 입력"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {recommendations.map((recommendation, index) => (
                <RecommendationDiv
                  key={index}
                  onClick={() => {
                    setFilterTerm(recommendation);
                    setRecommendations([]);
                  }}
                >
                  {recommendation}
                </RecommendationDiv>
              ))}
              <ResetButton onClick={resetAllFilters}>초기화</ResetButton>
            </SearchDivDiv>
            <SearchDivDiv></SearchDivDiv>
          </SearchDiv>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageClick}
          />
          <EgoBoxContainer>
            {currentItems.map((item, index) => (
              <ItemComponents
                key={index}
                item={item}
                searchTerm={searchTerm}
                handleKeywordClick={handleKeywordClick}
                highlightText={highlightText}
              />
            ))}
          </EgoBoxContainer>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageClick}
          />
        </>
      )}
    </>
  );
}
