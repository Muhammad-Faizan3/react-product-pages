import { useTheme } from "../App";

export default function VideoShowcase() {
  const { dark } = useTheme();

  return (
    <section className={`${dark ? 'bg-[#0A0A0A]' : 'bg-white'} w-full py-16 sm:py-24 overflow-hidden`}>
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-[120px]">

        {/* Heading - Top Left */}
        <div className="mb-10 sm:mb-16">
          <h2
            className={`text-[28px] sm:text-[42px] md:text-[56px] leading-[1.05] tracking-tight font-light uppercase max-w-xl ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: '"SF Pro Display", Arial, sans-serif' }}
          >
            See It <br className="hidden sm:block" />
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'}`}>In Action</span>
          </h2>
        </div>

        {/* Video - Center */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className={`w-full max-w-[900px] rounded-2xl overflow-hidden ${dark ? 'ring-1 ring-white/10' : 'ring-1 ring-black/5'} shadow-2xl`}>
            <div className={`relative w-full aspect-video ${dark ? 'bg-[#141414]' : 'bg-gray-100'} flex items-center justify-center`}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="NovaDrive Product Video"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Heading - Bottom Right */}
        <div className="flex justify-end">
          <h2
            className={`text-[28px] sm:text-[42px] md:text-[56px] leading-[1.05] tracking-tight font-light uppercase text-right max-w-xl ${dark ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: '"SF Pro Display", Arial, sans-serif' }}
          >
            Built <br className="hidden sm:block" />
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'}`}>For Speed</span>
          </h2>
        </div>

      </div>
    </section>
  );
}
