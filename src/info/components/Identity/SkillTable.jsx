import { useMemo } from "react";
import { useTable } from "react-table";
import { SkillDiv, SkillImage } from "../../Identity/IdentityInfoStyle";
import styled from "styled-components";

// CSS 스타일 추가
const StyledTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  border-radius: 0.9375rem;
  border: 2px solid darkgray;

  th,
  td {
    border: 1px solid lightgray;
    padding: 8px;
  }

  th {
    text-align: left;
    background-color: #b0b0b0;
  }

  td {
    text-align: center;
    background-color: #e0e0e0;
  }

  @media (max-width: 1024px) {
    th,
    td {
      display: block;
      /* width: 100%; */
    }

    th {
      background-color: #b0b0b0; // 진한 회색
      text-align: center;
    }

    tr {
      display: flex;
      flex-direction: column;
    }
  }

  /* @media (max-width: 560px) {
    th,
    td {
      display: block;
      width: 100%;
    }

    th {
      background-color: #b0b0b0; // 진한 회색
      text-align: center;
    }

    tr {
      display: flex;
      flex-direction: column;
    }
  } */
`;

function calculateDifference(value, versionLevel) {
  const difference = value - versionLevel;
  if (difference > 0) {
    return `${value}(+${difference})`;
  } else if (difference < 0) {
    return `${value}(${difference})`;
  } else if (difference === 0) {
    return `${value}(0)`;
  } else {
    return `${value}`;
  }
}

const SkillTable = ({ skill }) => {
  const versionLevel = 35;

  const columns = useMemo(
    () => [
      {
        Header: "레벨",
        accessor: "skilltype",
        Cell: ({ value, row }) => (
          <SkillDiv>
            <SkillImage
              alt={value}
              src={
                value === "공격" || row.original.catype === "반격"
                  ? `${process.env.PUBLIC_URL}/assets/images/etc/level/공격레벨.webp`
                  : `${process.env.PUBLIC_URL}/assets/images/etc/level/회피레벨.webp`
              }
            />
            {calculateDifference(skill.level, versionLevel)}
          </SkillDiv>
        ),
      },
      {
        Header: skill.skilltype + " 유형",
        accessor: "type",
        Cell: ({ row }) => (
          <SkillDiv>
            {row.original.catype ? (
              <>
                <SkillImage
                  alt={row.original.catype}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${row.original.catype}.webp`}
                />
                {row.original.type}
              </>
            ) : row.original.skilltype === "공격" ? (
              <>
                <SkillImage
                  alt={row.original.type}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${row.original.type}.webp`}
                />
                {row.original.type}
              </>
            ) : (
              row.original.type
            )}
          </SkillDiv>
        ),
      },
      {
        Header: "죄악 속성",
        accessor: "prop",
        Cell: ({ value }) => (
          <SkillDiv>
            {value !== "없음" ? (
              <>
                <SkillImage
                  alt={value}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/prop/${value}icon.webp`}
                  style={{ width: "1.5rem", height: "1.7rem" }}
                />
                {value}
              </>
            ) : (
              value
            )}
          </SkillDiv>
        ),
      },
      {
        Header: "스킬 위력",
        accessor: "power",
      },
      {
        Header: "코인 위력",
        accessor: "coinpower",
        Cell: ({ value }) => (value > 0 ? `+${value}` : value),
      },
      {
        Header: "공격 가중치(광역)",
        accessor: "weight",
      },
    ],
    []
  );

  const data = useMemo(() => [skill], [skill]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <StyledTable {...getTableProps()}>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return headerGroups.map((header) =>
            header.headers.map((col, index) => (
              <tr key={index}>
                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                <td {...row.cells[index].getCellProps()}>
                  {row.cells[index].render("Cell")}
                </td>
              </tr>
            ))
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default SkillTable;
