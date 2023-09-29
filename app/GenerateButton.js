'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './GenerateButton.module.scss';

export default function GenerateButton() {
  const [color, setColor] = useState();
  const router = useRouter();

  useEffect(() => {
    // WE DON'T USE document.cookie!!!
    // DON't COPY THIS!!
    const allCookies = document.cookie;
    const buttonColor = allCookies
      .split('; ')
      .find((row) => row.startsWith('buttonColor='))
      ?.split('=')[1];
    // -------------------

    setColor(
      buttonColor || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    );
  }, []);

  return (
    <div>
      <button
        className={style.generateButton}
        style={{ backgroundColor: color }}
        onClick={() => {
          const newColor = `#${Math.floor(Math.random() * 16777215).toString(
            16,
          )}`;
          // WE DON'T USE document.cookie!!!
          // DON't COPY THIS!!
          document.cookie = `buttonColor=${newColor}`;
          // -------------------
          setColor(newColor);
          router.refresh();
        }}
      >
        Generate
      </button>
    </div>
  );
}
