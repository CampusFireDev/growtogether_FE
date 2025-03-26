import React, { useState} from 'react';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/images/banner1.png',
    '/images/banner2.png',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full rounded-[5px] overflow-hidden mt-8 " id="default-carousel">

      <div className="relative w-full h-auto  min-h-[56px] md:min-h-[96px] overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <img src={src} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 현재 페이지 표시 및 이동 */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button key={index} type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/60'}`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* 슬라이더 컨트롤 */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none z-index[0]"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/10 group-hover:bg-black/50 group-focus:outline-none">
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none z-index[0]"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/10  group-hover:bg-black/50 group-focus:outline-none">
          <svg className="w-4 h-4 text-white"aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;