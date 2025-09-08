import React, { useState, useEffect } from "react";

// This component injects our scoped styles into the document head.
// By prefixing everything with `.vpn-slideshow-wrapper`, we prevent conflicts.
const SlideshowStyles = () => (
  <style>{`
    @keyframes vpn-slide-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .vpn-slideshow-wrapper {
      position: relative;
      height: 85vh;
      min-height: 550px;
      max-height: 700px;
      margin: 2rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #6777ef 0%, #ffc221 100%);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #344cff;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .vpn-slideshow-wrapper .slide {
      display: none;
      width: 100%;
      height: 100%;
      background: white;
      padding: 2rem;
      text-align: center;
      animation: vpn-slide-in 0.5s ease-out;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .vpn-slideshow-wrapper .slide.active {
      background: linear-gradient(135deg, #6777ef 0%, #ffc221 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .vpn-slideshow-wrapper .slide.active .feature-grid,
    .vpn-slideshow-wrapper .slide.active .benefits
    {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .vpn-slideshow-wrapper .slide.active .feature-grid .feature-card{
      width:220px;
      max-width:220px;
      
    }



    /* Resetting MDX overrides */
    .vpn-slideshow-wrapper h1, .vpn-slideshow-wrapper h2, .vpn-slideshow-wrapper h3, .vpn-slideshow-wrapper h4, .vpn-slideshow-wrapper p {
      margin: 0;
      padding: 0;
      line-height: 1.5;
    }

    .vpn-slideshow-wrapper h1 { color: #6777ef; margin-bottom: 20px; font-size: clamp(1.8rem, 4vw, 2.5rem); }
    .vpn-slideshow-wrapper h2 { color: #ee3f60; margin-bottom: 20px; font-size: clamp(1.5rem, 3.5vw, 2rem); }
    .vpn-slideshow-wrapper h3 { color: #6777ef; margin-bottom: 15px; font-size: 1.2rem; }
    .vpn-slideshow-wrapper h4 { font-size: 1.1rem; }
    .vpn-slideshow-wrapper p { color: #555; }
    
    .vpn-slideshow-wrapper .navigation {
      width:290px;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 15px;
      align-items: center;
      background: rgba(255, 255, 255, 0.9);
      padding: 8px;
      border-radius: 30px;
      z-index: 10;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .vpn-slideshow-wrapper .nav-btn {
      background: #6777ef;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    .vpn-slideshow-wrapper .nav-btn:hover:not(:disabled) { background: #ee3f60; transform: scale(1.05); }
    .vpn-slideshow-wrapper .nav-btn:disabled { background: #ccc; cursor: not-allowed; }

    .vpn-slideshow-wrapper .indicator-dot { width: 12px; height: 12px; border-radius: 50%; background: #ccc; cursor: pointer; }
    .vpn-slideshow-wrapper .indicator-dot.active { background: #6777ef; }
    .vpn-slideshow-wrapper .slide-counter { color: #6777ef; font-weight: bold; }
    
    .vpn-slideshow-wrapper .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; width: 100%; max-width: 800px; margin-top: 20px; }
    .vpn-slideshow-wrapper .feature-card { background: linear-gradient(135deg, #6777ef, #8b9dff); color: white; padding: 20px; border-radius: 10px; }
    
    .vpn-slideshow-wrapper .architecture-diagram { display: flex; flex-direction: column; align-items: center; width: 100%; gap: 1rem; }
    @media(min-width: 768px) { .vpn-slideshow-wrapper .architecture-diagram { flex-direction: row; } }

    .vpn-slideshow-wrapper .location { flex: 1; width: 100%; min-width: 250px; padding: 20px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .vpn-slideshow-wrapper .target-country { background: linear-gradient(135deg, #6777ef, #8b9dff); color: white; }
    .vpn-slideshow-wrapper .user-country { background: linear-gradient(135deg, #ffc221, #ffdb7a); color: #344cff; }
    .vpn-slideshow-wrapper .component { background: white; border: 2px solid #ee3f60; border-radius: 8px; padding: 15px; margin-top: 10px; color: #344cff; }


    .vpn-slideshow-wrapper .component p {color:#ee3f60 !important}
    .vpn-slideshow-wrapper .stack-overview .service h4 {color:#ee3f60 !important}
    .vpn-slideshow-wrapper .stack-overview .service p {color:#6777ef !important}

    .vpn-slideshow-wrapper .tunnel { position: relative; width: 100px; height: 4px; background: linear-gradient(90deg, #ee3f60, #6777ef); border-radius: 2px; margin: 20px auto; }
    @media(min-width: 768px) { .vpn-slideshow-wrapper .tunnel { width: 4px; height: 100px; margin: auto 20px; } }
    
    .vpn-slideshow-wrapper .flow-diagram { width: 100%; max-width: 600px; margin: 20px 0; padding: 20px; background: #f8f9ff; border-radius: 10px; border-left: 5px solid #6777ef; }
    .vpn-slideshow-wrapper .flow-step { display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); text-align: left; }
    .vpn-slideshow-wrapper .step-number { background: #6777ef; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
    
    .vpn-slideshow-wrapper .stack-overview, .vpn-slideshow-wrapper .benefits { width: %; max-width: 800px; }
    .vpn-slideshow-wrapper .service { background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #ffc221; text-align: left; }
    .vpn-slideshow-wrapper .service h4 ,
      .vpn-slideshow-wrapper .service p 
    {color: #000;}
    .vpn-slideshow-wrapper .benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; }
    .vpn-slideshow-wrapper .benefit { background: linear-gradient(135deg, #ee3f60, #ff6b8a); color: white; padding: 20px; border-radius: 15px; }
  `}</style>
);

