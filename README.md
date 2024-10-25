<div style="text-align: center;">
  <a href="https://newfold.com/" target="_blank">
      <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" height="42" />
  </a>
</div>

# WordPress Products Module

[![Version Number](https://img.shields.io/github/v/release/newfold-labs/wp-module-my-products?color=21a0ed&labelColor=333333)](https://github.com/newfold-labs/wp-module-my-products/releases)
[![License](https://img.shields.io/github/license/newfold-labs/wp-module-my-products?labelColor=333333&color=666666)](https://raw.githubusercontent.com/newfold-labs/wp-module-my-products/master/LICENSE)

A module for rendering user-specific product data utilizing the Hiive Users API, which integrates with the Fulfilment Gateway API.

This module has been discontinued and archived.

## Module Responsibilities

- Displays a list of products associated with the user in a tabular form on the "My Products" page within the brand plugin.
- Provides an API for fetching user products from the Hiive Users API, which integrates with the Fulfilment Gateway API.
- Manages errors gracefully, providing feedback to the user if there are issues with fetching or displaying products.

## Critical Paths

- The "My Products" page should correctly display the list of products associated with the user.
- Any errors in fetching or displaying products should be communicated to the user with appropriate messages.

## Installation

### 1. Add the Newfold Satis to your `composer.json`.

```bash
 composer config repositories.newfold composer https://newfold-labs.github.io/satis
```

### 2. Require the `newfold-labs/wp-module-my-products` package.

```bash
 composer require newfold-labs/wp-module-my-products
```

[More on Newfold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)
