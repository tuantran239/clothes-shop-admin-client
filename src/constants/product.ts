type ObjType = {
  [key: string]: any
}

export const GenderProduct: ObjType = {
  MEN: 'MEN',
  WOMEN: 'WOMEN'
}

export const ColorProduct: ObjType = {
  BLACK: {
    name: 'BLACK',
    hex: '#1e2124'
  },
  BROWN: {
    name: 'BROWN',
    hex: '#c68642'
  },
  BLUE: {
    name: 'BLUE',
    hex: '#005b96'
  },
  PINK: {
    name: 'PINK',
    hex: '#ffbdbd'
  },
  GREY: {
    name: 'GREY',
    hex: '#777777'
  },
  GREEN: {
    name: 'GREEN',
    hex: '#baffc9'
  },
  MULTICOLOUR: {
    name: 'MULTICOLOUR',
    hex: '#'
  },
  ORANGE: {
    name: 'ORANGE',
    hex: '#ffa31a'
  },
  RED: {
    name: 'RED',
    hex: '#d9534f'
  },
  YELLOW: {
    name: 'YELLOW',
    hex: '#fbffcb'
  },
  WHITE: {
    name: 'WHITE',
    hex: '#f7f7f7'
  }
}

export const SizeProduct: ObjType = {
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL'
}

export const CategoriesProduct: ObjType = {
  BLAZERS: 'BLAZERS',
  COATS: 'COATS',
  DRESSES: 'DRESSES',
  JACKETS: 'JACKETS',
  JEANS: 'JEANS',
  SHIRTS: 'SHIRTS',
  SHORTS: 'SHORTS',
  SKIRTS: 'SKIRTS',
  SUITS: 'SUITS',
  TOP: 'TOP',
  'T-SHIRT': 'T-SHIRT',
  PANTS: 'PANTS'
}

export const MaxQuantity = 10

export const OrderState: ObjType = {
  PLACEMENT: 'placement',
  CHECKED: 'checked',
  PAYMENT: 'payment',
  DELIVERY: 'delivery',
  SUCCESS: 'success'
}
