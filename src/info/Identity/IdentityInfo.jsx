/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useMemo, useState } from "react";
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
  const [descState, setDescState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonData, setButtonData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedGrade, setSelectedGrade] = useState("");

  const [suggestedTerms, setSuggestedTerms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSuggestionClick = (term) => {
    setSearchTerm(term);
    setShowDropdown(false);
  };

  // 1. 중복 키워드를 제거하기 위해 Set을 사용
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // 2. 입력 칸에 글자가 나오도록 설정
    if (value.length >= 2) {
      const newSuggestions = Array.from(
        new Set(
          allIdentityData
            .map((identity) => identity.keyword)
            .flat()
            .filter((key) => key.includes(value))
        )
      );
      setSuggestedTerms(newSuggestions);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setSuggestedTerms([]);
    }
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setCurrentPage(1);
  };

  const filteredIdentityData = useMemo(() => {
    return allIdentityData.filter((identity) => {
      const keywordMatch =
        searchTerm.length >= 2
          ? identity.keyword.some((key) => key === searchTerm)
          : identity.keyword.some((key) => key.includes(searchTerm));

      const gradeMatch =
        selectedGrade === "" || identity.rank === selectedGrade;

      return keywordMatch && gradeMatch;
    });
  }, [allIdentityData, searchTerm]);

  const filteredItems = (
    searchTerm ? filteredIdentityData : clickedIdentityData
  ).filter((identity) => {
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
    fetch(`${process.env.PUBLIC_URL}/json/Identity/identitykeyword.json`)
      .then((response) => response.json())
      .then((data) => setButtonData(data));
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      const filteredData = allIdentityData.filter((identity) =>
        identity.keyword.some((key) => key.includes(searchTerm))
      );
      setClickedIdentityData(filteredData);
    } else {
      setClickedIdentityData(allIdentityData);
    }
  }, [searchTerm, allIdentityData]);

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

    setSearchTerm("");
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
          setSearchTerm("");
          setSyncStates(initialSyncStates);
        });
      })
      .catch((error) => console.error("error occurred: ", error));
  };

  const handleButtonClick = (desc) => {
    setSearchTerm(desc); // 5. 키워드 모음집을 눌렀을 때 입력 칸에 글자가 나오도록 설정
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
            <SearchDivDiv>
              {" "}
              <SearchDivDiv></SearchDivDiv>
              <SearchSpan>키워드 검색 : </SearchSpan>
            </SearchDivDiv>
            <SearchDivDiv>
              <InputKeyword
                type="text"
                placeholder="키워드 입력"
                value={searchTerm} // 2, 3, 5. 입력 칸에 글자가 나오도록 설정
                onChange={handleInputChange}
              />
              {/* 4. 드롭다운 메뉴에 CSS 적용 */}
              {showDropdown && (
                <div
                  style={{ border: "1px solid #ccc", backgroundColor: "#fff" }}
                >
                  {suggestedTerms.map((term, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(term)}
                      style={{ padding: "8px", cursor: "pointer" }}
                    >
                      {term}
                    </div>
                  ))}
                </div>
              )}
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
