import React from 'react'
import SubmitEditor from './SubmitEditor'
import AvatarCropperEditor from './AvatarCropperEditor'
import { EditorProps, ImageEditorType } from './types'

type PostEditorRouterProps = {
  type: ImageEditorType | undefined
} & EditorProps

export default function ImageEditor({
  type = ImageEditorType.submit,
  ...props
}: PostEditorRouterProps) {
  if (type === ImageEditorType.avatar) {
    return <AvatarCropperEditor {...props} />
  }
  return <SubmitEditor {...props} />
}
