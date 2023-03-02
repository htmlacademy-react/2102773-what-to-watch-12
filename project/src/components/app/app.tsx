import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
}

function App(props: AppScreenProps): JSX.Element {
  return (
    <MainScreen
      filmCardTitle={props.filmCardTitle}
      filmCardGenre={props.filmCardGenre}
      filmCardYear={props.filmCardYear}
    />
  );
}

export default App;
