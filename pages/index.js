import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import _ from "underscore";
import gsap from "gsap";

export default function Home() {
  const [question, setQuestion] = useState([]);
  const [score, setScore] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentAnsw, setCurrentAnsw] = useState("");
  const [n1, n2] = question;
  const [vals, setVals] = useState([]);
  const nextQuestion = () => {
    const quest = randomQuestion();
    setIsDisabled(false);
    setCurrentAnsw("");
    setQuestion(quest);
    setVals(
      _.shuffle([
        quest[0] * quest[1],
        quest[0] * quest[1] + (Math.floor(Math.random() * 3) + 1),
        quest[0] * quest[1] - (Math.floor(Math.random() * 3) + 1),
        _.random(1, 100),
        _.random(1, 100),
        _.random(1, 100),
      ])
    );
  };
  useEffect(() => {
    setScore(parseInt(localStorage.getItem("score")) || 0);
    nextQuestion();
  }, []);

  const correctQuestion = (val) => {
    setCurrentAnsw(question[0] * question[1]);
    setIsDisabled(true);
    if (val === question[0] * question[1]) {
      gsap.fromTo(
        document.body,
        { backgroundColor: "green" },
        { backgroundColor: "white", duration: 1 }
      );

      setScore(score + 1);
      localStorage.setItem("score", score + 1);
    } else {
      gsap.fromTo(
        document.body,
        { backgroundColor: "red" },
        { backgroundColor: "white", duration: 1 }
      );
    }
    setTimeout(nextQuestion, 2000);
  };

  return (
    <div className={styles.container}>
      <h1>{currentAnsw ? currentAnsw : ` ${n1} * ${n2}`}</h1>
      <div className="btns">
        {vals.map((val) => (
          <button disabled={isDisabled} onClick={() => correctQuestion(val)}>
            {val}
          </button>
        ))}
      </div>
      <div className="score">{score}</div>
    </div>
  );
}

const randomQuestion = () => {
  return [Math.floor(Math.random() * 7) + 3, Math.floor(Math.random() * 7) + 3];
};
