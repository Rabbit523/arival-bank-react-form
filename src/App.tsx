import { useEffect, useState } from "react";
import "./App.css";
import { InititalForm } from "./components/InitialForm";
import { PasswordForm } from "./components/PasswordForm";
import { ReviewForm } from "./components/ReviewForm";
import { User, Option } from "./types";
import Axios from "axios";

function App() {
  const [countries, setCountries] = useState<Option[]>([]);
  const [user, setUser] = useState<User>();
  const [curStep, setCurStep] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios(
          `https://countryapi.io/api/all?apikey=${process.env.REACT_APP_API_KEY}`
        );
        const tmp: Option[] = [];
        Object.values(data).forEach((obj: any) => {
          tmp.push({
            value: obj.name,
            label: obj.name,
          });
        });
        setCountries(tmp);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCopmlete = (props: User) => {
    const { username, email, country, password } = props;
    if (!password) {
      setUser({ username, email, country });
      setCurStep(1);
    } else {
      setUser(prevUser => ({ ...prevUser, password }));
      setCurStep(2);
    }
  }

  const handleReset = () => {
    setCurStep(0);
  }

  return (
    <div className="App">
      {curStep === 0 && <InititalForm onComplete={handleCopmlete} countries={countries} />}
      {curStep === 1 && <PasswordForm onComplete={handleCopmlete} />}
      {curStep === 2 && <ReviewForm user={user} onReset={handleReset} />}
    </div>
  );
}

export default App;
