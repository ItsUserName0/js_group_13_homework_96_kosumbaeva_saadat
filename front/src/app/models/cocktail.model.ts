export interface Ingredients {
  ingTitle: string,
  ingAmount: string,
}

export interface Cocktail {
  _id: string,
  title: string,
  image: null | string,
  recipe: string,
  is_published: boolean,
  ingredients: [Ingredients],
}

export interface CocktailData {
  [key: string]: any,

  title: string,
  image: null | File,
  recipe: string,
  ingredients: [Ingredients],
}

export interface FieldError {
  message: string,
}

export interface CreateError {
  errors: {
    title: FieldError,
  },
}
