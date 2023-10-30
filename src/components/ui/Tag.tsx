import { Tag as TagA, TagProps as TagPropsA } from 'antd'

type TagProps = TagPropsA & {
    //
}

export const Tag = (props: TagProps) => {
    return <TagA {...props}/>
}