import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const pageScrolledAtom = atom(false);

export const localeLanguageAtom = atomWithStorage('localeLanguage', 'sr');
