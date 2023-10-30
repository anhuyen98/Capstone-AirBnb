import { Segmented } from "antd";
import { Button, DatePicker } from ".";
import type { DatePickerProps } from ".";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useQueryUrl } from "hooks";
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";
export const ToolBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [locationChoose, setLocationChoose] = useState(undefined);
  const [inputValue, setInputValue] = useState<string>("");
  const { listLocation } = useSelector((state: RootState) => state.location);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const [queryParams, setQueryParams] = useQueryUrl();
  const searchListLocation = () => {
    if (!queryParams?.locationName) {
      return listLocation;
    }

    return listLocation?.filter((location) =>
      location.tenViTri
        ?.toLowerCase()
        .includes(queryParams?.locationName!.toLowerCase())
    );
  };
  return (
    <ToolBarContainer className="toolBar">
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-14">Địa điểm</div>

                <input
                  className="text-14 relative"
                  type="text"
                  placeholder="Tìm kiếm điểm đến"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setQueryParams({
                      locationName: inputValue,
                    });
                  }}
                  onFocus={() => {
                    setOpen(true);
                  }}
                  onBlur={() => {
                    setOpen(false);
                    setQueryParams(undefined);
                  }}
                ></input>

                <div
                  className={`searchBox drop-shadow-2xl ${
                    open ? "active" : "inactive"
                  }`}
                >
                  {
                    (queryParams?.locationName
                      ? searchListLocation()
                      : listLocation
                    )?.map((location) => {
                      return (
                        <div key={location.id} className="text-16 leading-10">
                          <Button
                            type="text"
                            danger
                            className="w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setInputValue(e.currentTarget.textContent);
                              setQueryParams(undefined);
                              setLocationChoose(location);
                            }}
                          >
                            <i className="fa-solid fa-map-location-dot mr-20"></i>
                            {location.tenViTri} - {location.tinhThanh}
                          </Button>
                        </div>
                      );
                    })
                    // : "Không tìm thấy kết quả phù hợp"
                  }
                </div>
              </div>
            ),
            value: "diaDiem",
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-14">Nhận phòng</div>
                <DatePicker onChange={onChange} />
              </div>
            ),
            value: "ngayDen",
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-14">Trả phòng</div>
                <DatePicker onChange={onChange} />
              </div>
            ),
            value: "ngayDi",
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-14">Khách</div>
                <div className="text-14 opacity-50">Thêm khách</div>
              </div>
            ),
            value: "khach",
          },
          {
            label: (
              <Button
                className="btn-search mt-[10px] mr-0"
                size="small"
                onClick={() => {
                  const path = generatePath(PATH.room, {
                    roomLocalId: String(locationChoose.id),
                  });
                  navigate(path);
                }}
              >
                <i className="fa-solid fa-magnifying-glass mr-10"></i>{" "}
                <span className="spanBtn">Tìm kiếm</span>
              </Button>
            ),
            value: "button",
          },
        ]}
      />
    </ToolBarContainer>
  );
};

const ToolBarContainer = styled.div`
  .searchBox {
    width: 300px;
    background: #fff;
    color: #000;
    border-radius: 10px;
    position: absolute;
    top: 80px;
    left: 0;
    z-index: 99999;
    border: 1px solid #efebeb;
    &.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      transition: all 0.3s ease;
    }
    &.inactive {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
      transition: all 0.3s ease;
    }
  }
`;
