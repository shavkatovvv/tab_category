const url = "https://product-feedback-data.vercel.app"
const urlCategory = "https://product-feedback-data.vercel.app/category"



export const getData = async (item) => {
    const res = await fetch(`${url}/${item || `all`}`)
    const data = await res.json()

    return data
}

export const Gettab = async () => {
    const res = await fetch(`${urlCategory}`)
    const data = await res.json()

    return data
}





