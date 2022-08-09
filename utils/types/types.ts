export type ProductType = {
    id: number
    title: string
    slug: string
    is_second_hand: boolean
    price: string
    is_new: boolean
    in_stock: boolean
    image: {
        desktop: {
            x1: string
        },
    }
}

export type FilterItemType = {
    title: string
    value: string
}

export type FiltersType = {
    min: string
    max: string
    title: string
    type: 'range' | 'checkbox' | 'multiple'
    slug:string
    items: Array<FilterItemType>
}

export type ResponseType = {
    meta: {
        total: number
    }
    products: Array<ProductType>
    filters: Array<FiltersType>
}

