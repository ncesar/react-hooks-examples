import React from "react";
import { useHttp } from "../hooks/http";

import Summary from "./Summary";

const Character = props => {
  // const [loadedCharacter, setLoadedCharacter] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const { isLoading, fetchedData } = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );

  let loadedCharacter = null;
  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  // const fetchData = () => {
  //   console.log(
  //     "Sending Http request for new character with id " + props.selectedChar
  //   );
  //   setIsLoading(true);
  //   fetch("https://swapi.co/api/people/" + props.selectedChar)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Could not fetch person!");
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const loadedCharacter = {
  //         id: props.selectedChar,
  //         name: charData.name,
  //         height: charData.height,
  //         colors: {
  //           hair: charData.hair_color,
  //           skin: charData.skin_color
  //         },
  //         gender: charData.gender,
  //         movieCount: charData.films.length
  //       };
  //       setLoadedCharacter(loadedCharacter);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== state.loadedCharacter.id ||
  //     nextState.isLoading !== state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     fetchData();
  //   }
  // }

  // useEffect(() => {
  //   //component did mount
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   //sempre inicia 1x, ou seja, já é o componentdidmount por padrão.
  //   //component did update
  //   // fetchData();
  //   return () => {
  //     //o codigo é executado antes de useEffect renderizar de novo
  //     console.log("too soon");
  //   };
  // }, [props.selectedChar]); //quando isso mudar, atualiza a dom

  // useEffect(() => {
  //   return () => {
  //     console.log("roda quando o componente é montado e desmontado");
  //   };
  // }, []);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
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
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};
//Se seu function component renderiza o mesmo resultado dados os mesmos prop
export default React.memo(Character); //o React vai pular a renderização do componente e reutilizar o último resultado renderizado.
