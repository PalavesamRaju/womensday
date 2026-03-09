import { useState, useEffect, useCallback } from "react";

const GRID = 6;
const TOTAL = GRID * GRID;
const IMG = "/asd.jpeg";

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

function LetterPage({ onNext }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d001f 0%, #1e0038 40%, #0d0025 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", fontFamily: "'Georgia', serif",
      position: "relative", overflow: "hidden",
    }}>
      {["♀","✿","❀","✦","⚘","✾","❁","♡","❋"].map((s, i) =>
        [0,1,2].map((j) => (
          <div key={`${i}-${j}`} style={{
            position:"absolute",
            left:`${(i*29+j*43+5)%100}%`,
            top:`${(i*53+j*31+11)%100}%`,
            fontSize:`${8+(i%4)*6}px`,
            opacity:0.05+(i%4)*0.015,
            color:["#ff69b4","#da70d6","#ba55d3","#c084fc","#f0abfc","#fb7185","#f472b6"][i%7],
            animation:`floatSym ${8+(i%5)*3}s ease-in-out infinite`,
            animationDelay:`${(i*j*0.5)%7}s`,
            pointerEvents:"none", userSelect:"none",
          }}>{s}</div>
        ))
      )}

      <div style={{ position:"absolute", top:"5%", left:"10%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(192,0,255,0.1), transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"8%", right:"8%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,105,180,0.1), transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(168,85,247,0.04), transparent 70%)", pointerEvents:"none" }} />

      <div style={{
        maxWidth: 560, width:"100%", zIndex:1,
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(192,132,252,0.2)",
        borderRadius:"24px", padding:"40px 36px",
        boxShadow:"0 0 60px rgba(168,85,247,0.15), 0 0 120px rgba(192,0,255,0.08)",
        backdropFilter:"blur(12px)",
        animation:"fadeInUp 0.8s ease forwards",
      }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <div style={{
            display:"inline-block", fontSize:"11px", letterSpacing:"5px",
            textTransform:"uppercase", color:"#c084fc",
            border:"1px solid rgba(192,132,252,0.3)", padding:"6px 20px",
            borderRadius:"50px", background:"rgba(192,132,252,0.05)", marginBottom:"18px",
          }}>
            ♀ &nbsp; Happy Women's Day 2026 &nbsp; ♀
          </div>
          <div style={{ fontSize:"48px", marginBottom:"8px", animation:"pulse 3s ease-in-out infinite" }}>💌</div>
          <h1 style={{
            fontSize:"clamp(22px,5vw,32px)", fontWeight:"bold",
            background:"linear-gradient(135deg, #f9a8d4, #e879f9, #a855f7, #ec4899)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            margin:0, letterSpacing:"1px", lineHeight:1.3,
          }}>A Letter From My Heart</h1>
        </div>

        <div style={{ width:"60px", height:"2px", background:"linear-gradient(to right, transparent, #a855f7, transparent)", margin:"0 auto 28px" }} />

        {/* Letter */}
        <div style={{ color:"#d8b4fe", fontSize:"15px", lineHeight:"2.1", letterSpacing:"0.3px" }}>

          <p style={{ margin:"0 0 18px" }}>
            My Dearest <span style={{ color:"#f0abfc", fontStyle:"italic", fontWeight:"bold" }}>Love</span>, 💜
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            There are moments I look at you and forget how to breathe. Not because
            something is wrong — but because everything feels so <span style={{ color:"#f9a8d4", fontStyle:"italic" }}>perfectly right</span>.
            The way you laugh, the way your eyes light up when you talk about something
            you love — I could watch you forever and never get enough. 🌸
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            You are not just beautiful on the outside — though you absolutely are,
            breathtakingly so — but your soul, your heart, the gentle way you love...
            it undoes me completely. Every single time. You are the kind of woman
            poems are written about, the kind of warmth people spend their whole lives
            searching for. And somehow, <span style={{ color:"#f0abfc", fontStyle:"italic" }}>I get to call you mine</span>. 💕
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            On this special day, I want to remind you how truly extraordinary you are.
            Your strength is quiet but unshakeable. Your kindness lights up every room
            you walk into. Your smile — God, your smile — it changes everything.
            It changes <span style={{ color:"#f9a8d4", fontStyle:"italic" }}>me</span>. 💜
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            You carry so much with such grace. You give so freely, love so deeply,
            and rise so beautifully after every storm. I have seen you at your most
            tired and your most radiant — and I love you equally, completely, in every
            version of yourself. The world is softer, warmer, and more alive —
            simply because <span style={{ color:"#f0abfc", fontStyle:"italic" }}>you</span> are in it. 🌺
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            I think about the little things — the way you say my name, the way you
            rest your head, the way you care so deeply for everyone around you.
            Those little things? They are my <span style={{ color:"#f9a8d4", fontStyle:"italic" }}>favorite things in the entire world</span>.
            You are my favorite thing in the entire world. ✨
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            Today is yours. Every day should be. But today especially —
            celebrate yourself, celebrate how far you've come, how much you've grown,
            how fiercely you've loved. Know that you are deeply
            <span style={{ color:"#f9a8d4" }}> seen</span>,
            <span style={{ color:"#e879f9" }}> cherished</span>, and
            <span style={{ color:"#c084fc" }}> loved</span> —
            not just today, but every ordinary Tuesday, every hard day, every
            moment in between. 🌙
          </p>

          <p style={{ margin:"0 0 18px", color:"#c4b5fd" }}>
            If I could give you one thing today, it would be the ability to see yourself
            the way I see you — because then you would never doubt for a single second
            just how <span style={{ color:"#f0abfc", fontStyle:"italic" }}>magnificent</span> you truly are. 💫
          </p>

          <div style={{ borderLeft:"2px solid rgba(192,132,252,0.3)", paddingLeft:"16px", margin:"24px 0", fontStyle:"italic" }}>
            <p style={{ margin:0, color:"#e9d5ff", fontSize:"14px", lineHeight:"2" }}>
              "You are every love song I have ever felt but never had the words for.
              You are the reason I believe in something beautiful." 🌹
            </p>
          </div>

          <p style={{ margin:"0 0 6px", color:"#d8b4fe", fontStyle:"italic" }}>
            With every piece of my heart,
          </p>
          <p style={{ margin:"0 0 6px", color:"#f0abfc", fontWeight:"bold", fontSize:"17px" }}>
            Always, completely, yours 💕
          </p>
          <p style={{ margin:"4px 0 0", fontSize:"20px" }}>🌸💜✨</p>
        </div>

        <div style={{ width:"60px", height:"2px", background:"linear-gradient(to right, transparent, #ec4899, transparent)", margin:"28px auto 28px" }} />

        <div style={{ textAlign:"center" }}>
          <p style={{ color:"#9d74c0", fontSize:"13px", margin:"0 0 16px", letterSpacing:"1px" }}>
            A special surprise awaits you inside ✨
          </p>
          <button onClick={onNext} style={{
            padding:"14px 40px",
            background:"linear-gradient(135deg, #9333ea, #6d28d9)",
            border:"1px solid rgba(192,132,252,0.4)", borderRadius:"50px",
            color:"#f3e8ff", fontSize:"15px", cursor:"pointer",
            fontFamily:"Georgia, serif", letterSpacing:"1.5px",
            boxShadow:"0 4px 24px rgba(147,51,234,0.5)",
            transition:"transform 0.2s, box-shadow 0.2s",
            display:"inline-flex", alignItems:"center", gap:"10px",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.06)"; e.currentTarget.style.boxShadow="0 6px 32px rgba(168,85,247,0.65)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(147,51,234,0.5)"; }}
          >
            <span>Open Your Surprise</span>
            <span style={{ fontSize:"18px" }}>🎁</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatSym {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}

function PuzzlePage({ onBack }) {
  const [tiles, setTiles] = useState(() => shuffle(initTiles()));
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [size, setSize] = useState(320);

  useEffect(() => {
    const update = () => setSize(Math.min(window.innerWidth - 48, 380));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (won) {
      const t = setTimeout(() => setShowCelebration(true), 700);
      return () => clearTimeout(t);
    }
  }, [won]);

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
    setShowCelebration(false);
  };

  const thumbSize = 90;

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg, #0d001f 0%, #1e0038 35%, #120028 65%, #080010 100%)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"24px 16px", fontFamily:"'Georgia', serif",
      position:"relative", overflow:"hidden",
    }}>

      <button onClick={onBack} style={{
        position:"absolute", top:"20px", left:"20px", zIndex:10,
        display:"flex", alignItems:"center", gap:"7px",
        padding:"9px 20px",
        background:"rgba(255,255,255,0.04)",
        border:"1px solid rgba(192,132,252,0.3)",
        borderRadius:"50px", color:"#d8b4fe", fontSize:"13px",
        cursor:"pointer", fontFamily:"Georgia, serif", letterSpacing:"1px",
        backdropFilter:"blur(8px)",
        boxShadow:"0 2px 16px rgba(126,34,206,0.2)",
        transition:"transform 0.2s, background 0.2s, box-shadow 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.background="rgba(147,51,234,0.15)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(168,85,247,0.35)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(126,34,206,0.2)"; }}
      >
        <span style={{ fontSize:"16px" }}>←</span>
        <span>Back to Letter</span>
      </button>

      {["♀","✿","❀","✦","⚘","✾","❁","✽"].map((s, i) =>
        [0,1,2].map((_, j) => (
          <div key={`${i}-${j}`} style={{
            position:"absolute",
            left:`${(i*29+j*41+7)%100}%`,
            top:`${(i*53+j*31+13)%100}%`,
            fontSize:`${8+(i%4)*6}px`,
            opacity:0.04+(i%5)*0.015,
            color:["#ff69b4","#da70d6","#ba55d3","#c084fc","#f0abfc"][i%5],
            animation:`floatSym2 ${8+(i%5)*3}s ease-in-out infinite`,
            animationDelay:`${(i*j*0.4)%6}s`,
            pointerEvents:"none", userSelect:"none",
          }}>{s}</div>
        ))
      )}
      <div style={{ position:"absolute", top:"-10%", left:"5%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(192,0,255,0.08), transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"5%", right:"5%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,105,180,0.07), transparent 70%)", pointerEvents:"none" }} />

      <div style={{ textAlign:"center", marginBottom:"18px", zIndex:1 }}>
        <div style={{ fontSize:"11px", letterSpacing:"5px", color:"#c084fc", textTransform:"uppercase", marginBottom:"8px", opacity:0.85 }}>
          ♀ &nbsp; Happy Women's Day 2026 &nbsp; ♀
        </div>
        <h1 style={{
          fontSize:"clamp(17px,4vw,26px)", fontWeight:"bold",
          background:"linear-gradient(135deg, #f9a8d4, #e879f9, #a855f7, #ec4899)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          margin:0, letterSpacing:"1.5px",
        }}>
          {won ? "🌺 Your Surprise is Revealed! 🌺" : "Solve the Puzzle to Reveal 🌸"}
        </h1>
        {!won && (
          <p style={{ color:"#7c3aaa", margin:"6px 0 0", fontSize:"12px", letterSpacing:"1px" }}>
            {moves} moves
          </p>
        )}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"14px", zIndex:1, flexWrap:"wrap", justifyContent:"center" }}>

      

        <div style={{
          position:"relative", width:size, height:size,
          borderRadius:"16px", overflow:"hidden", flexShrink:0,
          boxShadow: won
            ? "0 0 70px rgba(240,171,252,0.5), 0 0 140px rgba(192,0,255,0.25), inset 0 0 0 3px rgba(240,171,252,0.5)"
            : "0 0 40px rgba(120,0,200,0.3), inset 0 0 0 2px rgba(168,85,247,0.2)",
          transition:"box-shadow 0.8s ease",
        }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`url("${IMG}")`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.04, zIndex:0 }} />

          {tiles.map((tileVal, idx) => {
            const isBlank = tileVal === TOTAL - 1;
            const tileRow = Math.floor(tileVal / GRID);
            const tileCol = tileVal % GRID;
            const posRow = Math.floor(idx / GRID);
            const posCol = idx % GRID;
            return (
              <div key={tileVal} onClick={() => handleClick(idx)} style={{
                position:"absolute",
                left: posCol * tileSize, top: posRow * tileSize,
                width: tileSize - 2, height: tileSize - 2, margin:"1px",
                cursor: isBlank ? "default" : "pointer",
                borderRadius:"5px", overflow:"hidden",
                transition:"left 0.15s ease, top 0.15s ease, opacity 0.4s",
                zIndex: isBlank ? 0 : 1,
                boxShadow: isBlank ? "none" : "inset 0 0 0 1px rgba(192,132,252,0.2), 0 2px 6px rgba(0,0,0,0.6)",
                opacity: won ? 0 : (isBlank ? 0 : 1),
              }}>
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

          {won && (
            <div style={{ position:"absolute", inset:0, zIndex:10, animation:"revealIn 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
              <img src={IMG} alt="revealed" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(240,171,252,0.15) 100%)", animation:"shimmer 2.5s ease-in-out infinite alternate" }} />
            </div>
          )}
        </div>

       
      </div>

      {showCelebration && (
        <div style={{ marginTop:"20px", textAlign:"center", zIndex:1, animation:"fadeUp 0.7s ease forwards" }}>
          <div style={{ fontSize:"26px", marginBottom:"6px", animation:"bounce 1.2s ease-in-out infinite" }}>🎉 🌺 💜 🌺 🎉</div>
          <p style={{
            fontSize:"clamp(16px,4vw,22px)", fontWeight:"bold",
            background:"linear-gradient(135deg, #f9a8d4, #e879f9, #a855f7)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            margin:"0 0 4px",
          }}>Happy Women's Day!</p>
          <p style={{ color:"#7c3aaa", fontSize:"13px", margin:"0 0 4px" }}>You are strong, beautiful & unstoppable 💜</p>
          <p style={{ color:"#5a2a6a", fontSize:"11px", margin:"0 0 16px", letterSpacing:"1px" }}>Solved in {moves} moves ✨</p>
        </div>
      )}

      <div style={{ display:"flex", gap:"12px", marginTop: showCelebration ? "0" : "22px", zIndex:1 }}>
        <button onClick={reset} style={{
          padding:"11px 34px",
          background:"linear-gradient(135deg, #7e22ce, #4c1d95)",
          border:"1px solid rgba(192,132,252,0.35)", borderRadius:"50px",
          color:"#e9d5ff", fontSize:"14px", cursor:"pointer",
          fontFamily:"Georgia, serif", letterSpacing:"1px",
          boxShadow:"0 4px 20px rgba(126,34,206,0.45)", transition:"transform 0.15s",
        }}
          onMouseEnter={e => e.target.style.transform="scale(1.06)"}
          onMouseLeave={e => e.target.style.transform="scale(1)"}
        >
          🔀 New Puzzle
        </button>
      </div>

      <style>{`
        @keyframes floatSym2 {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(12deg); }
        }
        @keyframes pulse2 {
          0%,100% { transform: scale(1); opacity:0.75; }
          50% { transform: scale(1.18); opacity:1; }
        }
        @keyframes revealIn {
          from { opacity:0; transform:scale(0.88) rotate(-1deg); }
          to { opacity:1; transform:scale(1) rotate(0deg); }
        }
        @keyframes shimmer {
          from { opacity:0.4; } to { opacity:0.9; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes bounce {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("letter");
  return page === "letter"
    ? <LetterPage onNext={() => setPage("puzzle")} />
    : <PuzzlePage onBack={() => setPage("letter")} />;
}