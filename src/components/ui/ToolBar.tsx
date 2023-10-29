import { Segmented } from "antd";
import { Button, DatePicker } from ".";
import type { DatePickerProps } from ".";
export const ToolBar = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="toolBar">
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
                  onClick={() => {}}
                ></input>
                <div className="z-50 absolute bg-white w-[500px] text-black top-[80px] left-0 drop-shadow-2xl rounded-10 border border-slate-200 z-50">
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
              <Button className="btn-search mt-[10px] mr-0" size="small">
                <i className="fa-solid fa-magnifying-glass mr-10"></i>{" "}
                <span className="spanBtn">Tìm kiếm</span>
              </Button>
            ),
            value: "button",
          },
        ]}
      />
    </div>
  );
};
