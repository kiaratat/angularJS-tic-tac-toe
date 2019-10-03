angular.module('GameApp', [])
    .controller('GameController', function () {
        var self = this;
        self.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    desc: 'Go to game start'
                }],

            stepNumber: 0,
            xIsNext: true,
            gameStatus: "Next player: X"
        };

        self.jumpTo = function (step) {
            debugger;
            self.state.stepNumber = step;
            self.state.xIsNext = (step % 2) === 0;
            self.current = self.state.history[self.state.stepNumber];
        };


        self.square = function (i) {
            let history = self.state.history.slice(0, self.state.stepNumber + 1);
            let current = history[history.length - 1];
            let squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = self.state.xIsNext ? "X" : "O";
            self.state.history = history.concat([
                {
                    squares: squares,
                    desc: 'Go to move #' + history.length
                }]);
            self.state.stepNumber = history.length;
            self.state.xIsNext = !self.state.xIsNext;
            self.current = self.state.history[self.state.stepNumber];
            let winner = calculateWinner(self.current.squares);
            if (winner) {
                self.state.gameStatus = "Winner: " + winner;
            } else {
                self.state.gameStatus = "Next player: " + (self.state.xIsNext ? "X" : "O");
            }
            debugger;

        };

        function calculateWinner(squares) {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
        }


    });