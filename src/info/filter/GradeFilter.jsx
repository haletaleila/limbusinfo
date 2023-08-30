import React, { useState } from "react";

function GradeFilter() {
  const [selectedGrade, setSelectedGrade] = useState("");

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  return (
    <div>
      <ButtonGroup>
        <span>등급별 필터: </span>
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
      </ButtonGroup>

      <DropdownGroup>
        <label htmlFor="gradeSelect">등급별 필터: </label>
        <Dropdown
          id="gradeSelect"
          value={selectedGrade}
          onChange={handleGradeChange}
        >
          <option value="">모두</option>
          <option value="ZAYIN">ZAYIN</option>
          <option value="TETH">TETH</option>
          <option value="HE">HE</option>
          <option value="WAW">WAW</option>
          <option value="ALEPH">ALEPH</option>
        </Dropdown>
      </DropdownGroup>
    </div>
  );
}
