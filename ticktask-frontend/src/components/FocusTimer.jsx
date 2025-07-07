import { useEffect, useState, useRef } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FocusTimer = () => {
  const focusDuration = 25 * 60;
  const [secondsLeft, setSecondsLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            const audio = new Audio('/ringtone-126505.mp3');
            audio.play();

            alert('🎉 Фокус-сессия завершена!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const percentage = (secondsLeft / focusDuration) * 100;

  const formatTime = (s) => {
    const min = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div style={{ width: '80px', height: '80px' }}>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: '#7C3AED',
            trailColor: '#E5E7EB',
          })}
        >
          <div className="text-xs font-semibold text-purple-800">
            {formatTime(secondsLeft)}
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className="mt-4 flex gap-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            ▶ Старт
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            ⏸ Пауза
          </button>
        )}

        <button
          onClick={() => {
            setSecondsLeft(focusDuration);
            setIsRunning(false);
          }}
          className="bg-gray-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          🔁 Сброс
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
