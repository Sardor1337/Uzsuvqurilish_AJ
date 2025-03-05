import { useState, useRef } from 'react'; // Import useRef
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserSertificat from './UserSertificat';
import UserEkologiya from './UserEkologiya';
import UserLoyihalar from './UserLoyihalar';
import UserHamkorlar from './UserHamkorlar';
import UserBizHaqimizda from './UserBizHaqimizda';

const UserHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('uz'); // Boshlang'ich til
  const { t, i18n } = useTranslation(); // i18n va tni chaqirish
  const navigate = useNavigate();
  const languages = [
    { code: 'uz', imgSrc: '/uzb.png' },
    { code: 'ru', imgSrc: '/ru.png' },
  ];

  // Create refs for each section
  const ekologiyaRef = useRef(null);
  const loyihalarRef = useRef(null);
  const hamkorlarRef = useRef(null);
  const bizHaqimizdaRef = useRef(null);

  const handleLangChange = (langCode) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode); // Tilni o'zgartirish
    setIsOpen(false); // Dropdownni yopish
  };

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[url('/userBg.png')] bg-fixed">
      <nav className='w-full px-[4rem] fixed top-0 left-0 flex justify-between items-center bg-gradient-to-r from-[#2CF8A2] to-[#565CFD] opacity-99 p-4'>
        <img src="logo.png" alt="logo" className="h-[5rem]" />

                      {/* Navigatsiya menyusi */}
          <ul className='flex gap-[1.5rem] text-[1.2rem] text-white'>
            <li className='cursor-pointer' onClick={() => scrollToSection(ekologiyaRef)}>{t('news')}</li>
            <li className='cursor-pointer' onClick={() => scrollToSection(loyihalarRef)}>{t('projects')}</li>
            <li className='cursor-pointer' onClick={() => scrollToSection(hamkorlarRef)}>{t('partners')}</li>
            <li className='cursor-pointer'>{t('services')}</li> {/* No ref needed if no corresponding section */}
            <li className='cursor-pointer' onClick={() => scrollToSection(bizHaqimizdaRef)}>{t('aboutUs')}</li>
          </ul>
          
          <div className='flex gap-4'>
            
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-full flex items-center cursor-pointer"
              >
                <img
                  src={languages.find(lang => lang.code === selectedLang).imgSrc}
                  alt={selectedLang}
                  className="w-10 h-6 object-cover"
                />
              </button>
              {isOpen && (
                <div className="absolute mt-1 right-0 bg-white shadow-lg rounded-md w-18">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang.code)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                      >
                        <img src={lang.imgSrc} alt={lang.code} className="w-10 h-6 object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kirish text */}
            <p
              onClick={() => { navigate('/login') }}
              className='text-[1.2rem] text-white cursor-pointer'>{t('login')}</p>
          </div>



      </nav>

      <UserSertificat />
      <div ref={ekologiyaRef}>
        <UserEkologiya />
      </div>
      <div className="flex flex-col min-h-screen gap-10">
        <div ref={loyihalarRef}>
          <UserLoyihalar />
        </div>
        <div ref={bizHaqimizdaRef}>
          <UserBizHaqimizda />
        </div>
      </div>
      <div ref={hamkorlarRef}>
        <UserHamkorlar />
      </div>
    </div>
  );
};

export default UserHome;