import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom"; // ReactDOM 추가
import {
  ButtonText,
  EgoBoxContainer,
  EgoSelectBox,
  FilterButton,
  HighlightText,
  InputKeyword,
  LoadingAni,
  LoadingText,
  RecommendationContainer,
  RecommendationDiv,
  ResetButton,
  SearchDiv,
  SearchDivDiv,
  SearchSpan,
  StyledButton,
} from "./SelectorStyle";
import { PaginationButtons } from "../components/pagenation/PagenationButton";
import ItemComponents from "../components/selector/ItemComponents";

export default function SelectorInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonData, setButtonData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const inputRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [autoSuggest, setAutoSuggest] = useState(false); // 추가한 상태 변수

  const portal = (
    <RecommendationContainer
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {recommendations.map((recommendation, index) => (
        <RecommendationDiv
          key={index}
          onClick={() => {
            setFilterTerm(recommendation);
            setRecommendations([]);
            setSearchTerm(recommendation);
          }}
        >
          {recommendation}
        </RecommendationDiv>
      ))}
    </RecommendationContainer>
  );

  // 위치를 계산하는 새로운 useEffect
  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [inputRef, searchTerm]);

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
    setSearchTerm(keyword);
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
    fetch(`${process.env.PUBLIC_URL}/json/Selector/Selector.json`)
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
          <SearchDiv>
            <SearchDivDiv></SearchDivDiv>
            <SearchDivDiv>
              <SearchSpan>키워드 검색 : </SearchSpan>
              <InputKeyword
                ref={inputRef} // ref 추가
                type="text"
                placeholder="키워드 입력"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {recommendations.length > 0 &&
                autoSuggest &&
                ReactDOM.createPortal(portal, document.body)}
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
