# URL base de la API
$baseUrl = "http://localhost:3000"

# Crear una categoría
Write-Host "Creando una categoría..."
Invoke-RestMethod -Uri "$baseUrl/categories" -Method Post -ContentType "application/json" -Body '{
  "name": "Electronics",
  "description": "Devices and gadgets"
}'
Write-Host "Categoría creada. Se logró."
Start-Sleep -Seconds 2

# Obtener todas las categorías
Write-Host "Obteniendo todas las categorías..."
Invoke-RestMethod -Uri "$baseUrl/categories" -Method Get
Write-Host "Categorías obtenidas. Se logró."
Start-Sleep -Seconds 2

# Obtener una categoría por ID
Write-Host "Obteniendo una categoría por ID..."
Invoke-RestMethod -Uri "$baseUrl/categories/1" -Method Get
Write-Host "Categoría obtenida. Se logró."
Start-Sleep -Seconds 2
# Crear un producto
Write-Host "Creando un producto1..."
Invoke-RestMethod -Uri "$baseUrl/products" -Method Post -ContentType "application/json" -Body '{
  "name": "Smartphone",
  "price": 699.99,
  "stock": 50,
  "categoryId": 1
}'
Write-Host "Producto creado. Se logró."
Start-Sleep -Seconds 2

Write-Host "Creando un producto2..."
Invoke-RestMethod -Uri "$baseUrl/products" -Method Post -ContentType "application/json" -Body '{
  "name": "celular",
  "price": 699.99,
  "stock": 50,
  "categoryId": 1
}'
Write-Host "Producto creado. Se logró."
Start-Sleep -Seconds 2

# Obtener todos los productos
Write-Host "Obteniendo todos los productos..."
Invoke-RestMethod -Uri "$baseUrl/products" -Method Get
Write-Host "Productos obtenidos. Se logró."
Start-Sleep -Seconds 2

# Obtener un producto por ID
Write-Host "Obteniendo un producto por ID..."
Invoke-RestMethod -Uri "$baseUrl/products/1" -Method Get
Write-Host "Producto obtenido. Se logró."
Start-Sleep -Seconds 2
Write-Host "Producto actualizado. Se logró."
Start-Sleep -Seconds 2

# Listar productos por categoría
Write-Host "Listando productos por categoría..."
Invoke-RestMethod -Uri "$baseUrl/products/category/1" -Method Get
Write-Host "Productos listados por categoría. Se logró."
Start-Sleep -Seconds 2

Write-Host "Pruebas completadas."




# Registro de usuario
Write-Host "Registrando un usuario..."
$userResponse = Invoke-RestMethod -Uri "$baseUrl/users/register" -Method Post -ContentType "application/json" -Body '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}'
Write-Host "Usuario registrado. Se logró."
Start-Sleep -Seconds 2

# Inicio de sesión
Write-Host "Iniciando sesión..."
$loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -ContentType "application/json" -Body '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
$token = $loginResponse.access_token
Write-Host "Sesión iniciada. Se logró."
Start-Sleep -Seconds 2

# Crear un pedido
Write-Host "Creando un pedido..."
Invoke-RestMethod -Uri "$baseUrl/orders" -Method Post -ContentType "application/json" -Headers @{ Authorization = "Bearer $token" } -Body '{
  "userId": 1,
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}'
Write-Host "Pedido creado. Se logró."
Start-Sleep -Seconds 2

# Listar pedidos
Write-Host "Listando pedidos..."
Invoke-RestMethod -Uri "$baseUrl/orders" -Method Get -Headers @{ Authorization = "Bearer $token" }
Write-Host "Pedidos listados. Se logró."
Start-Sleep -Seconds 2

# Obtener un pedido por ID
Write-Host "Obteniendo un pedido por ID..."
Invoke-RestMethod -Uri "$baseUrl/orders/1" -Method Get -Headers @{ Authorization = "Bearer $token" }
Write-Host "Pedido obtenido. Se logró."
Start-Sleep -Seconds 2

# Actualizar un pedido
Write-Host "Actualizando un pedido..."
Invoke-RestMethod -Uri "$baseUrl/orders/1" -Method Put -ContentType "application/json" -Headers @{ Authorization = "Bearer $token" } -Body '{
  "userId": 1,
  "items": [
    { "productId": 1, "quantity": 3 },
    { "productId": 2, "quantity": 2 }
  ]
}'
Write-Host "Pedido actualizado. Se logró."
Start-Sleep -Seconds 2

# Eliminar un pedido
Write-Host "Eliminando un pedido..."
Invoke-RestMethod -Uri "$baseUrl/orders/1" -Method Delete -Headers @{ Authorization = "Bearer $token" }
Write-Host "Pedido eliminado. Se logró."
Start-Sleep -Seconds 2

Write-Host "Pruebas completadas."