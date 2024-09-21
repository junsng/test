/* React는 컴포넌트에서 호출하여 무언가를 "기억" 할 수 있는 'useState'라는 특별한 함수를 제공. Square의 현재 값을 state에 저장할 수 있음
 */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  /* 
value는 값을 저장하고, setValue는 값을 변경하는데 사용하는 '함수'
null은 이 state변수의 초깃값으로 사용됨
*/

  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/*
 * 여러 자식 컴포넌트에서 데이터를 수집하거나 두 자식 컴포넌트가 서로 통신하도록 하려면,
 * 부모 컴포넌트에서 공유 state를 선언하자.
 * 부모 포넌트는 props를 통해 해당 state를 자식 컴포넌트에 전달할 수 있다.
 */
function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  //react컴포넌트는 두개의 버튼처럼 인접한 여러개의 jsx엘리먼트가 아닌 단일 엘리먼트를 반환해야 함.
  // <> </>으로 감싸서 여러개의 인접한 JSX 엘리먼트를 감싸 해결할 수 있음

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    //배열의 얕은 복사
    //const nextSquares = squares.slice();
    const nextSquares = [...squares];

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    //기존 setSquares와 setXIsNext 호출을 onPlay함수에 대한 단일 호출로 대체
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winners : " + winner;
  } else {
    status = "Next player : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/*
  'history' state를 배치
  Square > Board 컴포넌트로 state를 "끌어올렸던"것처럼 Baord를 Game컴포넌트로 state를 관리하도록 함.
 */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //단일 항목배열로 초기화
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    console.log(nextHistory);
    setHistory(nextHistory); //전개구문 활용
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
