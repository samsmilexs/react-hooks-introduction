import React, { useEffect } from 'react';
import { useHttp } from '../hooks/http';

import Summary from './Summary';

const Character = props => {
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar]);
  const loadedCharacter = fetchedData ? {
    id: props.selectedChar,
    name: fetchedData.name,
    height: fetchedData.height,
    colors: {
      hair: fetchedData.hair_color,
      skin: fetchedData.skin_color
    },
    gender: fetchedData.gender,
    movieCount: fetchedData.films.length
  } : {};

  useEffect(() => {
    return () => console.log('Component did unmount');
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

// memo() checkes if the props of the component changes, if they didn't, then don't rerender
// but more control is provided for when props can change but some of them shouldn't trigger rerender by provider a function as second argument
export default React.memo(Character, (prevProps, nextProps) => {
  return nextProps.selectedChar === prevProps.selectedChar;
});
