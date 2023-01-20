class Game {

    constructor() {

        this.players = [{
            icon: "x",
            movements: [],
            canMove: false
        }, {
            icon: "o",
            movements: [],
            canMove: false
        }];

        this.positionToWin = [
            [0, 1, 2], // HORIZONTAL
            [3, 4, 5], // HORIZONTAL
            [6, 7, 8], // HORIZONTAL
            [0, 3, 6], // VERTICAL
            [1, 4, 7], // VERTICAL
            [2, 5, 8], // VERTICAL
            [0, 4, 8], // DIAGONAL
            [2, 4, 6] // DIAGONAL
        ];

    }

    countSimilarities(a1, a2) {

        let matches = 0;

        for (let i = 0; i < a1.length; i++) {
            if (a2.indexOf(a1[i]) != -1) matches++;
        }

        return matches;

    }

    checkPlayerMovement(player1, player2) {

        if (this.positionToWin.filter(array => this.countSimilarities(array, player1.movements) === 3).length) {
            document.body.innerHTML = `<h1>"${player1.icon.toUpperCase()}" venceu a partida</h1>`;
            return true;
        } else if (player1.movements.length + player2.movements.length === 9) {
            document.body.innerHTML = `<h1>Deu velha!</h1>`;
            return true;
        }

    }

    onPlayerClick() {

        document.querySelectorAll(".jogo span").forEach((span, i) => span.onclick = () => {

            if (span.innerHTML.length) return;

            const player1 = this.players.find(p => !p.canMove);
            const player2 = this.players.find(p => p.canMove);

            span.innerHTML = player1.icon;
            player1.canMove = true;
            player1.movements.push(i);
            player2.canMove = false;

            if (this.checkPlayerMovement(player1, player2)) setTimeout(() => location.reload(), 1500);

        });

    }

}

window.onload = () => new Game().onPlayerClick();