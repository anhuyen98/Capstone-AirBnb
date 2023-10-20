import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <Container className="mt-[100px] flex flex-col">
      {/* <img
                className="w-full"
                src="https://cinestar.com.vn/catalog/view/theme/default/images/line-bg.png"
                alt="..."
            /> */}
      <hr />
      <div className="footer-content">

        <div className="mt-[40px] flex gap-[300px] info">
          <div>
            <p className="font-700 text-20">
              <span className="text-[var(--primary-color)]">Hỗ trợ</span>

            </p>
            <NavLink to="">Trung tâm trợ giúp</NavLink>
            <NavLink to="">AirCover</NavLink>
            <NavLink to="">Chống phân biệt đối xử</NavLink>
            <NavLink to="">Hỗ trợ người khuyết tật</NavLink>
            <NavLink to="">Các tùy chọn hủy</NavLink>
            <NavLink to="">Báo cáo lo ngại của khu dân cư</NavLink>
          </div>
          <div>
            <p className="font-700 text-20">
              <span>Đón tiếp khách</span>
            </p>
            <NavLink to="">Cho thuê nhà trên Airbnb</NavLink>
            <NavLink to="">AirCover cho Chủ nhà</NavLink>
            <NavLink to="">Tài nguyên về đón tiếp khách</NavLink>
            <NavLink to="">Diễn đàn cộng đồng</NavLink>
            <NavLink to="">Đón tiếp khách có trách nhiệm</NavLink>
          </div>
          <div>
            <p className="font-700 text-20">
              <span>Airbnb</span>
            </p>
            <NavLink to="">Trang tin tức</NavLink>
            <NavLink to="">Tính năng mới</NavLink>
            <NavLink to="">Cơ hội nghề nghiệp</NavLink>
            <NavLink to="">Nhà đầu tư</NavLink>
            <NavLink to="">Chỗ ở khẩn cấp Airbnb.org</NavLink>
          </div>

        </div>
        <div className="mt-[100px] grid grid-cols-2  gap-[700px]">
          <div className="p-[10px]">
            <NavLink to="">© 2023 Airbnb, Inc.</NavLink>
            <i className="fa-solid fa-circle fa-2xs"></i>           
            <NavLink to="">Quyền riêng tư</NavLink>
            <i className="fa-solid fa-circle fa-2xs"></i>
            <NavLink to="">Điều khoản</NavLink>
          </div>
          <div className="social">
            <NavLink to="https://www.facebook.com" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </NavLink>
            <NavLink to="https://www.instagram.com" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </NavLink>
            <NavLink to="https://www.twitter.com" target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </NavLink>
            <NavLink to="https://www.youtube.com" target="_blank">
              <i className="fa-brands fa-youtube"></i>
            </NavLink>
          </div>

        </div>
      </div>
    </Container>
  )
}

const Container = styled.footer`
    .footer-content {
        max-width: var(--max-width);
        margin: auto;
        padding: 20px 40px;

        .social {
            font-size: 26px;
            color: #111;
            display: flex;
            gap: 30px;
            i {
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                &:hover {
                    color: var(--primary-color);
                }
            }
        }

        .info {
            a {
                transition: all 0.3s ease-in-out;
                display: block;
                margin-top: 16px;
                &:hover {
                    color: var(--primary-color);
                    text-shadow: var(--primary-color) 0 0 1px;
                }
            }
        }
    }
`
