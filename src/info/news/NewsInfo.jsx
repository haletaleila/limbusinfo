import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionTitle,
  FilterButton,
  ImageContainer,
  Modal,
  NewsContainer,
  NewsDiv,
} from "./NewsInfoStyle";

const NewsInfo = () => {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 필터링 상태 ('all', 'true', 'false')
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    // JSON 파일을 불러옵니다.
    fetch("json/News/News.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleTitleClick = (id) => {
    console.log("Clicked id:", id); // 이 부분을 추가
    if (openIndex === id) {
      setOpenIndex(null);
    } else {
      setOpenIndex(id);
    }
  };

  // 필터링된 데이터를 반환하는 함수
  const getFilteredData = () => {
    if (filter === "all") return data;
    const isFormal = filter === "true";
    return data.filter((item) => item.formal === isFormal);
  };
  return (
    <NewsContainer>
      <FilterButton onClick={() => setFilter("all")}>All</FilterButton>
      <FilterButton onClick={() => setFilter("true")}>Formal</FilterButton>
      <FilterButton onClick={() => setFilter("false")}>Informal</FilterButton>
      {getFilteredData().map((item, index) => (
        <NewsDiv key={item.id}>
          <AccordionTitle onClick={() => handleTitleClick(item.id)}>
            {item.title}
          </AccordionTitle>
          {openIndex === item.id && (
            <AccordionContent>
              {item.img.length > 0 && (
                <ImageContainer>
                  {item.img.map((imgSrc, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgSrc}
                      alt={`img-${imgIndex}`}
                      onClick={() => setModalImage(imgSrc)}
                    />
                  ))}
                </ImageContainer>
              )}
              <div className="description">{item.desc}</div>
            </AccordionContent>
          )}
        </NewsDiv>
      ))}
      {modalImage && (
        <Modal onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="modal" />
        </Modal>
      )}
    </NewsContainer>
  );
};

export default NewsInfo;
