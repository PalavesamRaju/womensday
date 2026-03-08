import { useState, useEffect, useCallback } from "react";

const GRID = 4;
const TOTAL = GRID * GRID;
const IMG = "/WhatsApp Image 2026-03-05 at 7.50.14 AM.jpeg";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const blankIdx = a.indexOf(TOTAL - 1);
  const blankRow = Math.floor(blankIdx / GRID);
  let inv = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] !== TOTAL - 1 && a[j] !== TOTAL - 1 && a[i] > a[j]) inv++;
    }
  }
  const solvable =
    GRID % 2 === 1 ? inv % 2 === 0 : (blankRow % 2 === 0) === (inv % 2 === 1);
  if (!solvable) {
    if (a[0] !== TOTAL - 1 && a[1] !== TOTAL - 1) [a[0], a[1]] = [a[1], a[0]];
    else [a[TOTAL - 2], a[TOTAL - 3]] = [a[TOTAL - 3], a[TOTAL - 2]];
  }
  return a;
}

const initTiles = () => Array.from({ length: TOTAL }, (_, i) => i);

export default function App() {
  const [tiles, setTiles] = useState(() => shuffle(initTiles()));
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [size, setSize] = useState(320);

  useEffect(() => {
    const update = () => setSize(Math.min(window.innerWidth - 180, 340));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tileSize = size / GRID;
  const checkWin = useCallback((t) => t.every((v, i) => v === i), []);

  const handleClick = (idx) => {
    if (won) return;
    const blankIdx = tiles.indexOf(TOTAL - 1);
    const br = Math.floor(blankIdx / GRID), bc = blankIdx % GRID;
    const cr = Math.floor(idx / GRID), cc = idx % GRID;
    if ((Math.abs(br - cr) === 1 && bc === cc) || (Math.abs(bc - cc) === 1 && br === cr)) {
      const next = [...tiles];
      [next[blankIdx], next[idx]] = [next[idx], next[blankIdx]];
      setTiles(next);
      setMoves((m) => m + 1);
      if (checkWin(next)) setWon(true);
    }
  };

  const reset = () => {
    setTiles(shuffle(initTiles()));
    setMoves(0);
    setWon(false);
  };

  const thumbSize = 110;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a0030 0%, #2d0050 30%, #1a0035 60%, #0d001a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Floating symbols */}
      {["♀","✿","❀","✦","⚘","♀","✿","❀","✦","⚘","♀","✿","❀","✦","⚘","♀","✿","❀","✦","⚘"].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 41 + 7) % 100}%`,
          top: `${(i * 67 + 13) % 100}%`,
          fontSize: `${10 + (i % 4) * 7}px`,
          opacity: 0.06 + (i % 6) * 0.02,
          color: ["#ff69b4","#da70d6","#ba55d3","#9370db","#ff85c8"][i % 5],
          animation: `floatSym ${7 + (i % 6) * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          pointerEvents: "none",
          userSelect: "none",
        }}>{s}</div>
      ))}

      {/* Glowing orbs */}
      <div style={{ position:"absolute", top:"10%", left:"15%", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(180,0,255,0.12), transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"10%", width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,105,180,0.1), transparent 70%)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"20px", zIndex:1 }}>
        <div style={{ fontSize:"13px", letterSpacing:"4px", color:"#da70d6", textTransform:"uppercase", marginBottom:"6px", opacity:0.8 }}>
          ♀ Happy Women's Day ♀
        </div>
        <h1 style={{
          fontSize: "clamp(20px, 4vw, 30px)",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #ff85c8, #da70d6, #9b59b6, #ff69b4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: 0,
          letterSpacing: "2px",
        }}>
          Solve to Reveal Your Surprise 🌸
        </h1>
        <p style={{ color:"#9b6bb5", margin:"6px 0 0", fontSize:"13px", letterSpacing:"1px" }}>
          {moves} moves
        </p>
      </div>

      {/* Main layout: thumbnail left + puzzle + thumbnail right */}
      <div style={{ display:"flex", alignItems:"center", gap:"16px", zIndex:1 }}>

      

        {/* Puzzle board */}
        <div style={{
          position:"relative",
          width: size,
          height: size,
          borderRadius:"16px",
          overflow:"hidden",
          boxShadow: won
            ? "0 0 60px rgba(255,105,180,0.6), 0 0 120px rgba(180,0,255,0.3)"
            : "0 0 40px rgba(155,91,180,0.3), inset 0 0 0 2px rgba(218,112,214,0.25)",
          transition: "box-shadow 0.8s ease",
          flexShrink: 0,
        }}>
          {/* Ghost bg */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:`url("${IMG}")`,
            backgroundSize:"cover", backgroundPosition:"center",
            opacity: 0.05, zIndex:0,
          }} />

          {tiles.map((tileVal, idx) => {
            const isBlank = tileVal === TOTAL - 1;
            const tileRow = Math.floor(tileVal / GRID);
            const tileCol = tileVal % GRID;
            const posRow = Math.floor(idx / GRID);
            const posCol = idx % GRID;

            return (
              <div
                key={tileVal}
                onClick={() => handleClick(idx)}
                style={{
                  position:"absolute",
                  left: posCol * tileSize,
                  top: posRow * tileSize,
                  width: tileSize - 2,
                  height: tileSize - 2,
                  margin:"1px",
                  cursor: isBlank ? "default" : "pointer",
                  borderRadius:"5px",
                  overflow:"hidden",
                  transition:"left 0.15s ease, top 0.15s ease",
                  zIndex: isBlank ? 0 : 1,
                  boxShadow: isBlank ? "none" : "inset 0 0 0 1px rgba(218,112,214,0.25), 0 2px 6px rgba(0,0,0,0.5)",
                  opacity: isBlank ? 0 : 1,
                }}
              >
                {!isBlank && (
                  <div style={{
                    width:"100%", height:"100%",
                    backgroundImage:`url("${IMG}")`,
                    backgroundSize:`${size}px ${size}px`,
                    backgroundPosition:`-${tileCol * tileSize}px -${tileRow * tileSize}px`,
                  }} />
                )}
              </div>
            );
          })}

          {/* Win overlay — just the full image */}
          {won && (
            <div style={{
              position:"absolute", inset:0, zIndex:10,
              animation:"revealIn 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}>
              <img src={IMG} alt="surprise" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              {/* Shimmer overlay */}
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,105,180,0.1) 100%)",
                animation:"shimmer 2s ease-in-out infinite alternate",
              }} />
            </div>
          )}
        </div>

      
      </div>

      {/* Win message below */}
      {won && (
        <div style={{
          marginTop:"20px", textAlign:"center", zIndex:1,
          animation:"fadeUp 0.6s ease forwards",
        }}>
          <p style={{
            fontSize:"clamp(18px,4vw,26px)", fontWeight:"bold",
            background:"linear-gradient(135deg, #ff85c8, #da70d6, #9b59b6)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            margin:"0 0 4px",
          }}>Happy Women's Day! 🌺</p>
          <p style={{ color:"#9b6bb5", fontSize:"13px", margin:"0 0 16px" }}>
            Solved in {moves} moves ✨
          </p>
        </div>
      )}

      {/* Shuffle button */}
      <button onClick={reset} style={{
        marginTop: won ? "0" : "22px",
        padding:"11px 32px",
        background:"linear-gradient(135deg, #9b59b6, #6c3483)",
        border:"1px solid rgba(218,112,214,0.35)",
        borderRadius:"50px",
        color:"#f0d6ff",
        fontSize:"14px",
        cursor:"pointer",
        fontFamily:"Georgia, serif",
        letterSpacing:"1px",
        boxShadow:"0 4px 20px rgba(155,89,182,0.4)",
        transition:"transform 0.15s",
        zIndex:1,
      }}
        onMouseEnter={e => e.target.style.transform="scale(1.05)"}
        onMouseLeave={e => e.target.style.transform="scale(1)"}
      >
        🔀 Shuffle
      </button>

      <style>{`
        @keyframes floatSym {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(10deg); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); opacity:0.8; }
          50% { transform: scale(1.15); opacity:1; }
        }
        @keyframes revealIn {
          from { opacity:0; transform:scale(0.92); }
          to { opacity:1; transform:scale(1); }
        }
        @keyframes shimmer {
          from { opacity:0.3; }
          to { opacity:0.7; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}