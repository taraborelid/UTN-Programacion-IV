import math
from decimal import Decimal

a = float('1.5')
print(f'a: {a}')

a = float('1.5')
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(a)}')

a = Decimal('NaN')
print(f'Es de tipo NaN(Not a Number)?: {a.is_nan()}')