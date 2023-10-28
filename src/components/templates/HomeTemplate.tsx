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
        <div className="mt-[40px] ml-[70px]">
          <p className="font-700 text-20">Khám phá những điểm đến gần đây</p>
        </div>
        <div className="grid grid-cols-4 content">
          {
            listLocation?.map((vitri) => (
              <div>
                <Card
                style={{ width: "80%" }}
                className="!mt-5 flex justify-center"
                title={vitri.tenViTri}
                cover={<img src={vitri.hinhAnh} alt="slide" />}
                bordered={false}
              />
              </div>

            ))
          }
        </div>
        <div className="footer-img">
          <p className="font-700 text-20">
            <span>Ở bất cứ đâu</span>
          </p>
          <div>
            <div className='mt-[20px] mb-[40px] flex justify-center gap-[20px]'>
              <div>
                <img src="https://smarthome.worldtech.vn/wp-content/uploads/2017/10/cac-mau-nha-vuon-dep-1024x716.jpg" alt="hinh-1" style={{ width: '300px', height: '250px', borderRadius: '10px' }} />
                <span>Toàn bộ nhà</span>
              </div>
              <div>
                <img src="https://smarthome.worldtech.vn/wp-content/uploads/2017/10/mau-hinh-anh-ngoi-nha-dep-1024x576.jpg" alt="hinh-2" style={{ width: '300px', height: '250px', borderRadius: '10px' }} />
                <span>Chỗ ở độc đáo</span>
              </div>
              <div>
                <img src="https://afamilycdn.com/2020/1/9/3-15785810130461716361236.jpg" alt="hinh-3" style={{ width: '300px', height: '250px', borderRadius: '10px' }} />
                <span>Trang trại và thiên nhiên</span>
              </div>
              <div>
                <img src="https://braincare.vn/wp-content/uploads/2021/10/nuoi-thu-cung.jpg" alt="hinh-4" style={{ width: '300px', height: '250px', borderRadius: '10px' }} />
                <span>Cho phép mang theo thú cưng</span>
              </div>
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

const MainWrapper = styled.div`
        max-width: var(--max-width);
        margin: auto;
        padding: 40px;
        .content {
          
        }
`
