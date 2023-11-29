import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSubmit, handleClear }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value === '') handleClear();
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(search);
  };

  return (
    <form className="flex justify-between lg:w-8/12 w-11/12 mx-auto lg:my-10 my-5">
      <input
        className="w-[75%]  bg-blackBackgroundLighter rounded-xl p-2 lg:text-xl text-lg border-2 text-white border-hopGreen outline-none font-crimson tracking-wide "
        type="text"
        name="search"
        id="search"
        placeholder={t('searchBar.searchLabel')}
        onChange={handleChange}
        value={search}
      />
      <button
        className="flex justify-center items-center w-[20%] bg-transparent border-2 border-hopGreen rounded-xl text-maltYellow lg:text-2xl text-lg font-crimson tracking-wider hover:border-maltYellow hover:text-white transiton-all duration-300 outline-none "
        onClick={handleClick}
      >
        {t('searchBar.searchButton')}
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default SearchBar;
