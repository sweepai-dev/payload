'use client'

import React, { useEffect, useRef } from 'react';
import { Page } from './payload-types';

type CustomEvent = {
  data?: {
    payloadLivePreviewData?: any
  }
}

export const useLivePreview = (): [
  page: Page | null
] => {
  const hasAttachedEvent = useRef(false)
  const [page, setPage] = React.useState<Page | null>(null)

  useEffect(() => {
    if (!hasAttachedEvent.current) {
      hasAttachedEvent.current = true
      window.addEventListener("message", ((event: CustomEvent) => {
        if (event?.data?.payloadLivePreviewData) {
          console.log('Payload live preview data received', event?.data?.payloadLivePreviewData)
          setPage(event?.data?.payloadLivePreviewData);
        }
      }) as EventListener)
    }
  }, [])

  return [
    page
  ]
}
