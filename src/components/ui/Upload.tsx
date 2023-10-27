import { Upload as UploadA , UploadProps as UploadPropsA  } from 'antd'

type UploadProps = UploadPropsA & {
    //
}

export const Upload = (props: UploadProps) => {
    return <UploadA {...props}/>
}


