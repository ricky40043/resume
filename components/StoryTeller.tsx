import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { soundManager } from '../utils/audio';

interface StorySegment {
  text: string;
  image: string;
  highlight?: string;
}

const STORY_DATA: StorySegment[] = [
  {
    text: "你好，我是李柏儀。一名擁有十年實戰經驗的資深後端工程師與全端架構師。",
    // Code / Matrix vibe
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    highlight: "李柏儀"
  },
  {
    text: "專精於 Python 與 .NET Core 雙核心架構，從早期的 AOI 影像辨識演算法，跨足到現代化高併發的 AIOT 雲端平台。",
    // Industrial / Robotic Arm / AOI vibe
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    highlight: "AIOT"
  },
  {
    text: "我不僅撰寫程式碼，更致力於解決複雜的系統整合問題，將 Edge AI 邊緣運算與雲端大數據完美串接，確保系統穩定高效。",
    // Server Room / Data Center
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1000",
    highlight: "穩定"
  },
  {
    text: "無論是智慧醫療串流、充電樁能源管理，還是大規模人臉辨識，我都能提供最具競爭力的技術解決方案。",
    // Future City / IoT connection
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    highlight: "歷程"
  }
];

const StoryTeller: React.FC = () => {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  // 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation deg
    const max = 15;
    
    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) * max;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleImageMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentFullText = STORY_DATA[currentSegmentIndex].text;

    if (isTyping) {
      if (displayedText.length < currentFullText.length) {
        // Typing effect
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          if (displayedText.length % 3 === 0) soundManager.playTypewriter(); // Play sound every few chars
        }, 30); // Typing speed (slightly faster for longer text)
      } else {
        // Finished typing, wait then switch
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 4000); // Read time (longer for more text)
      }
    } else {
      // Deleting effect 
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
            setDisplayedText(""); 
             setCurrentSegmentIndex((prev) => (prev + 1) % STORY_DATA.length);
             setIsTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentSegmentIndex]);

  const currentSegment = STORY_DATA[currentSegmentIndex];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[60vh]">
      {/* Text Area */}
      <div className="flex-1 space-y-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-900/10 text-amber-400 text-xs font-mono animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            系統訊息 // 接收傳輸中
        </div>
        
        {/* Changed text size from 4xl/6xl to 2xl/4xl for better readability with more text */}
        <h1 className="text-2xl md:text-4xl font-bold leading-relaxed font-mono min-h-[160px] tracking-wide text-gray-100">
          {displayedText}
          <span className="inline-block w-2 h-6 bg-amber-500 ml-1 animate-pulse align-middle"></span>
        </h1>
        
        <div className="flex gap-4">
           {/* Progress Bars */}
           {STORY_DATA.map((_, idx) => (
             <div 
               key={idx} 
               className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx === currentSegmentIndex ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-white/10'}`} 
             />
           ))}
        </div>
      </div>

      {/* Dynamic Visual Area with 3D Interaction */}
      <div 
        className="flex-1 w-full flex justify-center perspective-container relative h-[500px]"
        ref={imageContainerRef}
        onMouseMove={handleImageMouseMove}
        onMouseLeave={handleImageMouseLeave}
        style={{ perspective: '1000px' }}
      >
         {STORY_DATA.map((segment, idx) => (
             <div 
               key={idx}
               className={`absolute inset-0 transition-all duration-1000 ease-in-out`}
               style={{
                   opacity: idx === currentSegmentIndex ? 1 : 0,
                   transform: idx === currentSegmentIndex 
                        ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)` 
                        : `translateZ(-100px) rotateY(10deg) scale(0.9)`,
                   pointerEvents: idx === currentSegmentIndex ? 'auto' : 'none',
                   filter: idx === currentSegmentIndex ? 'blur(0px)' : 'blur(10px)'
               }}
             >
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 group">
                    <img src={segment.image} alt="Story visual" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* 3D Highlight Shine */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                            mixBlendMode: 'overlay'
                        }}
                    ></div>

                    {/* HUD Overlay Elements - Keeping them flat on top of the 3D card looks cool */}
                    <div className="absolute top-4 left-4 border-l-2 border-t-2 border-white/30 w-8 h-8"></div>
                    <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-white/30 w-8 h-8"></div>
                    <div className="absolute bottom-8 left-8 text-xs font-mono text-amber-400">
                        DATA_SEQ_0{idx + 1} // 載入中...
                    </div>
                </div>
             </div>
         ))}
      </div>
    </div>
  );
};

export default StoryTeller;