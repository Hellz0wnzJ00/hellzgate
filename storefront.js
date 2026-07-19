(function () {
  "use strict";

  var config = window.HELLZGATE_STORE || {};
  var comingSoon = document.getElementById("store-coming-soon");
  var productsNode = document.getElementById("store-products");
  var stateNode = document.getElementById("store-state");
  var errorNode = document.getElementById("store-error");

  if (!comingSoon || !productsNode || !stateNode || !errorNode) return;
  if (!config.enabled) return;

  if (!isValidConfig(config)) {
    showError("The store is not available yet. Follow the build for availability updates.");
    return;
  }

  loadProducts().catch(function () {
    showError("The store could not be reached. Please try again later.");
  });

  function isValidConfig(value) {
    return /^([a-z0-9-]+\.)*myshopify\.com$/i.test(value.domain || "") &&
      typeof value.storefrontAccessToken === "string" &&
      value.storefrontAccessToken.length > 10 &&
      Array.isArray(value.productHandles) &&
      value.productHandles.length > 0;
  }

  function endpoint() {
    return "https://" + config.domain + "/api/" + config.apiVersion + "/graphql.json";
  }

  function request(query, variables) {
    return fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": config.storefrontAccessToken
      },
      body: JSON.stringify({ query: query, variables: variables || {} })
    }).then(function (response) {
      if (!response.ok) throw new Error("Storefront request failed");
      return response.json();
    }).then(function (payload) {
      if (payload.errors || !payload.data) throw new Error("Storefront response was invalid");
      return payload.data;
    });
  }

  function loadProducts() {
    var query = [
      "query Products {",
      "  products(first: 20, query: \"status:active\") {",
      "    nodes {",
      "      handle title description availableForSale",
      "      featuredImage { url altText }",
      "      variants(first: 1) { nodes { id availableForSale price { amount currencyCode } } }",
      "    }",
      "  }",
      "}"
    ].join("\n");

    return request(query).then(function (data) {
      var allowed = config.productHandles.reduce(function (set, handle) {
        set[String(handle).toLowerCase()] = true;
        return set;
      }, {});
      var products = data.products.nodes.filter(function (product) {
        return allowed[String(product.handle).toLowerCase()];
      });
      if (!products.length) throw new Error("No configured products were found");
      renderProducts(products);
    });
  }

  function renderProducts(products) {
    productsNode.textContent = "";
    products.forEach(function (product) {
      var variant = product.variants.nodes[0];
      if (!variant) return;

      var card = document.createElement("article");
      card.className = "store-product-card";

      if (product.featuredImage) {
        var image = document.createElement("img");
        image.src = product.featuredImage.url;
        image.alt = product.featuredImage.altText || product.title;
        image.loading = "lazy";
        card.appendChild(image);
      }

      var body = document.createElement("div");
      body.className = "store-product-card-body";
      var title = document.createElement("h3");
      title.textContent = product.title;
      var description = document.createElement("p");
      description.textContent = product.description;
      var price = document.createElement("div");
      price.className = "store-price";
      price.textContent = formatMoney(variant.price.amount, variant.price.currencyCode);
      var button = document.createElement("button");
      button.className = "btn btn-red";
      button.type = "button";
      button.textContent = variant.availableForSale ? "Buy now" : "Unavailable";
      button.disabled = !variant.availableForSale;
      if (variant.availableForSale) {
        button.addEventListener("click", function () { beginCheckout(variant.id, button); });
      }

      body.appendChild(title);
      body.appendChild(description);
      body.appendChild(price);
      body.appendChild(button);
      card.appendChild(body);
      productsNode.appendChild(card);
    });

    comingSoon.hidden = true;
    productsNode.hidden = false;
    stateNode.textContent = "Store live";
  }

  function beginCheckout(variantId, button) {
    var mutation = [
      "mutation CartCreate($input: CartInput!) {",
      "  cartCreate(input: $input) {",
      "    cart { checkoutUrl }",
      "    userErrors { message }",
      "  }",
      "}"
    ].join("\n");
    button.disabled = true;
    button.textContent = "Opening checkout...";

    request(mutation, { input: { lines: [{ merchandiseId: variantId, quantity: 1 }] } })
      .then(function (data) {
        if (data.cartCreate.userErrors.length || !data.cartCreate.cart) throw new Error("Checkout unavailable");
        window.location.assign(data.cartCreate.cart.checkoutUrl);
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = "Buy now";
        showError("Checkout could not be started. Please try again.");
      });
  }

  function formatMoney(amount, currencyCode) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(Number(amount));
  }

  function showError(message) {
    errorNode.textContent = message;
    errorNode.style.display = "block";
  }
})();
