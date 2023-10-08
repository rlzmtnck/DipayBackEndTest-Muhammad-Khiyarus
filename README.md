
# Rest API with NodeJs [Technical Test Backend - Dipay]

MUHAMMAD KHIYARUS SYIAM

Ini adalah Technical Test saya sebagai backend di DIPAY, Membuat Rest API dengan Node Js

## How To Run API


```bash
  nodemon server.js
```



## List API

#### Get Countries

```http
  GET /api/v1/countries
```

#### Add Company

```http
  POST /api/v1/companies/add
```

#### Get Companies

```http
  GET /api/v1/companies
```
#### Set Active Company

```http
  PUT /api/v1/companies/:id/set_active
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your token     |
#### Duplicate Zero

```http
  POST /duplicateZeros
```
#### Update Employee

```http
  POST /api/v1/employees/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your token     |

#### Delete Employee

```http
  DEL /api/v1/employees/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your token     |

#### Admin Login

```http
  POST /api/v1/admin/login
```

#### Get Employee by Company ID

```http
  GET /api/v1/companies/:id/employees
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your token     |



#### Get Employee by ID

```http
  GET /api/v1/employees/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your token      


#### Add Employee

```http
  POST /api/v1/employees/add
