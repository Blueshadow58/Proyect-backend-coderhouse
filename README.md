
# API - Desafio Coderhouse

## Instalación

Instalación del proyecto

```bash
  git clone https://github.com/Blueshadow58/Proyect-backend-coderhouse.git
  cd Proyect-backend-coderhouse
  npm install 
  npm start  
```
    
## Herramientas & tecnologias utilizadas 

- Node.js + Express
- Typescript
- Postman
- Firebase
- MongoDb
- FileSystem


## API Referencia

- Producto Tipo de dato / data type
```
  [
    {
      "id": int,
      "nombre": string,
      "descripcion": string,
      "codigo": string,
      "foto": string,
      "precio": int,
      "stock": int
    }
  ]
```
- Carrito Tipo de dato / data type
```
  [
    {
      id: int,
      productos: array
    }
  ]
```

#### **GET** |  Productos
- URL: /api/productos


Retorna una lista de productos: 
```
  [
    {
      "id": 67,
      "nombre": "mackbook air",
      "descripcion": "computadora ultraliviana",
      "codigo": "AAAS2",
      "foto": "https://http2.mlstatic.com/D_NQ_NP_613008-MLA48625634506_122021-O.jpg",
      "precio": 980000,
      "stock": 32
    },
    {
      "id": 154,
      "nombre": "Iphone 13",
      "descripcion": "Iphone 13 color dorado",
      "codigo": "AAAD7",
      "foto": "https://www.startech.cl/wp-content/uploads/2021/09/iphone-13-pro-gold-select.png",
      "precio": 850000,
      "stock": 32
    },
    ...
  ]
```

#### **GET** | Producto por id

- URL: /api/productos/${id}


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id requerido para la consulta |

Retorna el producto con el id ingresado: ej: /api/products/5

```
 [
    {
      "id": 5,
      "nombre": "Ipad 10.2",
      "descripcion": "Ipad version 2020"
      "codigo": "AS56"
      "foto": "https://ww2.movistar.cl/equipos/apple/assets/img/ipad/ipad-10-9th.png",
      "precio": 380000,
      "stock": 23
    },        
  ]

```

#### **POST** | Crear producto

- URL: /api/productos

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Nombre del producto|
| `descripcion`      | `string` | Descripcion del producto |
| `codigo`      | `string` | Codigo del producto |
| `foto`      | `string` | Foto del producto |
| `precio`      | `int` | Precio del producto |
| `stock`      | `int` |  Stock del producto |

Retorna la creacion de dicho producto en conjunto con un id

#### **PUT** | Actualizar producto

- URL: /api/productos:id

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id requerido para la consulta |
| `name`      | `string` | Nombre del producto|
| `descripcion`      | `string` | Descripcion del producto |
| `codigo`      | `string` | Codigo del producto |
| `foto`      | `string` | Foto del producto |
| `precio`      | `int` | Precio del producto |
| `stock`      | `int` |  Stock del producto |

#### **DELETE** | Eliminar producto

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id requerido para la consulta |


#### **GET** | Obtener los carritos

- URL: /api/carrito

Retorna todos los carritos

```
  [
    {
      [
        id: 1,
        id: 2,
        id: 3,
        
      ]
    }
  ]
```
#### **POST** | Crear un nuevo carrito

- URL: /api/carrito

Retorna la id del nuevo carrito generado

- URL: /api/carrito:id

#### **DELETE** | Eliminar carrito

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id requerido para la consulta |

#### **GET** | Obtener productos de un carrito

- URL: /api/carrito/:id/productos

Ej: /api/carrito/1/productos

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id requerido para la consulta |


```
  [
    {
      id: 1,
      productos: [
        {
          "id": 67,
          "nombre": "mackbook air",
         "descripcion": "computadora ultraliviana",
          "codigo": "AAAS2",
          "foto": "https://http2.mlstatic.com/D_NQ_NP_613008-MLA48625634506_122021-O.jpg",
         "precio": 980000,
          "stock": 32
        },
        {
          "id": 154,
          "nombre": "Iphone 13",
          "descripcion": "Iphone 13 color dorado",
          "codigo": "AAAD7",
          "foto": "https://www.startech.cl/wp-content/uploads/2021/09/iphone-13-pro-gold-select.png",
          "precio": 850000,
          "stock": 32
        },
        ...
      ]
    }
  ]
```

#### **POST** | Añadir producto a un carrito

- URL: /api/carrito/:id/productos

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id del carrito requerido para la consulta |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id del producto requerido para la consulta |

Realiza el ingreso del producto por id al carrito seleccionado

#### **DELETE** | Añadir producto a un carrito

- URL: /api/carrito/:id/productos/:idProd

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id del carrito requerido para la consulta |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idProd`      | `int` | **Required**. Id del producto requerido para la consulta |

Elimina el producto por id del carrito con id pasado como parametro
## Tecnologias utilizadas

**Server:** Node, Express , Typescript


## 🔗 Links - Portafolio - Linkedin 
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://gamonal-portfolio.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/franco-gamonal-developer/)