const VPNSlideshow = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const totalSlides = 5;

  const showSlide = (n) => {
    let newIndex = n > totalSlides ? 1 : n < 1 ? totalSlides : n;
    setCurrentSlideIndex(newIndex);
  };
  
  const changeSlide = (n) => showSlide(currentSlideIndex + n);
  const currentSlide = (n) => showSlide(n);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (typeof window !== 'undefined') {
        if (event.key === 'ArrowLeft') changeSlide(-1);
        if (event.key === 'ArrowRight') changeSlide(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const slides = [
    {
      title: '🌍 VPN Geo-Restriction Bypass',
      content: (
        <>
          <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '40px' }}>A Complete Docker-Based Solution</p>
          <div className="feature-grid">
            {[{ i: "🔒", t: "Secure" }, { i: "⚡", t: "Fast" }, { i: "🎛️", t: "Easy" }, { i: "🌐", t: "Reliable" }].map(f => (
              <div key={f.t} className="feature-card"><h4>{f.i} {f.t}</h4></div>
            ))}
          </div>
        </>
      )
    },
    {
      title: '🏗️ System Architecture',
      content: (
        <div className="architecture-diagram">
          <div className="location user-country"><h3>🏠 User Location</h3><div className="component"><p>Client Device with WireGuard</p></div></div>
          <div className="tunnel" />
          <div className="location target-country"><h3>🎯 Target Server</h3><div className="component"><p>Dockerized VPN Stack</p></div></div>
        </div>
      )
    },
    {
      title: '🔄 Traffic Flow',
      content: (
        <div className="flow-diagram">
          {["Client connects", "Traffic encrypted", "Server forwards with local IP", "Access granted"].map((t, i) => (
            <div key={i} className="flow-step"><div className="step-number">{i + 1}</div><div>{t}</div></div>
          ))}
        </div>
      )
    },
    {
      title: '🐳 Docker Stack',
      content: (
        <div className="stack-overview">
          {[{ n: "wg-easy", d: "WireGuard + Web UI" }, { n: "cloudflared", d: "Secure Admin Access" }, { n: "cloudflare-ddns", d: "Dynamic DNS Updates" }].map(s => (
            <div key={s.n} className="service"><h4 style={{ color: '#344cff' }}>{s.n}</h4><p>{s.d}</p></div>
          ))}
        </div>
      )
    },
    {
      title: '✨ Key Benefits',
      content: (
        <div className="benefits">
          {["Enterprise Security", "High Performance", "Easy Management", "Always Connected"].map(b => (
            <div key={b} className="benefit"><h4>{b}</h4></div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="vpn-slideshow-wrapper">
      <SlideshowStyles />
      {slides.map((slide, index) => (
        <div key={index} className={`slide ${currentSlideIndex === index + 1 ? 'active' : ''}`}>
          {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
          {slide.content}
        </div>
      ))}
      <div className="navigation">
        <button className="nav-btn" onClick={() => changeSlide(-1)} disabled={currentSlideIndex === 1}>❮</button>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[...Array(totalSlides)].map((_, i) => (
            <span key={i} className={`indicator-dot ${currentSlideIndex === i + 1 ? 'active' : ''}`} onClick={() => currentSlide(i + 1)} />
          ))}
        </div>
        <span className="slide-counter">{currentSlideIndex} / {totalSlides}</span>
        <button className="nav-btn" onClick={() => changeSlide(1)} disabled={currentSlideIndex === totalSlides}>❯</button>
      </div>
    </div>
  );
};

export default VPNSlideshow;
