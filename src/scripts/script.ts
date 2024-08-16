/**
 * The game area container element.
 * @type {HTMLElement}
 */
const gameArea = document.querySelector(".game-area")! as HTMLElement;

/**
 * References to the currently active cards being compared.
 * @type {HTMLElement | null}
 */
let firstActiveCard: HTMLElement | null = null;
let secondActiveCard: HTMLElement | null = null;

/**
 * Counter to track the number of matched pairs.
 * @type {number}
 */
let cnt: number = 0;

// prettier-ignore
// Array of SVG file names for the cards.
const svgS: string[] =
                      [ "candy", "cheers", "donut", "hamburger", "ice-cream", "juice", "sausage", "wine" ];

/**
 * Inserts SVG images into the card elements.
 * Each card will have an image representing a food item.
 */
function insertSVGsIntoCards(): void {
  // Create pairs of SVG names and shuffle them
  const svgPairs: string[] = [...svgS, ...svgS].sort(() => Math.random() - 0.5);

  // Append each SVG image to the respective card element
  document.querySelectorAll<HTMLDivElement>(".card")!.forEach((card, i) => {
    const img: HTMLImageElement = document.createElement("img");
    img.src = `../assets/images/${svgPairs[i]}.svg`;
    img.className = "card-img hidden";
    img.alt = `${svgPairs[i]} svg`;

    card.appendChild(img);
  });
}
// Initial call to populate cards with SVG images
insertSVGsIntoCards();

/**
 * Toggles the visibility of the card images.
 * Shows or hides the food image and the question mark image.
 * @param {HTMLElement} card - The card element to toggle images for.
 */
function toggleCardImages(card: HTMLElement): void {
  const [questionMarkImg, foodImg] = [
    card.firstElementChild!,
    card.lastElementChild!,
  ] as HTMLImageElement[];

  setTimeout((): void => {
    foodImg.classList.toggle("hidden");
    questionMarkImg.classList.toggle("hidden");
  }, 200);
}

/**
 * Handles the click event on the game area.
 * Manages the card flip logic and checks for matches.
 * @param {Event} e - The click event object.
 */
gameArea.addEventListener("click", function (e) {
  const clickedCard = (e.target as HTMLElement).closest(
    ".card",
  )! as HTMLElement;

  // Ignore clicks on invalid or already matched cards
  if (
    !clickedCard ||
    clickedCard === firstActiveCard ||
    clickedCard === secondActiveCard ||
    clickedCard.classList.contains("success")
  ) {
    return;
  }

  // Flip cards back if two cards are already active
  if (firstActiveCard && secondActiveCard) {
    [firstActiveCard, secondActiveCard].forEach((card) => {
      toggleCardImages(card);
      card.classList.remove("flip-vertical-right");
    });
    firstActiveCard = null;
    secondActiveCard = null;
  }

  // Select the first and second active cards
  if (!firstActiveCard) {
    firstActiveCard = clickedCard;
    firstActiveCard.classList.add("flip-vertical-right");
    toggleCardImages(firstActiveCard);
  } else if (!secondActiveCard) {
    secondActiveCard = clickedCard;
    secondActiveCard.classList.add("flip-vertical-right");
    toggleCardImages(secondActiveCard);
  }

  // Check if the selected cards match
  if (firstActiveCard && secondActiveCard) {
    const [foodImg1, foodImg2] = [
      firstActiveCard.lastElementChild!,
      secondActiveCard.lastElementChild!,
    ] as HTMLImageElement[];

    if (foodImg1.src === foodImg2.src) {
      setTimeout(() => {
        // Add success and animation classes to matched cards
        [firstActiveCard!, secondActiveCard!].forEach((card) => {
          card.classList.add(
            "success",
            "animate__animated",
            "animate__jackInTheBox",
          );
        });
        firstActiveCard = null;
        secondActiveCard = null;
      }, 500);

      // Increment match counter and check for game completion
      if (++cnt === 8) {
        setTimeout(() => {
          gameArea.classList.add("animate__animated", "animate__hinge");

          setTimeout(resetGame, 4000); // Reset game after hinge animation
        }, 1000); // Delay before adding hinge animation
        cnt = 0;
      }
    }
  }
});

/**
 * Resets the game state.
 * Removes all success and animation classes from cards, clears images, and re-inserts them.
 */
function resetGame(): void {
  document.querySelectorAll<HTMLDivElement>(".card")!.forEach((card) => {
    card.classList.remove(
      "success",
      "flip-vertical-right",
      "animate__animated",
      "animate__jackInTheBox",
    );
    card.removeChild(card.lastElementChild!); // Remove the last image
    (card.firstElementChild! as HTMLImageElement)!.classList.remove("hidden"); // Show the question mark image
  });
  insertSVGsIntoCards(); // Reinsert SVGs for a new game
  gameArea.classList.remove("animate__animated", "animate__hinge"); // Remove hinge animation
}
