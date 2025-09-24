# manejo de valores infinitos
import math
import decimal

infinito_positivo = float('inf')
print(f'infinito positivo: {infinito_positivo}')
print(f'Es infinito?: {math.isinf(infinito_positivo)}')

infinito_negativo = float('-inf')
print(f'infinito negativo: {infinito_negativo}')
print(f'Es infinito?: {math.isinf(infinito_negativo)}')

infinito_positivo = math.inf
print(f'infinito positivo: {infinito_positivo}')
print(f'Es infinito?: {math.isinf(infinito_positivo)}')

infinito_negativo = -math.inf
print(f'infinito negativo: {infinito_negativo}')
print(f'Es infinito?: {math.isinf(infinito_negativo)}')

infinito_positivo = decimal.Decimal('Infinity')
print(f'infinito positivo decimal: {infinito_positivo}')
print(f'Es infinito?: {infinito_positivo.is_infinite()}')

