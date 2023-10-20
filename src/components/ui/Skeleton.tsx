import { Skeleton as SkeletonA, SkeletonProps as SkeletonPropsA } from 'antd';
import { AvatarProps } from 'antd/es/skeleton/Avatar';
import { SkeletonButtonProps } from 'antd/es/skeleton/Button';
import { SkeletonImageProps } from 'antd/es/skeleton/Image';
import { SkeletonInputProps } from 'antd/es/skeleton/Input';

type SkeletonObject = {
  (props: SkeletonPropsA): JSX.Element
  Avatar: React.FC<AvatarProps>
  Button: React.FC<SkeletonButtonProps>
  Input: React.FC<SkeletonInputProps>
  Image: React.FC<SkeletonImageProps>
}

export const Skeleton: SkeletonObject = (props) => {
  return <SkeletonA {...props}/>
}

Skeleton.Avatar = SkeletonA.Avatar
Skeleton.Button = SkeletonA.Button
Skeleton.Input = SkeletonA.Input
Skeleton.Image = SkeletonA.Image