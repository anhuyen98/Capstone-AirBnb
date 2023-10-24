import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { RootState, useAppDispatch } from "store"
import {useEffect} from 'react'
import { getListRoomByLocalThunk } from "store/room"
import { Card } from 'antd';  
const { Meta } = Card;

export const ListRoomTemplate = () => {
  const { listRoomByLocal } = useSelector((state: RootState) => state.room)
  const dispatch = useAppDispatch()
  const params = useParams()
  useEffect(() => {
    dispatch(getListRoomByLocalThunk(Number(params.roomLocalId)))
  },[dispatch, params])
  return (
    <div className="grid grid-cols-12">
        
      {
        listRoomByLocal?.map((room) => {
          return (
            <div className="col-span-4 my-5" key={room.id}>
              <Card
                hoverable
                style={{width: 450 }}
                cover={<img alt="example" src={room.hinhAnh}  />}
              >
                <Meta className="text-ellipsis" title={room.tenPhong} description={room.moTa.substring(0, 150)} />
              </Card>
            </div>
            // <div key={}>
            //   <p>{room.tenPhong}</p>
            //   <img src={room.hinhAnh} alt="" width='500px'/>
            //   <p>{room.giaTien}</p>
            //   <p>{room.moTa}</p>
            // </div>
          )
        })
      }
      <Outlet />
    </div>
  )
}
