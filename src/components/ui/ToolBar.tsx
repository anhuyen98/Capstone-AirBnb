import { Segmented } from "antd";
import { useState } from "react";
import { Button, DatePicker } from ".";
import type { DatePickerProps } from ".";
export const ToolBar = () => {
  const [open, setOpen] = useState(false);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-15">Địa điểm</div>

                <input
                  className="text-18 relative"
                  type="text"
                  placeholder="Tìm kiếm điểm đến"
                  onClick={() => {}}
                ></input>
                <div className="z-50 absolute bg-black w-[500px] text-white top-[80px] left-0">
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                </div>
              </div>
            ),
            value: "diaDiem",
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-15">Nhận phòng</div>
                <DatePicker onChange={onChange} />
              </div>
            ),
            value: "ngayDen",
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-15">Trả phòng</div>
                <DatePicker onChange={onChange} />
              </div>
            ),
            value: "ngayDi",
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div className="font-700 text-15">Khách</div>
                <div className="text-18 opacity-50">Thêm khách</div>
              </div>
            ),
            value: "khach",
          },
          {
            label: (
              <Button className="mt-[15px]" size="large">
                <i className="fa-solid fa-magnifying-glass mr-10"></i> Tìm kiếm
              </Button>
            ),
            value: "button",
          },
        ]}
      />
    </div>
  );
};
