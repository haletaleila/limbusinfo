import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionTitle,
  ButtonContainer,
  Desc,
  FilterButton,
  ImageContainer,
  LoadingAni,
  LoadingText,
  Modal,
  NewsContainer,
  NewsDiv,
} from "./NewsInfoStyle";

const NewsInfo = () => {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 필터링 상태 ('all', 'true', 'false')
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // JSON 파일을 불러옵니다.
    setIsLoading(true);
    fetch(`${process.env.PUBLIC_URL}/json/News/News.json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  const handleTitleClick = (id) => {
    console.log("Clicked id:", id);
    if (openIndex === id) {
      setOpenIndex(null);
    } else {
      setOpenIndex(id);
    }
  };

  const getFilteredData = () => {
    let filteredData;
    if (filter === "all") {
      filteredData = [...data];
    } else {
      const isFormal = filter === "true";
      filteredData = data.filter((item) => item.formal === isFormal);
    }
    return filteredData.reverse(); // 데이터를 역순으로 정렬
  };
  return (
    <>
      {isLoading ? (
        <>
          <LoadingAni></LoadingAni>
          <LoadingText>정보 불러오는 중...</LoadingText>
        </>
      ) : (
        <NewsContainer>
          <ButtonContainer>
            <FilterButton onClick={() => setFilter("all")}>
              전체 공지
            </FilterButton>
            <FilterButton onClick={() => setFilter("true")}>
              공식 공지확인
            </FilterButton>
            <FilterButton onClick={() => setFilter("false")}>
              사이트 공지확인
            </FilterButton>
          </ButtonContainer>

          {getFilteredData().map((item, index) => (
            <NewsDiv key={item.id}>
              <AccordionTitle onClick={() => handleTitleClick(item.id)}>
                {item.title}
              </AccordionTitle>
              {openIndex === item.id && (
                <AccordionContent open={openIndex === item.id}>
                  {item.img.length > 0 && (
                    <ImageContainer>
                      {item.img.map((imgSrc, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={
                            `${process.env.PUBLIC_URL}/assets/images/news/` +
                            imgSrc
                          }
                          alt={`img-${imgIndex}`}
                          onClick={() => setModalImage(imgSrc)}
                        />
                      ))}
                    </ImageContainer>
                  )}
                  <Desc>{item.desc}</Desc>
                </AccordionContent>
              )}
            </NewsDiv>
          ))}
          {modalImage && (
            <Modal onClick={() => setModalImage(null)}>
              <img
                src={
                  `${process.env.PUBLIC_URL}/assets/images/news/` + modalImage
                }
                alt="modal"
              />
            </Modal>
          )}
        </NewsContainer>
      )}
    </>
  );
};

export default NewsInfo;
