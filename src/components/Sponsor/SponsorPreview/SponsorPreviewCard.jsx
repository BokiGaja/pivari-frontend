import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';

import pivariLogo from '../../../assets/logos/pivari-logo.png';

import { ReactComponent as FacebookIcon } from '../../../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../../../assets/svg/socialIcons/icon-email.svg';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import { localeLanguageAtom } from '../../../atoms';

const SponsorPreviewCard = ({ sponsor }) => {
  const navigate = useNavigate();
  const [currentLang] = useAtom(localeLanguageAtom);

  return (
    <div
      onClick={() => navigate(`/sponsors/${currentLang}/${sponsor?.name?.replaceAll(' ', '-')}`)}
      className="flex flex-col justify-center border-[3px] overflow-hidden border-maltYellow rounded-3xl mt-5  bg-guinessBlack lg:w-[55%] w-full max-h-none hover:scale-105 hover:cursor-pointer transition-all duration-[500ms]"
    >
      <div className="flex gap-2 lg:flex-row flex-col ">
        <div
          className={`flex lg:w-[300px] w-full lg:mr-[50px] lg:min-h-[250px] min-w-[200px] min-h-[300px] items-center relative overflow-hidden rounded-l-3xl rounded-r-3xl lg:rounded-r-none`}
        >
          <img
            alt={sponsor?.name ? `${sponsor?.name} logo` : 'default website logo'}
            src={sponsor?.logo ? sponsor?.logo : pivariLogo}
            className="object-fill w-full h-full"
          />
        </div>
        <div className="flex flex-col items-center justify-between p-[20px] lg:w-[75%] w-full">
          <div className="flex flex-col items-center">
            <Text
              className="mb-[15px] text-center font-bold text-[35px]"
              size={'large'}
              color={'maltYellow'}
              text={sponsor?.name}
            />
            <Text className="text-center" size="medium" color="white" text={sponsor?.description} />
          </div>
          <div className="flex gap-[25px] mt-4">
            {sponsor?.facebook && (
              <div className="flex min-h-[2.5rem] items-center" onClick={(e) => e.stopPropagation()}>
                <a href={sponsor?.facebook} rel="noreferrer" target="_blank">
                  <FacebookIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                </a>
              </div>
            )}
            {sponsor?.instagram && (
              <div className="flex min-h-[2.5rem] items-center" onClick={(e) => e.stopPropagation()}>
                <a href={sponsor?.instagram} rel="noreferrer" target="_blank">
                  <InstagramIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                </a>
              </div>
            )}
            {sponsor?.email && (
              <div className="flex min-h-[2.5rem] items-center" onClick={(e) => e.stopPropagation()}>
                <a href={`mailto:${sponsor.email}`} rel="noreferrer" target="_blank">
                  <EmailIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SponsorPreviewCard.propTypes = {
  sponsor: PropTypes.object.isRequired,
};

export default SponsorPreviewCard;
