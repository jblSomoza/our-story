import { useState, useEffect } from "react";

const START_DATE = new Date("2026-05-06T19:00:00Z"); // 6 mayo 2026, 7:00 PM UTC

function getElapsed() {
  const now  = new Date();
  const diff = Math.max(0, now.getTime() - START_DATE.getTime());

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours   = Math.floor(totalSeconds / 3600) % 24;

  // Años/meses/días usando solo fecha UTC (sin hora) para que el día aniversario
  // muestre el valor completo desde las 00:00 de ese día
  const nowDay   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const startDay = new Date(Date.UTC(START_DATE.getUTCFullYear(), START_DATE.getUTCMonth(), START_DATE.getUTCDate()));

  let years  = nowDay.getUTCFullYear() - startDay.getUTCFullYear();
  let months = nowDay.getUTCMonth()    - startDay.getUTCMonth();
  let days   = nowDay.getUTCDate()     - startDay.getUTCDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(Date.UTC(nowDay.getUTCFullYear(), nowDay.getUTCMonth(), 0));
    days += prevMonth.getUTCDate();
  }
  if (months < 0) {
    years  -= 1;
    months += 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function Counter() {
  const [elapsed, setElapsed] = useState(getElapsed);

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: elapsed.years,  label: elapsed.years  === 1 ? "Año"  : "Años"  },
    { value: elapsed.months, label: elapsed.months === 1 ? "Mes"  : "Meses" },
    { value: elapsed.days,   label: elapsed.days   === 1 ? "Día"  : "Días"  },
  ];

  return (
    <div className="counter">
      <div className="counter-grid">
        {units.map(({ value, label }) => (
          <div key={label} className="unit">
            <div className="unit-value">
              {String(value).padStart(2, "0")}
            </div>
            <div className="unit-label">{label}</div>
          </div>
        ))}
      </div>

      <p className="counter-since">
        desde el <span>6 de mayo de 2026</span>
      </p>

      <style>{`
        .counter {
          text-align: center;
        }

        .counter-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.8rem;
        }

        .unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          min-width: 80px;
        }

        .unit-value {
          font-family: 'Cinzel Decorative', cursive;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #fde68a;
          text-shadow:
            0 0 20px rgba(253,230,138,0.45),
            0 0 50px rgba(253,200,66,0.2);
          background: rgba(26,15,46,0.6);
          border: 1px solid rgba(245,200,66,0.2);
          border-radius: 10px;
          width: 90px;
          padding: 0.6rem 0;
          line-height: 1;
          transition: color 0.3s;
        }

        .unit-label {
          font-family: 'Lora', serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a84c;
          opacity: 0.7;
        }

        .counter-since {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 0.9rem;
          color: #b09060;
          opacity: 0.75;
        }

        .counter-since span {
          color: #c9a84c;
          opacity: 1;
        }

        @media (max-width: 520px) {
          .unit-value {
            width: 72px;
            font-size: 1.8rem;
          }

          .unit {
            min-width: 64px;
          }
        }
      `}</style>
    </div>
  );
}
