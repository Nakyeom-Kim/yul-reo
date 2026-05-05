"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";

export default function SoundPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 웹 오디오 API를 위한 Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // 애니메이션 프레임 및 스케일/블러 상태
  const requestRef = useRef<number>(0);
  const [scale, setScale] = useState(1);
  const [blur, setBlur] = useState(0);

  // Audio Context 초기화
  const initAudioContext = () => {
    if (!audioCtxRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      analyserRef.current = audioCtxRef.current.createAnalyser();

      // FFT 사이즈 및 스무딩 설정 (버벅임 방지)
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.85; // 파형 변화를 좀 더 부드럽게 연결

      sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
    }

    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // 파형 데이터 기반으로 스케일 및 모션 블러 업데이트
  const updateScale = () => {
    if (analyserRef.current && isPlaying) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;

      // 화면을 꽉 채울 정도로 극적인 스케일업
      // 평균값이 너무 낮을 때 발생하는 미세한 떨림(버벅임)을 무시하기 위해 최소 임계값 적용
      const normalizedAvg = Math.max(0, average - 10) / 120;
      const intensity = Math.pow(normalizedAvg, 2);

      const targetScale = 1 + intensity * 10;
      const targetBlur = intensity * 15;

      setScale(targetScale);
      setBlur(targetBlur);
    }

    requestRef.current = requestAnimationFrame(updateScale);
  };

  // isPlaying 상태가 변할 때 애니메이션 프레임 시작/종료
  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateScale);
    } else {
      // 재생이 끝났을 때 스케일이 갑자기 1로 튀는 것을 방지하고 0.95로 부드럽게 세팅
      setScale(0.95);
      setBlur(0);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  // 첫 번째 버튼 클릭 핸들러
  const handlePlayFirst = () => {
    if (audioRef.current) {
      initAudioContext();

      if (isPlaying) {
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // 소리가 끝났을 때 핸들러
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#171717] flex flex-col relative overflow-hidden">
      <Header />

      {/* crossOrigin="anonymous"는 미디어 소스 분석 시 CORS 에러 방지를 위해 필요함 */}
      <audio
        ref={audioRef}
        src="/sound/mixed_1.mp3"
        onEnded={handleAudioEnded}
        crossOrigin="anonymous"
      />

      {/* 중앙 그래픽 영역 */}
      <main className="flex-1 flex items-center justify-center relative mt-24">
        {/* 등장/퇴장은 opacity로 부드럽게 처리 */}
        <div
          className={`absolute flex items-center justify-center transition-opacity duration-700 ease-in-out
            ${isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {/* 소리 파형에 반응하는 애니메이션은 인라인 style로 실시간 적용 */}
          <img
            src="/img/graphic_book.svg"
            alt="Graphic"
            className="w-74 h-74 md:w-120 md:h-120"
            style={{
              transform: `scale(${scale})`,
              filter: `blur(${blur}px)`,
              // 재생 중일 때는 0.05s로 빠릿하게 파형에 반응하고, 끝날 때는 0.7s로 서서히 부드럽게 축소됨
              transition: isPlaying
                ? "transform 0.05s ease-out, filter 0.05s ease-out"
                : "transform 0.7s ease-in-out, filter 0.7s ease-in-out"
            }}
          />
        </div>
      </main>

      {/* 하단 버튼 10개 영역 */}
      <div className="w-full pb-12 pt-4 px-8 flex justify-center items-center gap-4 flex-wrap z-10 bg-white/50 backdrop-blur-sm">
        <button
          onClick={handlePlayFirst}
          className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          1
        </button>

        {Array.from({ length: 9 }).map((_, index) => (
          <button
            key={index + 2}
            className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center cursor-not-allowed"
            disabled
          >
            {index + 2}
          </button>
        ))}
      </div>
    </div>
  );
}

