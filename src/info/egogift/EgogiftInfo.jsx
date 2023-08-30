import React, { useEffect, useState } from "react";
import {
  EgoBox,
  EgoBoxContainer,
  EgoDiv,
  EgoImage,
  EgoSelectBox,
  EgoTitleTextDescDiv,
  EgoTitleTextName,
  HighlightText,
  HighlightedText,
  InputKeyword,
  LoadingAni,
  LoadingText,
  ResetButton,
  SdivImage,
  SearchDiv,
  SearchDivDiv,
  SearchSpan,
  SyncText,
  StyledNameSpan,
  StyledButton,
  ButtonText,
} from "./EgogiftStyle";
import { PaginationButtons } from "../components/pagenation/PagenationButton";
import { ColorMap } from "../components/Mapper/ColorMap";
import { ToolTipMap } from "../components/Mapper/ToolTipMap";

export default function EgogiftInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonData, setButtonData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
    setCurrentPage(1);
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade); // 상태 변수 업데이트
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

  const filteredData = data.filter((item) => {
    if (searchTerm.length >= 2) {
      return (
        item.keyword.some((key) => key === searchTerm) &&
        (selectedGrade === "" || item.rank === selectedGrade)
      );
    } else {
      return (
        item.keyword.some((key) => key.includes(searchTerm)) &&
        (selectedGrade === "" || item.rank === selectedGrade)
      );
    }
  });

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedGrade(""); // 모든 필터 초기화
  };

  const handleButtonClick = (desc) => {
    // 키워드로 desc를 설정
    setSearchTerm(desc);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
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
            <SearchSpan>등급별 필터: </SearchSpan>
            {[1, 2, 3, 4, 5].map((grade) => (
              <ResetButton key={grade} onClick={() => handleGradeClick(grade)}>
                {grade}
              </ResetButton>
            ))}
            <ResetButton onClick={() => setSelectedGrade("")}>모두</ResetButton>
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
              <ResetButton onClick={resetAllFilters}>초기화</ResetButton>
            </SearchDivDiv>
          </SearchDiv>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageClick}
          />
          <EgoBoxContainer>
            {currentItems.map((item, index) => (
              <EgoBox key={index}>
                <EgoDiv>
                  <EgoTitleTextDescDiv style={{ marginBottom: "20px" }}>
                    <StyledNameSpan fontColor={item.prop}>
                      {item.title} - ({item.rank} 등급)
                    </StyledNameSpan>
                  </EgoTitleTextDescDiv>
                  <SdivImage
                    src={`${process.env.PUBLIC_URL}/assets/images/egogift/${item.img}`}
                    alt={item.title}
                  />
                  <EgoTitleTextName>
                    <EgoTitleTextDescDiv>
                      가격 : {item.price}원
                    </EgoTitleTextDescDiv>
                    <EgoTitleTextDescDiv>
                      환상체: {item.abnormality}
                    </EgoTitleTextDescDiv>
                    <EgoTitleTextDescDiv
                      style={{
                        fontSize: "1rem",
                        wordBreak: "keep-all",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <HighlightedText
                        text={item.desc}
                        colorMap={ColorMap}
                        tooltipMap={ToolTipMap}
                        // tooltip={tooltip}
                      ></HighlightedText>
                    </EgoTitleTextDescDiv>
                    <br />
                    <EgoTitleTextDescDiv>
                      <SyncText>
                        키워드 :{" "}
                        {item.keyword
                          .map((key, index) => (
                            <span
                              key={index}
                              onClick={() => handleKeywordClick(key)}
                            >
                              {highlightText(key, searchTerm)}
                            </span>
                          ))
                          .reduce((prev, curr, i) => {
                            return i === 0 ? [curr] : [...prev, ", ", curr];
                          }, [])}
                      </SyncText>
                    </EgoTitleTextDescDiv>
                  </EgoTitleTextName>
                </EgoDiv>
              </EgoBox>
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
