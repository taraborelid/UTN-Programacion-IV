'''
Introduccion a Analisis de Datos - Clase 2

Grupo: CodeTitans
Integrantes: Leandro Gonzales
	        Guillermo Pacheco
            Denis Taraboreli
            Ignacio Villarraza
            Martiniano Zallocco

Actividad 1:

1.
Categoricas: Nombre, Carrera
Numericas: Edad, Nota

2.
Promedio de la columna Nota: 35/5 = 7.0

3.
Ana, Carla, Sofia -> 3 alumnos

4. 
La mayor nota es 9 de Carla.

'''
 #Actividad 2:

class Auto: 
    def __init__(self, marca, color):
        self.marca = marca
        self.color = color

    def __str__(self):
        return f"Marca: {self.marca}, Color: {self.color}"
    
    
# Instanciamos
auto1 = Auto("Toyota", "Rojo")
auto2 = Auto("Ford", "Azul")
auto3 = Auto("Volkswagen", "Verde")

print(auto1)
print(auto2)
print(auto3)

'''
Una instancia es un objeto concreto creado a partir de una clase. La clase es el molde que define
los atributos y comportamientos del objeto, en este caso marca y color, y un objeto es un espacio
en memoria que guarda tanto los atributos(datos) como metodos(funciones) definidos en su clase.
Es decir que una instancia de una clase es un objeto que tiene su propio estado y comportamiento,
independiente de otras instancias de la misma clase.
'''