# Memory Card Game

## Description

This is an interactive memory matching game where players are challenged to find matching pairs of images hidden beneath cards arranged in a 4x4 grid. The game tests and improves memory skills by requiring players to remember the positions of matching images.

## Game Features

- **Grid Layout**: A 4x4 grid with 16 cards, each initially displaying a question mark.
- **Matching Logic**: 8 pairs of matching images are randomly placed under the cards.
- **Card Flipping**: Players can click on two cards to flip them and reveal the images underneath.
- **Matching Animation**: If the two selected cards match, a success animation plays, and the cards remain visible.
- **Mismatch Animation**: If the selected cards don't match, a failure animation plays, and the cards flip back to show the question mark.
- **Game Reset**: When all pairs are successfully matched, the game automatically restarts.
- **Smooth Animations**: Includes animations for:
  - Flipping the cards to reveal images.
  - Flipping the cards back to the question mark when the images don't match.
  - Success animation when a pair is correctly matched.
  - Failure animation when a pair is incorrectly matched.

## Technologies Used

- **HTML**: To structure the game grid and card elements.
- **Tailwind CSS**: For styling and responsive layout with utility-first CSS classes.
- **JavaScript/TypeScript**: To handle the game logic, including shuffling, matching, and animations.
