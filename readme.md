# Revenue API Documentation

This document provides information about the Revenue calculation APIs available in our system.

## API Endpoints

| Route | Method | Query Parameters | Description |
|-------|--------|------------------|-------------|
| `/api/revenue/total` | GET | `startDate`, `endDate` | Calculates total revenue for the specified date range |
| `/api/revenue/by-category` | GET | `startDate`, `endDate` | Returns revenue breakdown by product category |
| `/api/revenue/by-product` | GET | `startDate`, `endDate` | Returns revenue breakdown by individual products |
| `/api/revenue/by-region` | GET | `startDate`, `endDate` | Returns revenue breakdown by geographical region |

## Request Parameters

All endpoints require the following query parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | String | Yes | Start date in YYYY-MM-DD format |
| `endDate` | String | Yes | End date in YYYY-MM-DD format |

## API Details

### Get Total Revenue

Calculates the total revenue across all products for a specified date range.

**Endpoint:** `/api/revenue/total`  
**Method:** GET  
**Query Parameters:** `startDate`, `endDate`

**Sample Request:**
```
GET /api/revenue/total?startDate=2023-01-01&endDate=2023-12-31
```

**Sample Response:**
```json
{
  "message": "SUCCESS",
  "data": {
    "totalRevenue": 15420.50,
    "productRevenue": 14980.25,
    "shippingRevenue": 440.25,
    "totalOrders": 120,
    "totalItems": 350,
    "averageOrderValue": 128.50
  }
}
```

### Get Revenue by Category

Returns a breakdown of revenue by product category for a specified date range.

**Endpoint:** `/api/revenue/by-category`  
**Method:** GET  
**Query Parameters:** `startDate`, `endDate`

**Sample Request:**
```
GET /api/revenue/by-category?startDate=2023-01-01&endDate=2023-12-31
```

**Sample Response:**
```json
{
  "message": "SUCCESS",
  "data": [
    {
      "category": "Electronics",
      "totalRevenue": 8540.35,
      "productRevenue": 8250.10,
      "shippingRevenue": 290.25,
      "totalQuantity": 42,
      "totalOrders": 38,
      "uniqueProducts": 5,
      "averageOrderValue": 224.75
    },
    {
      "category": "Clothing",
      "totalRevenue": 4210.75,
      "productRevenue": 4110.75,
      "shippingRevenue": 100.00,
      "totalQuantity": 215,
      "totalOrders": 65,
      "uniqueProducts": 12,
      "averageOrderValue": 64.78
    },
    {
      "category": "Shoes",
      "totalRevenue": 2669.40,
      "productRevenue": 2619.40,
      "shippingRevenue": 50.00,
      "totalQuantity": 93,
      "totalOrders": 17,
      "uniqueProducts": 4,
      "averageOrderValue": 157.02
    }
  ]
}
```

### Get Revenue by Product

Returns a breakdown of revenue by individual products for a specified date range.

**Endpoint:** `/api/revenue/by-product`  
**Method:** GET  
**Query Parameters:** `startDate`, `endDate`

**Sample Request:**
```
GET /api/revenue/by-product?startDate=2023-01-01&endDate=2023-12-31
```

**Sample Response:**
```json
{
  "message": "SUCCESS",
  "data": [
    {
      "productID": "P456",
      "productName": "iPhone 15 Pro",
      "totalRevenue": 3717.15,
      "productRevenue": 3702.15,
      "shippingRevenue": 15.00,
      "totalQuantity": 3,
      "totalOrders": 2,
      "avgUnitPrice": 1299.00,
      "avgDiscount": 0.025,
      "revenuePerUnit": 1234.05
    },
    {
      "productID": "P234",
      "productName": "Sony WH-1000XM5 Headphones",
      "totalRevenue": 297.49,
      "productRevenue": 285.49,
      "shippingRevenue": 12.00,
      "totalQuantity": 1,
      "totalOrders": 1,
      "avgUnitPrice": 349.99,
      "avgDiscount": 0.15,
      "revenuePerUnit": 285.49
    },
    {
      "productID": "P123",
      "productName": "UltraBoost Running Shoes",
      "totalRevenue": 486.00,
      "productRevenue": 468.00,
      "shippingRevenue": 18.00,
      "totalQuantity": 3,
      "totalOrders": 2,
      "avgUnitPrice": 180.00,
      "avgDiscount": 0.05,
      "revenuePerUnit": 156.00
    }
  ]
}
```

### Get Revenue by Region

Returns a breakdown of revenue by geographical region for a specified date range.

**Endpoint:** `/api/revenue/by-region`  
**Method:** GET  
**Query Parameters:** `startDate`, `endDate`

**Sample Request:**
```
GET /api/revenue/by-region?startDate=2023-01-01&endDate=2023-12-31
```

**Sample Response:**
```json
{
  "message": "SUCCESS",
  "data": [
    {
      "region": "North America",
      "totalRevenue": 6452.94,
      "productRevenue": 6342.94,
      "shippingRevenue": 110.00,
      "totalQuantity": 152,
      "totalOrders": 45,
      "uniqueCustomers": 28,
      "averageOrderValue": 143.40
    },
    {
      "region": "Europe",
      "totalRevenue": 5236.15,
      "productRevenue": 5056.15,
      "shippingRevenue": 180.00,
      "totalQuantity": 98,
      "totalOrders": 42,
      "uniqueCustomers": 31,
      "averageOrderValue": 124.67
    },
    {
      "region": "Asia",
      "totalRevenue": 2543.91,
      "productRevenue": 2448.91,
      "shippingRevenue": 95.00,
      "totalQuantity": 76,
      "totalOrders": 22,
      "uniqueCustomers": 18,
      "averageOrderValue": 115.63
    },
    {
      "region": "South America",
      "totalRevenue": 1187.50,
      "productRevenue": 1132.25,
      "shippingRevenue": 55.25,
      "totalQuantity": 24,
      "totalOrders": 11,
      "uniqueCustomers": 9,
      "averageOrderValue": 107.96
    }
  ]
}
```

## Error Responses

All endpoints return similar error responses:

### Missing Date Parameters

```json
{
  "message": "Both startDate and endDate are required"
}
```

### Invalid Date Format

```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format"
}
```

### Server Error

```json
{
  "success": false,
  "message": "Failed to calculate revenue by product",
  "error": "Error details here"
}
```

## Notes

- All dates should be provided in YYYY-MM-DD format
- Revenue calculations include both product revenue and shipping costs
- Results are sorted by total revenue in descending order (highest first)
- The `/api/revenue/by-product` endpoint can accept an optional `limit` parameter to restrict the number of results