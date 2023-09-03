/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useMemo, useState } from "react";
import {
  IIDiv,
  IIdivImage,
  InputKeyword,
  Sdiv,
  SearchDiv,
  SearchDivDiv,
  SearchSpan,
  SdivTotal,
  ResetButton,
  LoadingAni,
  LoadingText,
  EgoSelectBox,
  StyledButton,
  ButtonText,
  FilterButton,
} from "./EgoInfoStyle";
import Ego from "./Ego";
import { PaginationButtons } from "../components/pagenation/PagenationButton";
import ItemComponents from "../components/ego/ItemComponents";

import { unstable_batchedUpdates } from "react-dom";

export default function EgoInfo() {
  const versionSync = "sync4";
  const rows = 2;
  const columns = 6;

  const [allEgoData, setAllEgoData] = useState([]);
  const [clickedEgoData, setClickedEgoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncStates, setSyncStates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonData, setButtonData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedGrade, setSelectedGrade] = useState("");

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setCurrentPage(1);
  };

  const filteredEgoData = useMemo(() => {
    return allEgoData.filter((ego) => {
      const keywordMatch =
        searchTerm.length >= 2
          ? ego.keyword.some((key) => key === searchTerm)
          : ego.keyword.some((key) => key.includes(searchTerm));

      const gradeMatch = selectedGrade === "" || ego.egorank === selectedGrade; // 수정

      return keywordMatch && gradeMatch;
    });
  }, [allEgoData, searchTerm]);

  const filteredItems = (searchTerm ? filteredEgoData : clickedEgoData).filter(
    (ego) => {
      return selectedGrade === "" || ego.egorank === selectedGrade; // 수정
    }
  );

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
    fetch(`${process.env.PUBLIC_URL}/json/Ego/egokeyword.json`)
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

      for (let ego of Ego) {
        const response = await fetch(ego.path);
        const jsonData = await response.json();
        data = [...data, ...jsonData];
      }

      data.forEach((item) => {
        initialSyncStates[item.id] = versionSync;
        initialImageSrcs[item.id] = item.imgsrc;
      });

      data.sort((a, b) => b.id - a.id);

      setAllEgoData(data);
      setClickedEgoData(data);
      setSyncStates(initialSyncStates);
      setCurrentPage(1);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = allEgoData;

    // 등급 필터 적용
    if (selectedGrade !== "") {
      filteredData = filteredData.filter(
        (ego) => ego.egorank === selectedGrade
      );
    }

    // 키워드 검색 필터 적용
    if (searchTerm !== "") {
      filteredData = filteredData.filter((ego) =>
        ego.keyword.some((key) => key.includes(searchTerm))
      );
    }

    setClickedEgoData(filteredData);
  }, [searchTerm, allEgoData, selectedGrade]);

  function resetAllFilters() {
    let initialSyncStates = {};

    allEgoData.forEach((item) => {
      initialSyncStates[item.id] = versionSync;
    });

    setClickedEgoData(allEgoData);
    setSearchTerm("");
    setSyncStates(initialSyncStates);
    setCurrentPage(1);
  }

  const handleClick = (index) => {
    const clickedEgo = Ego[index];
    if (!clickedEgo) return;

    setSearchTerm("");
    setCurrentPage(1);

    fetch(clickedEgo.path)
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

          setClickedEgoData(data);
          setSearchTerm("");
          setSyncStates(initialSyncStates);
        });
      })
      .catch((error) => console.error("error occurred: ", error));
  };

  const handleButtonClick = (desc) => {
    // 키워드로 desc를 설정
    setSearchTerm(desc);
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
              {["ZAYIN", "TETH", "HE", "WAW", "ALEPH"].map((grade) => (
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
              <SearchDivDiv></SearchDivDiv>
            </SearchDivDiv>
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
              <ResetButton onClick={resetAllFilters}>초기화</ResetButton>
            </SearchDivDiv>
            <SearchDivDiv></SearchDivDiv>
          </SearchDiv>
          <IIDiv>
            {Array.from({ length: rows * columns }, (_, index) => {
              const ego = Ego[index];
              return (
                <IIdivImage
                  key={index}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/portrait/${index}.webp`}
                  alt={ego ? ego.name : `Image ${index}`}
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
