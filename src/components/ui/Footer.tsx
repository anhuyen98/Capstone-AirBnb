import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <Container className="mt-[100px] footer">
      
      <hr />
      <div className="footer-content">
        <div className="mt-[40px] flex justify-center gap-[110px] info">
          <div>
            <p className="font-700 text-20">
              <span>Hỗ trợ</span>
            </p>
            <NavLink to="">Trung tâm trợ giúp</NavLink><br />
            <NavLink to="">AirCover</NavLink><br />
            <NavLink to="">Chống phân biệt đối xử</NavLink><br />
            <NavLink to="">Hỗ trợ người khuyết tật</NavLink><br />
            <NavLink to="">Các tùy chọn hủy</NavLink><br />
            <NavLink to="">Báo cáo lo ngại của khu dân cư</NavLink><br />
          </div>
          <div>
            <p className="font-700 text-20">
              <span>Cộng đồng</span>
            </p>
            <NavLink to="">Sự đa dạng và cảm giác thân thuộc</NavLink><br />
            <NavLink to="">Tiện nghi phù hợp chho người khuyết tật</NavLink><br />
            <NavLink to="">Đối tác liên kết Airbnb</NavLink><br />
            <NavLink to="">Chỗ ở cho tuyến đầu</NavLink><br />
            <NavLink to="">Lượt giới thiệu của khách</NavLink><br />
            <NavLink to="">Trung tâm cộng đồng</NavLink><br />
          </div>
          <div>
            <p className="font-700 text-20">
              <span>Đón tiếp khách</span>
            </p>
            <NavLink to="">Cho thuê nhà trên Airbnb</NavLink><br />
            <NavLink to="">AirCover cho Chủ nhà</NavLink><br />
            <NavLink to="">Tài nguyên về đón tiếp khách</NavLink><br />
            <NavLink to="">Diễn đàn cộng đồng</NavLink><br />
            <NavLink to="">Đón tiếp khách có trách nhiệm</NavLink><br />
          </div>
          <div>
            <p className="font-700 text-20">
              <span>Airbnb</span>
            </p>
            <NavLink to="">Trang tin tức</NavLink><br />
            <NavLink to="">Tính năng mới</NavLink><br />
            <NavLink to="">Cơ hội nghề nghiệp</NavLink><br />
            <NavLink to="">Nhà đầu tư</NavLink><br />
            <NavLink to="">Chỗ ở khẩn cấp Airbnb.org</NavLink><br />
          </div>
        </div>
        <div className="mt-[50px] flex justify-center items-center gap-[610px]">
          <div className="left">
            <NavLink to="">© 2023 Airbnb, Inc.</NavLink>
            <span> ‧ </span>
            <NavLink to="">Quyền riêng tư</NavLink>
            <span> ‧ </span>
            <NavLink to="">Điều khoản</NavLink>
          </div>
          <div className="social">
            <nav className="globe-icon">
              <NavLink to="">
                <i className="fa-solid fa-globe"></i>
                <span> Tiếng Việt (VN)</span>
              </NavLink>
            </nav>
            <NavLink to="">
              <span>$ USD</span>
            </NavLink>
            <NavLink to="https://www.facebook.com" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </NavLink>
            <NavLink to="https://www.twitter.com" target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </NavLink>
            <NavLink to="https://www.instagram.com" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </NavLink>
          </div>

        </div>
      </div>
    </Container>
  )
}

const Container = styled.footer`
    .footer {
      max-width: var(--max-width);
      margin: auto;
      padding: 20px 40px;
    }
    .footer-content {
      .social {
          font-size: 16px;
          color: #111;
          display: flex;
          gap: 20px;
          i {
              
              transition: all 0.3s ease-in-out;
              &:hover {
                  color: #e50914;
              }
          }
          span {
            text-decoration: underline;
          }
      }
      }
    /* .footer-content {
        max-width: var(--max-width);
        margin: auto;
        padding: 20px 40px;
        .social {
            font-size: 16px;
            color: #111;
            display: flex;
            gap: 20px;
            i {
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                &:hover {
                    color: #e50914;
                }
            }
            span {
              text-decoration: underline;
            }
        }
    } */
`
