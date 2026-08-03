import { useState } from "react";
import type { Photo } from "../../content/photos";

interface Props {
  photos: Photo[];
  base: string;
}

const COMING_SOON_COUNT = 3;

export default function Slider({ photos, base }: Props) {
  const [current, setCurrent] = useState(0);
  const single = photos.length === 1;

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1));

  return (
    <div className="slider-wrap">
      {/* ── Carousel ── */}
      <div className="slider">
        <div className="slider-track">
          {photos.map((photo, i) => (
            <div key={i} className={`slide ${i === current ? "active" : i === (current - 1 + photos.length) % photos.length ? "prev" : i === (current + 1) % photos.length ? "next" : ""}`}>
              <div className="photo-frame">
                <img src={`${base}${photo.src}`} alt={photo.caption} loading="lazy" />
                <div className="photo-overlay">
                  <p className="photo-caption">{photo.caption}</p>
                  <span className="photo-date">{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!single && (
          <>
            <button className="arrow arrow-left" onClick={prev} aria-label="Anterior">‹</button>
            <button className="arrow arrow-right" onClick={next} aria-label="Siguiente">›</button>
          </>
        )}

        {!single && (
          <div className="dots">
            {photos.map((_, i) => (
              <button key={i} className={`dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} aria-label={`Foto ${i + 1}`} />
            ))}
          </div>
        )}
      </div>

      {/* ── Coming soon slots ── */}
      {photos.length < 3 && <div className="incoming-row">
        <p className="incoming-label">✦ Próximos recuerdos ✦</p>
        <div className="incoming-slots">
          {Array.from({ length: COMING_SOON_COUNT }).map((_, i) => (
            <div key={i} className="incoming-slot">
              <div className="slot-inner">
                <span className="slot-icon">📷</span>
                <span className="slot-text">Próximamente</span>
              </div>
            </div>
          ))}
        </div>
      </div>}

      <style>{`
        .slider-wrap {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        /* ── Slider ── */
        .slider {
          position: relative;
          width: 100%;
          max-width: 680px;
        }

        .slider-track {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide {
          position: absolute;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          pointer-events: none;
        }

        .slide.active {
          opacity: 1;
          transform: scale(1) translateX(0);
          z-index: 3;
          pointer-events: auto;
        }

        .slide.prev {
          opacity: 0.35;
          transform: scale(0.82) translateX(-55%);
          z-index: 2;
        }

        .slide.next {
          opacity: 0.35;
          transform: scale(0.82) translateX(55%);
          z-index: 2;
        }

        .photo-frame {
          position: relative;
          width: 320px;
          height: 380px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 0 0 3px rgba(245,200,66,0.3),
            0 20px 60px rgba(0,0,0,0.6);
          background: #1a0f2e;
        }

        .photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .photo-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.5rem 1.2rem 1rem;
          background: linear-gradient(to top, rgba(10,4,20,0.92) 0%, transparent 100%);
          text-align: center;
        }

        .photo-caption {
          font-family: 'Lora', serif;
          font-style: italic;
          color: #fde68a;
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }

        .photo-date {
          font-family: 'Lora', serif;
          font-size: 0.75rem;
          color: #c9a84c;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          background: rgba(245,200,66,0.12);
          border: 1px solid rgba(245,200,66,0.3);
          color: #fde68a;
          width: 44px; height: 44px;
          border-radius: 50%;
          font-size: 1.8rem;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s, transform 0.2s;
          display: flex; align-items: center; justify-content: center;
        }

        .arrow:hover {
          background: rgba(245,200,66,0.25);
          transform: translateY(-50%) scale(1.1);
        }

        .arrow-left  { left: -22px; }
        .arrow-right { right: -22px; }

        .dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(245,200,66,0.3);
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          padding: 0;
        }

        .dot.active {
          background: #f5c842;
          transform: scale(1.3);
        }

        /* ── Incoming ── */
        .incoming-row {
          width: 100%;
          text-align: center;
        }

        .incoming-label {
          font-family: 'Lora', serif;
          font-size: 0.78rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c9a84c;
          opacity: 0.6;
          margin-bottom: 1.2rem;
        }

        .incoming-slots {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .incoming-slot {
          width: 120px;
          height: 152px;
          border-radius: 10px;
          border: 1px dashed rgba(245,200,66,0.25);
          background: rgba(26,15,46,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .incoming-slot::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(245,200,66,0.03) 0%, transparent 60%);
        }

        .slot-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .slot-icon {
          font-size: 1.4rem;
          opacity: 0.3;
          filter: grayscale(1);
        }

        .slot-text {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 0.72rem;
          color: #c9a84c;
          opacity: 0.4;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
