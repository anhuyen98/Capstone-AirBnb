import { Card, Carousel } from "components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListLocationThunk } from "store/location";
import styled from "styled-components";

export const HomeTemplate = () => {
  const dispatch = useAppDispatch()
  const { listLocation } = useSelector((state: RootState) => state.location)


  useEffect(() => { dispatch(getListLocationThunk()) }, [dispatch])


  return (
    <div>
      <MainWrapper id="main-content">
        <Carousel />
        <p className="!mt-4"><span>Khám phá những điểm đến gần đây</span></p>
        <div className="grid grid-cols-4">
          {
            listLocation?.map((vitri) => (
              <Card
                style={{ width: "100px", height:"100%" }}
                className="!mt-5"
                cover={<img src={vitri.hinhAnh} alt="slide" />}
                title={vitri.tinhThanh}
                // title={vitri.tenViTri}
                bordered={false}
              >

              </Card>

            ))
          }
        </div>
      </MainWrapper>
    </div>
  );
};

const MainWrapper = styled.div`
        max-width: var(--max-width);
        margin: auto;
        padding: 40px;
`
