import twoFrog from '../assets/twoFrog.png';
import discord from '../assets/discord.png';
import twitter from '../assets/tweeter.png';

export function CommunityBanner() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-brown-800 to-brown-900">
      <div className="max-w-7xl mx-auto">
        <div 
          id="community-section" 
          className="bg-butter-200 flex flex-col-reverse items-center md:flex-row justify-center md:items-end max-w-5xl mx-auto px-2 lg:gap-16 md:gap-8 gap-6 rounded-[32px] border border-brown-700 py-8"
        >
          <div className="flex-shrink-0 pb-4 md:pb-0">
            <img 
              src={twoFrog} 
              alt="Butter community mascot" 
              className="w-[216px] md:w-[265px] lg:w-[320px] xl:w-[350px] h-auto object-contain"
            />
          </div>
          
          <div className="flex flex-col items-center gap-6 md:gap-4 lg:gap-10 py-8 md:py-0 self-stretch justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] text-brown-900 font-bold text-center">
              Join The Butter Community
            </h2>
            
            <div className="flex gap-6 md:gap-8 lg:gap-12">
              <a
                href="https://discord.gg/FVnN3SHnRT"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 duration-300"
              >
                <img 
                  src={discord} 
                  alt="Discord" 
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-[75px] xl:h-[75px] scale-x-125"
                />
              </a>
              
              <a
                href="https://x.com/Buttercoinspl"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 duration-300"
              >
                <img 
                  src={twitter} 
                  alt="X (Twitter)" 
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-[75px] xl:h-[75px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

