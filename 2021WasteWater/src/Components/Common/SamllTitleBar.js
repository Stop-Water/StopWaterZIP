import React from 'react';

const ICON_INFO = {
  modify: (
    <svg className="modifyIcon" viewBox="0 0 19.363 20.541">
      <path
        id="pen-solid"
        d="M10.985,3.748l4.841,5.136L5.313,20.037,1,20.542a.936.936,0,0,1-1-1.064L.475,14.9Zm7.836-.765L16.547.572a1.743,1.743,0,0,0-2.568,0L11.841,2.84l4.841,5.136,2.139-2.269a2.011,2.011,0,0,0,0-2.724Z"
        transform="translate(0.011 -0.008)"
      />
    </svg>
  ),
  save: (
    <svg className="saveIcon" viewBox="0 0 21.259 21.259">
      <path
        id="save-solid"
        d="M20.592,36.648l-3.98-3.98A2.278,2.278,0,0,0,15,32H2.278A2.278,2.278,0,0,0,0,34.278v16.7a2.278,2.278,0,0,0,2.278,2.278h16.7a2.278,2.278,0,0,0,2.278-2.278V38.258a2.278,2.278,0,0,0-.667-1.611ZM10.629,50.222a3.037,3.037,0,1,1,3.037-3.037A3.037,3.037,0,0,1,10.629,50.222Zm4.555-14.45v4.77a.569.569,0,0,1-.569.569H3.606a.569.569,0,0,1-.569-.569V35.606a.569.569,0,0,1,.569-.569H14.45a.569.569,0,0,1,.4.167l.165.165a.569.569,0,0,1,.167.4Z"
        transform="translate(0 -32)"
      />
    </svg>
  ),
  delete: (
    <svg className="deleteIcon" viewBox="0 0 18.141 20.732">
      <path
        d="M17.493,1.3H12.634L12.253.538A.972.972,0,0,0,11.383,0H6.754a.96.96,0,0,0-.867.539L5.507,1.3H.648A.648.648,0,0,0,0,1.943v1.3a.648.648,0,0,0,.648.648H17.493a.648.648,0,0,0,.648-.648v-1.3A.648.648,0,0,0,17.493,1.3ZM2.154,18.91a1.944,1.944,0,0,0,1.94,1.822h9.953a1.944,1.944,0,0,0,1.94-1.822l.858-13.727H1.3Z"
        transform="translate(0 0)"
      />
    </svg>
  ),
  upload: (
    <svg className="uploadIcon" viewBox="0 0 18.657 24.876">
      <path d="M10.883,6.608V0H1.166A1.163,1.163,0,0,0,0,1.166V23.71a1.163,1.163,0,0,0,1.166,1.166H17.491a1.163,1.163,0,0,0,1.166-1.166V7.774H12.049A1.17,1.17,0,0,1,10.883,6.608ZM14.05,17.1H10.883V20.99a.777.777,0,0,1-.777.777H8.551a.777.777,0,0,1-.777-.777V17.1H4.607a.777.777,0,0,1-.548-1.329l4.685-4.65a.828.828,0,0,1,1.168,0l4.685,4.65A.777.777,0,0,1,14.05,17.1Zm4.267-12L13.561.34A1.165,1.165,0,0,0,12.735,0h-.3V6.219h6.219v-.3A1.162,1.162,0,0,0,18.317,5.1Z" />
    </svg>
  ),
};

const SamllTitleBar = ({ title, icon, firstOnClick, secOnClick }) => {
  const getIcon = (iconFlag) => {
    if (iconFlag === 'modify') {
      return ICON_INFO.modify;
    } else if (iconFlag === 'save') {
      return ICON_INFO.save;
    } else if (iconFlag === 'delete') {
      return ICON_INFO.delete;
    } else if (iconFlag === 'upload') {
      return ICON_INFO.upload;
    } else return null;
  };

  return (
    <div className="smallTitle">
      <div className="resultTitle">{title}</div>
      <div className="rigthIcon">
        <span onClick={firstOnClick && firstOnClick}>
          {getIcon(icon && icon[0])}
        </span>
        <span onClick={secOnClick && secOnClick}>
          {getIcon(icon && icon[1])}
        </span>
      </div>
    </div>
  );
};

export default SamllTitleBar;
