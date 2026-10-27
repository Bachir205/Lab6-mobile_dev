import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme-context";

type SquareValue = "X" | "O" | null;
type Squares = SquareValue[];

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function calculateWinner(squares: Squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] as number[] };
    }
  }

  return null;
}

type SquareProps = {
  value: SquareValue;
  index: number;
  fontSize: number;
  onSquareClick: () => void;
  isWinnerSquare: boolean;
};

function Square({
  value,
  index,
  fontSize,
  onSquareClick,
  isWinnerSquare,
}: SquareProps) {
  const { colors } = useTheme();
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        value
          ? `Row ${row}, column ${column}, ${value}`
          : `Row ${row}, column ${column}, empty`
      }
      onPress={onSquareClick}
      style={({ pressed }) => [
        styles.square,
        { backgroundColor: colors.square, borderColor: colors.squareBorder },
        isWinnerSquare && {
          backgroundColor: colors.winner,
          borderColor: colors.winnerBorder,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.squareText,
          { fontSize, lineHeight: fontSize * 1.2 },
          { color: value === "X" ? colors.x : colors.o },
        ]}
      >
        {value ?? ""}
      </Text>
    </Pressable>
  );
}

type BoardProps = {
  boardSize: number;
  squares: Squares;
  onSquareClick: (index: number) => void;
  winnerLine?: number[];
};

function Board({
  boardSize,
  squares,
  onSquareClick,
  winnerLine = [],
}: BoardProps) {
  const { colors } = useTheme();
  const fontSize = Math.round(boardSize / 7);

  return (
    <View
      style={[
        styles.board,
        {
          width: boardSize,
          backgroundColor: colors.board,
          shadowColor: colors.text,
        },
      ]}
    >
      {Array.from({ length: 3 }, (_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: 3 }, (_, columnIndex) => {
            const index = rowIndex * 3 + columnIndex;

            return (
              <Square
                key={index}
                index={index}
                value={squares[index]}
                fontSize={fontSize}
                onSquareClick={() => onSquareClick(index)}
                isWinnerSquare={winnerLine.includes(index)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function Game() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width - 32, 360);
  const [history, setHistory] = useState<Squares[]>([
    Array(9).fill(null) as Squares,
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const winnerInfo = calculateWinner(currentSquares);
  const xIsNext = currentMove % 2 === 0;
  const winner = winnerInfo ? winnerInfo.winner : null;
  const isDraw =
    !winner && currentSquares.every((square) => square !== null);

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw"
      : `Next player: ${xIsNext ? "X" : "O"}`;

  const onPlay = (nextSquares: Squares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const handleClick = (index: number) => {
    if (currentSquares[index] || winner || isDraw) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null) as Squares]);
    setCurrentMove(0);
  };

  const moves = history.map((_, move) => ({
    move,
    description: move === 0 ? "Go to game start" : `Go to move #${move}`,
  }));

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text
          accessibilityRole="header"
          style={[styles.title, { color: colors.text }]}
        >
          Tic-Tac-Toe
        </Text>
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.status, { color: colors.secondaryText }]}
        >
          {status}
        </Text>

        <Board
          boardSize={boardSize}
          squares={currentSquares}
          onSquareClick={handleClick}
          winnerLine={winnerInfo?.line ?? []}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reset game"
          onPress={resetGame}
          style={({ pressed }) => [
            styles.resetButton,
            { width: boardSize, backgroundColor: colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[styles.resetButtonText, { color: colors.primaryText }]}
          >
            Reset game
          </Text>
        </Pressable>

        {/* Plain View, not a nested ScrollView: the outer ScrollView scrolls. */}
        <View style={[styles.moveList, { width: boardSize }]}>
          {moves.map(({ move, description }) => (
            <Pressable
              key={move}
              accessibilityRole="button"
              accessibilityLabel={description}
              accessibilityState={{ selected: currentMove === move }}
              onPress={() => jumpTo(move)}
              style={({ pressed }) => [
                styles.moveButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
                currentMove === move && {
                  backgroundColor: colors.selected,
                  borderColor: colors.primary,
                },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.moveText, { color: colors.text }]}>
                {description}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 12,
  },
  status: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  board: {
    borderRadius: 16,
    padding: 8,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    borderRadius: 12,
  },
  squareText: {
    fontWeight: "700",
    textAlign: "center",
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.7,
  },
  resetButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 16,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  moveList: {
    marginTop: 24,
    alignItems: "center",
  },
  moveButton: {
    width: "100%",
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  moveText: {
    textAlign: "center",
    fontSize: 16,
  },
});