/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useMemo, useState, useRef } from "react"; // useRef 추가
import ReactDOM from "react-dom"; // ReactDOM 추가
import {
  IIDiv,
  IIdivImage,
  InputKeyword,
  SearchDiv,
  SearchDivDiv,
  SearchSpan,
  SdivTotal,
  ResetButton,
  LoadingAni,
  LoadingText,
  StyledButton,
  IdentitySelectBox,
  ButtonText,
  FilterButton,
  RecommendationDiv,
  RecommendationContainer,
} from "./IdentityInfoStyle";
import Identity from "./Identity";
import { PaginationButtons } from "../components/pagenation/PagenationButton";
import ItemComponents from "../components/Identity/ItemComponents";

import { unstable_batchedUpdates } from "react-dom";

export default function IdentityInfo() {
  const versionSync = "sync4";
  const rows = 2;
  const columns = 6;

  const [allIdentityData, setAllIdentityData] = useState([]);
  const [clickedIdentityData, setClickedIdentityData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncStates, setSyncStates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonData, setButtonData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      if (autoSuggest) {
        // 조건 추가
        const newRecommendations = Array.from(
          new Set(
            allIdentityData
              .flatMap((identity) => identity.keyword)
              .filter((key) => key.includes(searchTerm))
          )
        );
        setRecommendations(newRecommendations);
      }
    } else {
      setRecommendations([]);
    }
  }, [searchTerm, allIdentityData, autoSuggest]); // useEffect 의존성 배열에 autoSuggest 추가

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const newSuggestions = Array.from(
        new Set(
          allIdentityData
            .flatMap((identity) => identity.keyword)
            .filter((key) => key === searchTerm)
        )
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, allIdentityData]);

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setCurrentPage(1);
  };

  const filteredItems = (filterTerm ? clickedIdentityData : allIdentityData) // filterTerm 대신에 사용
    .filter((identity) => {
      return selectedGrade === "" || identity.rank === selectedGrade;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const calculateTotalPages = () => {
    let totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;
    return totalPages;
  };

  const totalPages = calculateTotalPages();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/Identity/identitykeyword.json`)
      .then((response) => response.json())
      .then((data) => setButtonData(data));
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let data = [];
      let initialSyncStates = {};
      let initialImageSrcs = {};

      for (let identity of Identity) {
        const response = await fetch(identity.path);
        const jsonData = await response.json();
        data = [...data, ...jsonData];
      }

      data.forEach((item) => {
        initialSyncStates[item.id] = versionSync;
        initialImageSrcs[item.id] = item.imgsrc;
      });

      data.sort((a, b) => b.id - a.id);

      setAllIdentityData(data);
      setClickedIdentityData(data);
      setSyncStates(initialSyncStates);
      setCurrentPage(1);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filterTerm !== "") {
      // 완전히 일치하는 결과만 필터링합니다.
      const filteredData = allIdentityData.filter((identity) =>
        identity.keyword.some((key) => key === filterTerm)
      );
      setClickedIdentityData(filteredData);
    } else {
      setClickedIdentityData(allIdentityData);
    }
  }, [filterTerm, allIdentityData]);

  function resetAllFilters() {
    let initialSyncStates = {};

    allIdentityData.forEach((item) => {
      initialSyncStates[item.id] = versionSync;
    });

    setClickedIdentityData(allIdentityData);
    setSearchTerm("");
    setSyncStates(initialSyncStates);
    setCurrentPage(1);
  }

  const handleClick = (index) => {
    const clickedIdentity = Identity[index];
    if (!clickedIdentity) return;

    const newSearchTerm = clickedIdentity.name; // 검색할 새로운 키워드

    // searchTerm과 filterTerm을 업데이트
    setAutoSuggest(false);
    setSearchTerm(newSearchTerm);
    setFilterTerm(newSearchTerm); // 이 부분이 추가된 것입니다.
    setCurrentPage(1); // 페이지네이션을 1페이지로 설정

    fetch(clickedIdentity.path)
      .then((res) => res.json())
      .then((data) => {
        unstable_batchedUpdates(() => {
          data.sort((a, b) => b.id - a.id);

          let initialSyncStates = {};
          let initialImageSrcs = {};
          data.forEach((item) => {
            initialSyncStates[item.id] = versionSync; // 모든 아이템에 대한 초기 동기화 상태 설정
            initialImageSrcs[item.id] = item.imgsrc; // 모든 아이템에 대한 초기 이미지 소스 설정
          });

          setClickedIdentityData(data);
          setSyncStates(initialSyncStates);
        });
      })
      .catch((error) => console.error("error occurred: ", error));
  };

  const handleButtonClick = (desc) => {
    setSearchTerm(desc);
    setFilterTerm(desc);
    setAutoSuggest(false); // 버튼 클릭으로 키워드 설정시 autoSuggest를 false로 설정
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoadingAni></LoadingAni>
          <LoadingText>정보 불러오는 중...</LoadingText>
        </>
      ) : (
        <>
          <IdentitySelectBox>
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
          </IdentitySelectBox>
          <SearchDiv>
            <SearchDivDiv></SearchDivDiv>
            <SearchDivDiv>
              <SearchSpan>등급별 필터: </SearchSpan>
              {[1, 2, 3].map((grade) => (
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
                ref={inputRef}
                type="text"
                placeholder="키워드 입력"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setAutoSuggest(true); // 직접 입력시 autoSuggest를 true로 설정
                }}
              />

              {recommendations.length > 0 &&
                autoSuggest && // 조건 추가
                ReactDOM.createPortal(portal, document.body)}
              <ResetButton onClick={resetAllFilters}>초기화</ResetButton>
            </SearchDivDiv>
            <SearchDivDiv></SearchDivDiv>
          </SearchDiv>
          <IIDiv>
            {Array.from({ length: rows * columns }, (_, index) => {
              const identity = Identity[index];
              return (
                <IIdivImage
                  key={index}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/portrait/${index}.webp`}
                  alt={identity ? identity.name : `Image ${index}`}
                  onClick={() => {
                    handleClick(index);
                  }}
                />
              );
            })}
          </IIDiv>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
          <SdivTotal>
            {currentItems.map((item, index) => (
              <ItemComponents
                key={index}
                index={index}
                item={item}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // 상태 변경 함수를 자식에게 전달
                setFilterTerm={setFilterTerm} // 이 부분을 추가
              />
            ))}
          </SdivTotal>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
        </>
      )}
    </>
  );
}
