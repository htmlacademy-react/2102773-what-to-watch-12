import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
  cardsCount: number;
}

function App(props: AppScreenProps): JSX.Element {
  return (
    <MainScreen
      filmCardTitle={props.filmCardTitle}
      filmCardGenre={props.filmCardGenre}
      filmCardYear={props.filmCardYear}
      cardsCount={props.cardsCount}
    />
  );
}

export default App;
