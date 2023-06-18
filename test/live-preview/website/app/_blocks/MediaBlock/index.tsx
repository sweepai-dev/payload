import React from 'react'

import classes from './index.module.scss'
import { Page } from '../../payload-types'
import { RichText } from '../../_components/RichText'
import { Media } from '../../_components/Media'

type Props = Extract<Page['layout'], { blockType: 'media' }>

export const MediaBlock: React.FC<Props & {
  attributes: React.HTMLAttributes<HTMLDivElement>
}> = ({ media, caption, position, attributes = {}}) => {

  if (typeof media === 'string') return null

  return (
    <div
      {...attributes}
      className={classes.mediaBlock}
    >
      <Media
        resource={media}
        className={[classes.mediaResource, classes[`position--${position}`]]
          .filter(Boolean)
          .join(' ')}
      />
      {caption && (
        <div className={classes.caption}>
          <small>
            <RichText content={caption} />
          </small>
        </div>
      )}
    </div>
  )
}
