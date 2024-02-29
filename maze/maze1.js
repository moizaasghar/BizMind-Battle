
const maze = [
    '.#.#.....S..#########..#..########..#.#....###...#G',
    '......##......................##..###.#..#.#####.#.',
    '#.#..#.##..####.######..#####..#.####.#..####..#...',
    '...#.###...#.#.#.#.#.###.#..#.#..##.#.#.#.#.#.....#',
    '#..###..#..#...#.#.####.#.#.#.#.###.#.#.##..#.#.#..',
    '#....##....#####.#.#.####.#...#....##.#.#.#.#......',
    '#.##.#.#...#.....#...###.#..###.#...#.#.##.#..###..',
    '#...#........#######........#...#.###.#.#.##..##..#',
    '#.#..#.###.........#..###..##.#.#.#...........##.##',
    '#.###.#..#..###.#####..########..#######.#.#####.#.',
    '#..#.....#..###.##.#...#######..###..###...........',
    '#.#..#.#...####.#.#..#####.#...####..########.#.#..',
    '.###...#.#.####......###.#..#..#....#.#.......###.#',
    '....#..##.##...#.#...#.###.##...#.#.#.#.#.#.#.###.#',
    '.####..#.....#.....#.#.#.#.####.#.#.###.#.#.#.##...',
    '.#.##.#..#.......#........##.#...#...........#.#.#.',
    '#...#.#..###...####.#####.######.#...########..#...',
    '.#.....#.#.#.#.#..#..#.##.........#.#.#.##..#....##',
    '#.##.#..#..#...#.#.#.......#.###..#.###.#.#.#.#.##.',
    '#.....#..#.###.#.##..#.#.###.##.#.#.#.#.#.#.#.#...#',
    '#.#..#...#.#.........###.##..#..#..##.#.#.#.#.###.#',
    '#...#..#...#####..####.#.#.#.###..#.....#.#.#.##.#.',
    '#....#...#.........#.......#..###...##.#..#...###.#',
    '...####..##.###.#..#########..####....#######....#.',
    '..#..#.#....###.#..######.#.#..######..#...........',
    '....###....####.##..######.##..#.##.#..########.#..',
    '.#..#..#.#.#####.#............#.........#.....###..',
    '#...###.......#.#...#..#...#.####...#.#.#.#.#......',
    '#...##.#.####...#....###..#..##..###....###..###.#.',
    '..##.##..###.###....#..####.#..#####.#.#.........##',
    '..#..#..####....###.#..##....###..##...#.##.#.#.#.#',
    '#.....#.#####........#....###.#...........#...###.#',
    '#..##..##.......#......#....#.#.#.#..##.##.#...#..#',
    '#.####..#..#.###.#..##.#....##..###..##............',
    '..#..#.#..................#..##.......###.#..#.#.#.',
    '#...#..##..####..##.#####.#.##..####.########..#...',
    '.#...#.#...#.#.#.#.#.###.##.#.##.#..##..#.#.#.....#',
    '##....#.#..#...#.#.###..###.#.#.###.#...#.#.#.#.#..',

  ];

  const cellSize = 20;
  let playerPosition = { row: 0, col: 1 };
  
  function startGame() {
    document.body.style.zoom = "80%";
    displayMaze();
    displayPlayer();
    document.addEventListener('keydown', movePlayer);
   
    showStartEndPopup(); // Show start and end popup
  }
  
  function displayMaze() {
        const mazeContainer = document.getElementById('maze-container');
        mazeContainer.innerHTML = '';
        for (let i = 0; i < maze.length; i++) {
          for (let j = 0; j < maze[i].length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (maze[i][j] === '#') {
              cell.style.backgroundColor = '#333';
            } else if (maze[i][j] === 'S') {
              cell.classList.add('start');
            } else if (maze[i][j] === 'G') {
              cell.classList.add('goal');
            }
            cell.style.top = i * cellSize + 'px';
            cell.style.left = j * cellSize + 'px';
            mazeContainer.appendChild(cell);
          }
        }
      }

      function displayPlayer() {
        const player = document.createElement('div');
        player.classList.add('player');
        player.style.top = playerPosition.row * cellSize + 'px';
        player.style.left = playerPosition.col * cellSize + 'px';
        document.getElementById('maze-container').appendChild(player);
      }

      function movePlayer(event) {
        let newRow = playerPosition.row;
        let newCol = playerPosition.col;

        switch (event.key) {
          case 'ArrowUp':
            newRow--;
            break;
          case 'ArrowDown':
            newRow++;
            break;
          case 'ArrowLeft':
            newCol--;
            break;
          case 'ArrowRight':
            newCol++;
            break;
        }

        if (isValidMove(newRow, newCol)) {
          playerPosition.row = newRow;
          playerPosition.col = newCol;
          updatePlayerPosition();
          checkWin();
        }
      }

      function isValidMove(row, col) {
        return row >= 0 && row < maze.length &&
          col >= 0 && col < maze[0].length &&
          maze[row][col] !== '#';
      }

      function updatePlayerPosition() {
        const player = document.querySelector('.player');
        player.style.top = playerPosition.row * cellSize + 'px';
        player.style.left = playerPosition.col * cellSize + 'px';
      }

      function checkWin() {
        const goalCell = document.querySelector('.goal');
        const playerCell = document.querySelector('.player');
        if (
          playerCell.style.top === goalCell.style.top &&
          playerCell.style.left === goalCell.style.left
        ) {
            var game = JSON.parse(localStorage.getItem('game'));
            game.maze = false;
            game.totalScore = game.totalScore + 100;
            localStorage.setItem('game', JSON.stringify(game));
            alert('Congratulations! You reached the goal and earned 100 points! Click OK to play the next level');
            window.location.href = "./mazerun2.html";
        }
      }

 


      function showStartEndPopup() {
        alert('Red dot is the starting point\nBlue dot is the end point');
      }

      
  
  window.onload = startGame;
  