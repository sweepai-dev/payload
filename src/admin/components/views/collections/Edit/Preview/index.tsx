import React, { useCallback, useEffect, useRef } from 'react';
import { useDocumentInfo } from '../../../../utilities/DocumentInfo';
import { Fields } from '../../../../forms/Form/types';
import { useAllFormFields } from '../../../../forms/Form/context';

const dispatchIframeMessage = async (documentInfo, fields: Fields, iframe: HTMLIFrameElement) => {
  const { global, collection } = documentInfo;
  const fieldsConfig = global?.fields || collection?.fields || [];
  const doc = {}; // TODO: format doc from `fields` and `fieldsConfig`

  try {
    console.log('Posting live preview data'); // eslint-disable-line no-console
    iframe.contentWindow?.postMessage({ payloadLivePreviewData: doc }, '*');
  } catch (e) {
    console.error(e);
  }
};

const PreviewComponent: React.FC<{
  livePreviewURL: string;
}> = ({
  livePreviewURL,
}) => {
  const documentInfo = useDocumentInfo();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fields] = useAllFormFields();

  const handleIframeLoaded = useCallback(() => {
    setTimeout(() => {
      dispatchIframeMessage(documentInfo, fields, iframeRef.current);
    }, 100);
  }, [documentInfo, fields]);

  useEffect(() => {
    if (!iframeRef.current) return;
    setTimeout(() => {
      dispatchIframeMessage(documentInfo, fields, iframeRef.current);
    }, 100);
  }, [fields, documentInfo]);

  return (
    <iframe
      src={livePreviewURL}
      title="Payload live preview"
      onLoad={handleIframeLoaded}
      ref={iframeRef}
    />
  );
};

export const Preview: React.FC = () => {
  const documentInfo = useDocumentInfo();
  const livePreviewURL = documentInfo?.collection?.admin?.livePreviewURL || documentInfo?.global?.admin?.livePreviewURL;
  if (!livePreviewURL) return null;
  return <PreviewComponent livePreviewURL={livePreviewURL} />;
};
