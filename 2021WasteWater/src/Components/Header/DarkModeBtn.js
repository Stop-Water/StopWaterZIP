import React from 'react';
import useDarkMode from 'use-dark-mode';

const DarkModeBtn = () => {
  /*   const isDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: Dark)').matches; */
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  return (
    <div className="modeSliderWrap">
      <svg
        className="darkIcon"
        viewBox="0 0 18.296 20.472"
        cursor="pointer"
        onClick={darkMode.enable}
      >
        <path
          d="M37.447,20.472a10.216,10.216,0,0,0,7.951-3.79.48.48,0,0,0-.462-.774A8.019,8.019,0,0,1,39.468,1.06a.48.48,0,0,0-.15-.889,10.237,10.237,0,1,0-1.87,20.3Z"
          transform="translate(-27.211)"
        />
      </svg>
      <div className="modeSlider">
        <input
          type="checkbox"
          id="mode"
          onChange={darkMode.toggle}
          checked={!darkMode.value}
        ></input>
        <label htmlFor="mode" className="MSlider">
          <span className="sliderCircle"></span>
        </label>
      </div>
      <svg
        className="lightIcon"
        viewBox="0 0 21.999 22"
        cursor="pointer"
        onClick={darkMode.disable}
      >
        <path d="M11,6.875A4.125,4.125,0,1,0,15.125,11,4.132,4.132,0,0,0,11,6.875Zm10.587,3.459L17.518,8.3l1.439-4.314a.743.743,0,0,0-.941-.941L13.7,4.486,11.666.412a.744.744,0,0,0-1.332,0L8.3,4.482,3.983,3.042a.743.743,0,0,0-.941.941L4.482,8.3.412,10.334a.744.744,0,0,0,0,1.332L4.482,13.7,3.042,18.017a.743.743,0,0,0,.941.941L8.3,17.518l2.032,4.069a.744.744,0,0,0,1.332,0l2.032-4.069,4.314,1.439a.743.743,0,0,0,.941-.941L17.51,13.7l4.069-2.032a.745.745,0,0,0,.009-1.336Zm-6.7,4.555a5.5,5.5,0,1,1,0-7.777A5.506,5.506,0,0,1,14.889,14.889Z" />
      </svg>
    </div>
  );
};

export default DarkModeBtn;
