import React from 'react';

const InfoError = () => {
  return (
    <ul className="markerError">
      {/*에러가 나면 markerError에 on, markerTitle, markerPoint, makerPointBackground에 red가 생겨야합니다.*/}
      <svg className="errorIcon" width="50" height="44" viewBox="0 0 50 44">
        <g transform="translate(-1352 -596)">
          <g transform="translate(1352 596)" fill="#fff">
            <path
              d="M 44.84502792358398 42.50000381469727 L 5.154978275299072 42.50000381469727 C 4.376448154449463 42.50000381469727 3.988988161087036 41.97864532470703 3.858538150787354 41.75448608398438 C 3.728088140487671 41.53033447265625 3.466198205947876 40.93588256835938 3.8507981300354 40.25898361206055 L 23.69580841064453 5.331744194030762 C 24.08503723144531 4.646714210510254 24.73752784729004 4.572754383087158 24.99999809265137 4.572754383087158 C 25.2624683380127 4.572754383087158 25.91495895385742 4.646714210510254 26.30417823791504 5.331744194030762 L 46.14921951293945 40.25898361206055 C 46.53380966186523 40.93588256835938 46.27191925048828 41.53032302856445 46.1414680480957 41.75448608398438 C 46.01101684570313 41.97864532470703 45.6235466003418 42.50000381469727 44.84502792358398 42.50000381469727 Z"
              stroke="none"
            />
            <path
              d="M 24.99999809265137 6.07275390625 L 25 6.072757720947266 C 25 6.072761535644531 25 6.072761535644531 24.99999809265137 6.072765350341797 L 5.154979705810547 41.00000381469727 L 44.84502792358398 41.00000381469727 L 24.99999809265137 6.07275390625 M 24.99999809265137 3.072757720947266 C 26.01668739318848 3.072757720947266 27.03337860107422 3.578750610351563 27.60836791992188 4.590732574462891 L 47.45339965820313 39.51797485351563 C 48.58970642089844 41.51790618896484 47.14522933959961 44.00000381469727 44.84502792358398 44.00000381469727 L 5.154979705810547 44.00000381469727 C 2.854766845703125 44.00000381469727 1.4102783203125 41.51790618896484 2.546607971191406 39.51797485351563 L 22.39162826538086 4.590732574462891 C 22.96661758422852 3.578750610351563 23.98330879211426 3.072757720947266 24.99999809265137 3.072757720947266 Z"
              stroke="none"
              fill="#fe626f"
            />
          </g>
          <text
            transform="translate(1380.5 631.576)"
            fill="#fe626f"
            fontSize="20"
            fontFamily="NotoSansCJKkr-Bold, Noto Sans CJK KR"
            fontWeight="700"
            letterSpacing="-0.041em"
          >
            <tspan x="-7.4" y="0">
              !
            </tspan>
          </text>
        </g>
      </svg>
      <span>ERROR !</span>
    </ul>
  );
};

export default InfoError;
