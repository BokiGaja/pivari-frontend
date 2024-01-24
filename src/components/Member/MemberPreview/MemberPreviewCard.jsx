import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';

import pivariLogo from '../../../assets/logos/pivari-logo.png';

import { ReactComponent as FacebookIcon } from '../../../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../../../assets/svg/socialIcons/icon-email.svg';

const MemberPreviewCard = ({ member, navigate, scrollToTop }) => {
  return (
    <React.Fragment>
      <div
        className="flex flex-col justify-center tems-stretch border border-maltYellow rounded-3xl mt-5 bg-guinessBlack lg:w-6/12 w-full hover:scale-105 hover:cursor-pointer transition-all duration-[500ms]"
        onClick={() => {
          navigate(`/members/${member?.name?.replaceAll(' ', '-')}`);
          scrollToTop();
        }}
      >
        <div className="flex gap-2 lg:flex-row flex-col">
          <div
            className={`flex lg:w-[200px] w-full lg:mr-[50px] lg:min-h-[250px] min-w-[200px] min-h-[300px] items-center relative overflow-hidden rounded-l-3xl rounded-r-3xl lg:rounded-r-none`}
          >
            <img
              alt={member?.name ? `${member?.name} logo` : 'default website logo'}
              src={member?.logo ? member?.logo : pivariLogo}
              className="object-fill w-full h-full"
            />
          </div>
          <div className="flex flex-col align-start lg:items-start items-center justify-between py-[20px] lg:w-[75%] w-full">
            <div>
              <Text
                className="mb-[15px] lg:text-start text-center"
                size={'large'}
                color={'maltYellow'}
                text={member?.name}
              />
              <Text className="lg:text-start text-center" size="medium" color="white" text={member?.description} />
            </div>
            <div className="flex gap-[25px] mt-4 socialIconBox">
              {member?.facebook && (
                <div className="flex min-h-[2.5rem] items-center" onClick={(e) => e.stopPropagation()}>
                  <a href={member?.facebook} rel="noreferrer" target="_blank">
                    <FacebookIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
              {member?.instagram && (
                <div className="flex min-h-[2.5rem] items-center" onClick={(e) => e.stopPropagation()}>
                  <a href={member?.instagram} rel="noreferrer" target="_blank">
                    <InstagramIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
              {member?.email && (
                <div className="flex min-h-[2.5rem] items-center" onClick={(e) => e.stopPropagation()}>
                  <a href={`mailto:${member.email}`} rel="noreferrer" target="_blank">
                    <EmailIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

MemberPreviewCard.propTypes = {
  member: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  scrollToTop: PropTypes.func.isRequired,
};

export default MemberPreviewCard;
