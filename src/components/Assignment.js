import React, { useEffect, useState } from "react";
import "./Assignment.css";
import { TbGridDots } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaTrash, FaEdit } from "react-icons/fa";
import image1 from "../assests/download1.webp";
import image2 from "../assests/download2.webp";
import image3 from "../assests/download3.webp";
import image4 from "../assests/download4.jpg";
export const Assignment = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      filter: "discount items",
      columns: [image4, ""],
      discounts: [false],
    },
    {
      id: 2,
      filter: "discount items",
      columns: [image1, image2, ""],
      discounts: [true, false],
    },
    {
      id: 3,
      filter: "discount items",
      columns: [image3, ""],
      discounts: [false, false],
    },
  ]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [columnCount, setColumnCount] = useState(3);
  useEffect(() => {
    const maxColumnsLength = rows.reduce((maxLength, item) => {
        return Math.max(maxLength, item.columns.length);
      }, 0);
      setColumnCount(maxColumnsLength);
  }, [rows]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        filter: "discount items",
        columns: [""],
        discounts: [false],
      },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };


  const removeColumn = (index) => {
    if (columnCount > 1) {
      setColumnCount(columnCount - 1);
      setRows(
        rows.map((row) => ({
          ...row,
          columns: row.columns.filter((_, i) => i !== index),
        }))
      );
    }
  };

  const moveRow = (fromIndex, toIndex) => {
    const updatedRows = [...rows];
    const [movedRow] = updatedRows.splice(fromIndex, 1);
    updatedRows.splice(toIndex, 0, movedRow);
    setRows(updatedRows);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
    event.currentTarget.style.opacity = "0.4";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData("text/plain");
    moveRow(parseInt(fromIndex, 10), index);
    event.currentTarget.style.opacity = "1";
  };

  const handleDragEnd = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const handleAddDesign = (rowIndex, colIndex) => {
    console.log(colIndex);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          setRows((prevRows) =>
            prevRows.map((row, i) =>
              i === rowIndex
                ? {
                    ...row,
                    columns: [
                      ...row.columns.map((col, j) =>
                        j === colIndex ? imageUrl : col
                      ),
                    ],
                    discounts: [
                      ...row.discounts.map((col, j) =>
                        j === colIndex ? false : col
                      ),
                    ],
                  }
                : row
            )
          );
        };
        if (colIndex === rows[rowIndex]["columns"].length - 1) {
          setRows((prevRows) =>
            prevRows.map((row, i) =>
              i === rowIndex
                ? {
                    ...row,
                    columns: [...row.columns, ""],
                  }
                : row
            )
          );
        }
        console.log(rows);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const [discountb, setdicountb] = useState(false);
  return (
    <div className="AssignmentCard">
      <div className="header"></div>
      <div className="table-container">
        <table>
          <thead>
            <tr style={{ height: "5rem" }}>
              <th></th>
              <th>
                <div
                  style={{
                    borderRight:
                      "1px solid var(--stroke-soft-200, rgba(225, 228, 234, 1))",
                    height: "3rem",
                    width: "48rem",
                  }}
                >
                  Product Filter
                </div>
              </th>
              {Array(columnCount)
                .fill(null)
                .map((_, index) => (
                  <th key={index}>
                    <div
                      className="moreinfovariant"
                      style={{
                        borderRight:
                          "1px solid var(--stroke-soft-200, rgba(225, 228, 234, 1))",
                        height: "3rem",
                        paddingRight: "0.5rem",
                        width: "16rem",
                      }}
                    >
                      Variant {index + 1}
                      <HiOutlineDotsVertical
                        onClick={() => removeColumn(index)}
                      />
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
                onDragEnd={handleDragEnd}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
              >
                <td
                  className="row-index"
                  style={{
                    borderRight:
                      "1px solid var(--stroke-soft-200, rgba(225, 228, 234, 1))",
                  }}
                >
                  <div
                    className="deleteiconss"
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      height: "4rem",
                    }}
                  >
                    <span>{index + 1}</span>
                    <TbGridDots
                      className="tb-grid-dots"
                      onClick={() => removeRow(index)}
                    />
                    {hoveredRowIndex === index && (
                      <button className="delete-button">
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
                <td className="filtercolumn">
                  <div className="filtercolumn1">
                    Click on the button to apply filter
                    <div
                      className={
                        discountb ? "discountbuttton-active" : "discountbuttton"
                      }
                      onClick={() => {
                        setdicountb(!discountb);
                      }}
                    >
                      {row.filter}
                    </div>
                  </div>
                </td>
                {row.columns.map(
                  (column, colIndex) =>
                    discountb &&
                    row.discounts[colIndex] && (
                      <td
                        key={colIndex}
                        style={{
                          borderRight:
                            "1px solid var(--stroke-soft-200, rgba(225, 228, 234, 1))",
                          height: "2rem",
                        }}
                      >
                        {column ? (
                          <>
                            <div className="design-image">
                              <div className="edit-icon">
                                <span className="icon">
                                  <FaEdit
                                    onClick={() =>
                                      handleAddDesign(index, colIndex)
                                    }
                                  />
                                </span>
                              </div>
                              <img
                                src={column}
                                alt="design"
                                className="design-image-image"
                              />
                              <div>
                                {row.discounts[colIndex]
                                  ? "discount applicable"
                                  : "discount not applicable"}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            className="addicon"
                            onClick={() =>
                              column === "" && handleAddDesign(index, colIndex)
                            }
                          >
                            <FaPlus />
                          </div>
                        )}
                      </td>
                    )
                )}
                {row.columns.map(
                  (column, colIndex) =>
                    !discountb && (
                      <td
                        key={colIndex}
                        style={{
                          borderRight:
                            "1px solid var(--stroke-soft-200, rgba(225, 228, 234, 1))",
                          height: "2rem",
                        }}
                      >
                        {column ? (
                          <>
                            <div className="design-image">
                              <div className="edit-icon">
                                <span className="icon">
                                  <FaEdit
                                    onClick={() =>
                                      handleAddDesign(index, colIndex)
                                    }
                                  />
                                </span>
                              </div>
                              <img
                                src={column}
                                alt="design"
                                className="design-image-image"
                              />
                              <div>
                                {row.discounts[colIndex]
                                  ? "discount applicable"
                                  : "discount not applicable"}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            className="addicon"
                            onClick={() =>
                              column === "" && handleAddDesign(index, colIndex)
                            }
                          >
                            <FaPlus />
                          </div>
                        )}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="addicon"
          style={{ marginLeft: "25rem" }}
          onClick={addRow}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};
