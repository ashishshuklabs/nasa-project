export type Pokemon = {
    id: number,
    name: string,
    base_experience: number
    height: number
    is_default: boolean,
    order: number
    weight: number,
    location_area_encounters: string,
    sprites?:{
        back_default: string,
        back_shiny: string,
        front_default: string,
        front_shiny: string
    }
}

export type CustomError = {
    type: 'error'
    data: {
        message: string,
    }
}

export type Success = {
    type: 'success',
    data: Pokemon
}

export type PokeResponse = CustomError | Success

export const returnSuccess = (data: Pokemon): Success => ({
    type: 'success',
    data
})

export const returnError = (error: Error): CustomError => ({
    type: 'error',
    data: {
        message: error.message
    }
})