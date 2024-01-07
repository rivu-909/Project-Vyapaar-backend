# Description

-   This is the server side of Project-Vyapaar
-   Provide a server to Bid Ask the prices for regular commodities.

## Key features

-   Typescript Node.js backend
-   Ably for RTS
-   tokens for secure communication

## Endpoints

-   base/auth/signUp

    -   POST
    -   body: {phoneNumber, password, name, gstin}
    -   registers the user and sends the auth token, statusCode, userId, name, phoneNumber

-   base/auth/login

    -   POST
    -   body: {phoneNumber, password}
    -   sends the auth token, statusCode, userId, name, phoneNumber

-   base/product/all

    -   GET
    -   Headers: Authorization: token
    -   sends all the products

-   base/product/:productId

    -   GET
    -   Headers: Authorization: token
    -   sends the product details

-   base/product/new

    -   POST
    -   Headers: Authorization: token
    -   body : {name, price, description}
    -   registers a new product

-   base/product/update/:productId

    -   PUT
    -   Headers: Authorization: token
    -   body : {category, quantity, price, address, description}
    -   updates the product

-   base/product/delete/:productId

    -   DELETE
    -   Headers: AUthorization: token
    -   deletes the product

-   base/trade/new/:productId

    -   POST
    -   Headers: Authorization: token
    -   body : {price, quantity, type, address}
    -   registers a new product

-   base/trade/update/:tradeId

    -   POST
    -   Headers: Authorization: token
    -   body : {price, quantity, type, address}
    -   registers a new product

-   base/trade/delete/:tradeId

    -   DELETE
    -   Headers: AUthorization: token
    -   deletes the trade

-   base/news
    -   GET
    -   Headers: Authrization: token
    -   fetches the news

NOTE: base is the base url
