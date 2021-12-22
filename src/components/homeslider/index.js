// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Link from '../common/util/input/Link';

// Import Swiper styles
import 'swiper/css';
import cn from "classnames";

const sliderContent = [{
  background: 'https://nftnt.mypinata.cloud/ipfs/QmYv7vFgkki14cFDsnXFsfY5oRg2NYYc5eLS56Dy2DMJcX',
  headline: 'The Lore Icons',
  subline: 'Physical Redemptions, Dynamic Utilites, and 10 Incredible Cryptids are here to collect.',
  btnContent: 'Packs Only $5.99',
  btnURL: '/drop/82692'
},
{
  background: 'https://nftnt.mypinata.cloud/ipfs/QmemmrWhBWR8Q4n7Ums5YLKd3FnfcJFmWNprF8y64Jom2e',

  headline: 'Beta Promo',
  subline: 'Beta Promo set a new standard for NFTNT, revealing new collections and utilites.',
  btnContent: 'View on Market',
  btnURL: '/market'
},
{
  background: 'https://nftnt.mypinata.cloud/ipfs/QmeTgFPKdKyNF9KmYuaYQ91N6pS6STxsvh9aThV82UN5wy',
  headline: 'Alpha Promo',
  subline: 'The First of the first. NFTNTs breakthrough into the NFT world, a unique peak into the future.',
  btnContent: 'View on Market',
  btnURL: '/market'
},
];

// eslint-disable-next-line import/no-anonymous-default-export
export default function HomeSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      className={cn('h-80 sm:h-80 md:h-96 z-50')}
    >
      { sliderContent.map((slide, index) => 
        <SwiperSlide className={cn('w-full h-full')} key={index}>
          <div className={cn(
            'relative md:absolute h-80 sm:h-80 md:h-auto md:inset-0',
            'bg-contain bg-center bg-no-repeat',
          )} style={{  
            backgroundImage: `url('${slide.background}')`
          }}></div>

          <div className={cn('container mx-auto h-full relative')}>
            <div className={cn(
              'relative md:absolute -mt-10 left-0 bottom-0 w-full md:w-1/2 lg:w-1/3',
              'bg-page pt-4 md:pt-6 pb-3 md:pb-10 px-6 md:px-8',
            )}>
              <h4 className={cn('text-xl md:text-3xl font-bold mb-3 leading-snug uppercase')}>{slide.headline}</h4>
              <p className={cn('text-base md:text-md mb-3 font-normal')}>{slide.subline}</p>
              
              { (slide.btnURL && slide.btnContent) &&
                <Link
                  className={cn(
                    'inline-block bg-primary py-2 px-5 text-secondary mt-2 md:mt-5 mb-1 md:mb-2',
                    'cursor-pointer text-sm md:text-base font-bold leading-relaxed uppercase',
                    'rounded-3xl outline-none opacity-85 hover:text-secondary hover:opacity-100'
                  )}
                  href={slide.btnURL}
                >
                   {slide.btnContent}
                </Link>
              }
            </div>
          </div>
        <button className='swiper-button-next'/> </SwiperSlide>
      ) }
    </Swiper>
  );
};