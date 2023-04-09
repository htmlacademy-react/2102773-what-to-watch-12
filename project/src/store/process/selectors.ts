import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const genreSelector = (state: State): string => state[NameSpace.Main].genre;
