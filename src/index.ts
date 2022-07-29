import HangmanGame from './HangmanGame';

const canvas = document.getElementById('canvas');

if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Canvas must be a <canvas> element');
canvas.focus();

const game = new HangmanGame(canvas);

game.start();
