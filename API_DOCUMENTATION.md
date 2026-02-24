# API Documentation

This documentation outlines the available endpoints for the Pokémon Online Server.

## 1. GTS (Global Trade System) Routes (`/gts`)

*   **Base URL:** `/gts`

*   **GET /list**
    *   **Description:** Retrieves a list of all Pokémon currently available on the GTS.
    *   **Request Body:** None
    *   **Response:**
        *   **Status 200 (OK):**
            ```json
            [
              {
                "_id": "654321...",
                "species": "Pikachu",
                "level": 5,
                "moves": ["Thunder Shock", "Growl"],
                "owner": {
                  "_id": "123456...",
                  "name": "Ash",
                  "trainerId": "ash123"
                },
                "onGTS": true,
                "__v": 0
              },
              {
                "_id": "765432...",
                "species": "Charizard",
                "level": 36,
                "moves": ["Ember", "Slash"],
                "owner": {
                  "_id": "987654...",
                  "name": "Brock",
                  "trainerId": "brock456"
                },
                "onGTS": true,
                "__v": 0
              }
            ]
            ```
        *   **Status 500 (Internal Server Error):**
            ```json
            { "message": "Failed to retrieve GTS listings" }
            ```

*   **POST /add**
    *   **Description:** Adds a Pokémon to the GTS.
    *   **Request Body:**
        ```json
        {
          "species": "Bulbasaur",
          "level": 1,
          "moves": ["Tackle", "Growl"],
          "trainerId": "misty789"
        }
        ```
    *   **Response:**
        *   **Status 201 (Created):**
            ```json
            {
              "message": "Pokémon added to GTS successfully",
              "pokemon": {
                "species": "Bulbasaur",
                "level": 1,
                "moves": ["Tackle", "Growl"],
                "owner": "654987...",
                "onGTS": true,
                "_id": "321654...",
                "__v": 0
              }
            }
            ```
        *   **Status 400 (Bad Request):**
            ```json
            { "message": "Trainer not found" }
            ```
        *   **Status 500 (Internal Server Error):**
            ```json
            { "message": "Failed to add Pokémon to GTS" }
            ```

## 2. Trade Routes (`/trade`)

*   **Base URL:** `/trade`

*   **POST /offer**
    *   **Description:** Creates a new trade offer between two trainers.
    *   **Request Body:**
        ```json
        {
          "offerer": "654321...", // Trainer ID of the offerer
          "offeredPokemon": "987654...", // Pokémon ID offered by the offerer
          "recipient": "123456...", // Trainer ID of the recipient
          "requestedPokemon": "321654..." // Pokémon ID requested by the offerer
        }
        ```
    *   **Response:**
        *   **Status 201 (Created):**
            ```json
            {
              "message": "Trade offer created",
              "trade": {
                "offerer": "654321...",
                "offeredPokemon": "987654...",
                "recipient": "123456...",
                "requestedPokemon": "321654...",
                "status": "pending",
                "_id": "456789...",
                "__v": 0
              }
            }
            ```
        *   **Status 500 (Internal Server Error):**
            ```json
            { "message": "Failed to create trade offer" }
            ```

*   **GET /pending/:trainerId**
    *   **Description:** Retrieves a list of all pending trades for a specific trainer.
    *   **Request Parameters:**
        *   `trainerId`: The ID of the trainer.
    *   **Request Body:** None
    *   **Response:**
        *   **Status 200 (OK):**
            ```json
            [
              {
                "_id": "112233...",
                "offerer": {
                  "_id": "654321...",
                  "name": "Ash"
                },
                "offeredPokemon": {
                  "_id": "987654...",
                  "species": "Pikachu"
                },
                "recipient": "123456...",
                "requestedPokemon": "321654...",
                "status": "pending",
                "__v": 0
              }
            ]
            ```
        *   **Status 500 (Internal Server Error):**
            ```json
            { "message": "Failed to retrieve pending trades" }
            ```

*   **POST /wonder-trade**
    *   **Description:** Initiates a Wonder Trade by offering a Pokémon.
    *   **Request Body:**
        ```json
        {
          "offerer": "789012...", // Trainer ID of the offerer
          "offeredPokemon": "432109..." // Pokémon ID offered for Wonder Trade
        }
        ```
    *   **Response:**
        *   **Status 201 (Created):**
            ```json
            {
              "message": "Wonder Trade initiated",
              "trade": {
                "offerer": "789012...",
                "offeredPokemon": "432109...",
                "tradeType": "wonder",
                "status": "pending",
                "_id": "901234...",
                "__v": 0
              }
            }
            ```
        *   **Status 500 (Internal Server Error):**
            ```json
            { "message": "Failed to initiate Wonder Trade" }
            ```

*   **GET /wonder-trade/retrieve/:trainerId**
    *   **Description:** Retrieves the Pokémon received from a Wonder Trade.
    *   **Request Parameters:**
        *   `trainerId`: The ID of the trainer retrieving the Wonder Trade.
    *   **Request Body:** None
    *   **Response:**
        *   **Status 200 (OK):**
            ```json
            {
              "message": "Wonder Trade retrieved",
              "trade": {
                "_id": "567890...",
                "offerer": {
                  "_id": "234567...",
                  "name": "Gary"
                },
                "offeredPokemon": {
                  "_id": "876543...",
                  "species": "Eevee"
                },
                "recipient": "789012...",
                "requestedPokemon": "432109...",
                "tradeType": "wonder",
                "status": "completed",
                "__v": 0
              }
            }
            ```
        *   **Status 404 (Not Found):**
            ```json
            { "message": "No Wonder Trade available" }
            ```
        *   **Status 500 (Internal Server Error):**
            ```json
            { "message": "Failed to retrieve Wonder Trade" }
            ```

## 3. Battle Routes (`/battle`)

*   **Base URL:** `/battle`

*   **POST /start**
    *   **Description:** Starts a new battle.  (Placeholder - Implementation Needed)
    *   **Request Body:**  (To be defined - depends on how battle setup is handled)
    *   **Response:**
        *   **Status 200 (OK):**
            ```json
            { "message": "Battle started" }
            ```

**Notes:**

*   This documentation assumes a basic understanding of RESTful API principles.
*   Error responses (4xx and 5xx) may contain additional information in a `message` field.
*   The `_id` fields are placeholders. These will be replaced with actual MongoDB ObjectIDs.
*   The `// Implementation Needed` comments indicate areas where you will need to add your own code to handle the logic.
*   You will need to adapt the `/battle/start` route depending on how you want to initiate a battle.
