const minimax = function(position, depth, maximizingPlayer) {
  if (depth == 0 || position == gameOver) {
    return position;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    position.forEach(child => {
      const evaluation = minimax(child, depth - 1, false);
      maxEval = max(maxEval, evaluation);
    });
    return maxEval;
  } else {
    let minEval = +Infinity;
    position.forEach(child => {
      const evaluation = minimax(child, depth - 1, true);
      minEval = min(minEval, evaluation);
    });
    return minEval;
  }
}