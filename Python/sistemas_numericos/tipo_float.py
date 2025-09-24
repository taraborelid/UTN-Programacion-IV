# Profundizando en el tipo float
a = 3.0
print(f"a float: {a:.2f}")

# Constructor de tipo float -> puede recibir int y str
a = float(10) # Le pasamos un tipo entero
a = float('10')
print(f"a float: {a:.2f}")

# Notacion exponencial (valores positivos o negativos)
a = 3e50
print(f"a: {a}")

a = 3e-5
print(f"a: {a:.5f}")

# Cualuqie calculo que incluye float, todo cambia a float

a = 4.0 + 5
print(a)
print(type(a))