import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Tipos para las casillas y el tablero
type Square = 'X' | 'O' | null;
type Board = Square[];

const App = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null)); // Inicializamos el tablero como un array de 9 elementos null
  const [isXTurn, setIsXTurn] = useState<boolean>(true); // Comenzamos con 'X'
  const [gameStarted, setGameStarted] = useState<boolean>(false); // Estado para controlar si el juego ha comenzado
  
  // Manejador de clics en las casillas
  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board)) return; // No hace nada si ya está ocupada o si ya hay un ganador
    
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O'; // Coloca 'X' o 'O' dependiendo del turno
    setBoard(newBoard);
    setIsXTurn(!isXTurn); // Cambia el turno
  };

  // Función para calcular el ganador
  const calculateWinner = (squares: Board): Square => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Retorna 'X' o 'O' si hay ganador
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  // Renderiza las casillas del tablero
  const renderSquare = (index: number) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  // Reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        // Mostrar el botón de inicio antes de que comience el juego
        <TouchableOpacity style={styles.startButton} onPress={() => setGameStarted(true)}>
          <Text style={styles.startButtonText}>Inicio</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.title}>Tres en Raya</Text>
          
          {/* Tablero */}
          <View style={styles.board}>
            {[0, 1, 2].map((row) => (
              <View style={styles.row} key={row}>
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </View>
            ))}
          </View>
          
          {/* Mensaje de ganador */}
          {winner && (
            <Text style={styles.winnerText}>{winner} Gana!</Text>
          )}

          {/* Botón de reiniciar */}
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8BFD8', // Color de fondo
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'black',
  },
  squareText: {
    fontSize: 36,
    color: 'white',
  },
  winnerText: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
