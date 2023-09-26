'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import style from './GenerateButton.module.scss';

export default function GenerateButton() {
  const [color, setColor] = useState('#123fee');
  const router = useRouter();

  return (
    <div>
      <button
        className={style.generateButton}
        style={{ backgroundColor: color }}
        onClick={() => {
          setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
          router.refresh();
        }}
      >
        Generate
      </button>
    </div>
  );
}
