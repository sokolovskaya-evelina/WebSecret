import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import axios from "axios";
import StyledInput from "../components/StyledInput/StyledInput";
import Image, {ImageLoaderProps} from 'next/image'
import {FilterItemType, FiltersType, ProductType, ResponseType} from "../utils/types/types";
import {ChangeEvent, useEffect, useState} from "react";

const myLoader = ({src}: ImageLoaderProps) => {
    return `${src}`
}

const likeIcon = <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M24.2286 17.936L16.4034 25.187C16.3644 25.2231 16.3133 25.2432 16.2602 25.2432C16.207 25.2432 16.1559 25.2231 16.1169 25.187L8.29171 17.936C7.73688 17.4219 7.29211 16.8007 6.98433 16.1097C6.67654 15.4188 6.51215 14.6726 6.50109 13.9163C6.49002 13.16 6.63253 12.4093 6.91997 11.7097C7.20741 11.01 7.63382 10.376 8.17338 9.84592C8.71295 9.31584 9.35445 8.90078 10.0591 8.6258C10.7637 8.35081 11.5168 8.22161 12.2728 8.24609C13.0288 8.27057 13.7719 8.4482 14.4573 8.7682C15.1426 9.08819 15.756 9.54392 16.2601 10.1078C16.7643 9.54405 17.3776 9.08843 18.0629 8.76855C18.7482 8.44867 19.4913 8.27118 20.2472 8.24676C21.0032 8.22234 21.7562 8.35148 22.4607 8.62646C23.1653 8.90145 23.8067 9.31651 24.3462 9.84653C24.8857 10.3766 25.3121 11.0105 25.5995 11.7101C25.887 12.4096 26.0295 13.1602 26.0185 13.9164C26.0075 14.6726 25.8432 15.4188 25.5356 16.1097C25.2279 16.8006 24.7833 17.4219 24.2286 17.936Z"
    />
    <path
        d="M16.0829 25.2237L16.1169 25.187L16.0829 25.2237C16.1311 25.2683 16.1944 25.2932 16.2602 25.2932C16.3259 25.2932 16.3892 25.2683 16.4374 25.2237L16.4034 25.187L16.4374 25.2237L24.2626 17.9727L24.2286 17.936L24.2626 17.9727C24.8222 17.454 25.2708 16.8271 25.5813 16.1301C25.8917 15.433 26.0574 14.6801 26.0685 13.9171C26.0796 13.1542 25.9358 12.3969 25.6458 11.6911C25.3558 10.9853 24.9256 10.3456 24.3812 9.81086C23.8369 9.2761 23.1897 8.85733 22.4789 8.57989C21.768 8.30245 21.0083 8.17215 20.2456 8.19678C19.483 8.22142 18.7332 8.4005 18.0418 8.72325C17.7319 8.86786 17.4367 9.03997 17.1594 9.23707C16.8329 9.46916 16.5313 9.7359 16.2601 10.0332C15.989 9.73587 15.6874 9.4691 15.361 9.23698C15.0836 9.03978 14.7883 8.86758 14.4784 8.72289C13.7869 8.40004 13.0371 8.22082 12.2744 8.19612C11.5117 8.17142 10.7518 8.30178 10.0409 8.57922C9.32998 8.85666 8.68273 9.27543 8.13834 9.81025C7.59395 10.3451 7.16373 10.9848 6.87372 11.6907C6.58371 12.3965 6.43993 13.154 6.45109 13.9171C6.46225 14.6801 6.62812 15.433 6.93865 16.1301C7.24919 16.8272 7.69793 17.454 8.25773 17.9727L16.0829 25.2237ZM9.41327 16.7258L9.41319 16.7257L9.41313 16.7257C9.02201 16.3633 8.7085 15.9254 8.49155 15.4383C8.27459 14.9513 8.15871 14.4253 8.15091 13.8922C8.14311 13.3591 8.24357 12.8299 8.44618 12.3367C8.6488 11.8435 8.94937 11.3966 9.32971 11.0229C9.71002 10.6493 10.1622 10.3567 10.6589 10.1629C11.1557 9.96904 11.6865 9.87798 12.2194 9.89523C12.7522 9.91248 13.2761 10.0377 13.7592 10.2633C14.2423 10.4888 14.6747 10.8101 15.03 11.2075L16.2226 12.5414L16.2599 12.5831L16.2972 12.5414L17.49 11.2077C17.8454 10.8103 18.2777 10.4892 18.7608 10.2637C19.2438 10.0382 19.7676 9.91311 20.3005 9.8959C20.8334 9.87868 21.3642 9.96973 21.8608 10.1635C22.3574 10.3574 22.8096 10.6499 23.1899 11.0236C23.5702 11.3972 23.8707 11.8441 24.0734 12.3372C24.276 12.8303 24.3765 13.3594 24.3687 13.8924C24.361 14.4255 24.2451 14.9515 24.0283 15.4385C23.8114 15.9255 23.4981 16.3633 23.1071 16.7257L23.107 16.7259L23.1069 16.7259L23.1068 16.7261L16.2602 23.0703L9.41333 16.7259L9.41327 16.7258Z"
        fill="#1B1B1B" stroke="black"/>
</svg>

type PropsType = {
    data: ResponseType
}

const Home = ({data}: PropsType) => {
    const rangeValue = data.filters.filter((el: FiltersType) => el.type ==='range')

    const [values, setValues] = useState({
        min: rangeValue[0].min,
        max: rangeValue[0].max,
        brands: [] as Array<string>
    })
    const [products, setProducts] = useState<Array<ProductType>>(data.products)

    useEffect(() => {
        const sendParams = async () => {
            const res = await axios.get(`https://getlens-master.stage.dev.family/api/pages/obektivy?${values.brands.map((brand) => `brands[][]=${brand}`).join('&')}&price[min]=${values.min}&price[max]=${values.max}`)
            setProducts(res.data.products)
        }

        sendParams()
    }, [values])

    const onChangeFilters = (e: ChangeEvent<HTMLInputElement>, type: 'min' | 'max' | 'brands') => {
        if (type === 'brands') {
            setValues(prevState => ({
                ...prevState,
                brands:
                    e.target.checked
                        ? [...prevState.brands, e.target.value]
                        : prevState.brands.filter(brand => brand !== e.target.value)
            }))
        } else {
            setValues(prevState => ({...prevState, [type]: e.target.value}))
        }
    }

    const getFilters = (filter: FiltersType) => {
        if (filter.type === 'range') {
            return (
                <div key={filter.slug} className={styles.filterGroup}>
                    <p className={styles.filterTitle}>{filter.title}</p>
                    <div className={styles.rangeContainer}>
                        <input onChange={(e) => onChangeFilters(e, 'min')} type="number"
                               value={values.min}
                               className={`${styles.startPriceInput} ${styles.priceInput}`}/>
                        <input onChange={(e) => onChangeFilters(e, 'max')} type="number" min={filter.min}
                               max={filter.max}
                               value={values.max}
                               className={`${styles.endPriceInput} ${styles.priceInput}`}/>
                    </div>
                </div>
            )
        }
        if (filter.type === 'multiple') {
            return (
                <div key={filter.slug} className={styles.filterGroup}>
                    <p className={styles.filterTitle}>{filter.title}</p>
                    {filter.items.map((item: FilterItemType) => (
                        <div key={item.title}>
                            <StyledInput onChange={(e) => onChangeFilters(e, 'brands')} id={item.title}
                                         title={item.title} value={item.value}/>
                        </div>
                    ))}
                </div>
            )
        }
        if (filter.type === 'checkbox') {
            return (
                <div>
                    <StyledInput id={filter.slug} title={filter.title} value={filter.slug}/>
                </div>
            )
        }
        return <></>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Объективы</title>
            </Head>

            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.filtersPanel}>
                        <p className={styles.counter}>Товаров {data.meta.total}</p>
                        <h1 className={styles.title}>
                            Объективы
                        </h1>
                        <div className={styles.filterGroup}>
                            {data.filters.map((filter: FiltersType) => getFilters(filter))}
                        </div>
                    </div>
                    <div className={styles.productsPanel}>
                        {products.map((product: any) => (<div key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <Image
                                    src={product.image.desktop.x1}
                                    layout="fill"
                                    objectFit="cover"
                                    loader={myLoader}
                                    className={styles.productImage}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <p className={styles.title}>
                                    {product.title}
                                </p>
                                <p className={styles.price}>
                                    {product.price} ₽
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.outlinedButton}>В корзину</button>
                                    <button className={styles.likeBtn}>
                                        {likeIcon}
                                    </button>
                                </div>

                            </div>
                        </div>))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home


export const getStaticProps: GetStaticProps = async (context) => {
    const data: ResponseType = await axios.get('https://getlens-master.stage.dev.family/api/pages/obektivy').then(res => res.data)
    return {
        props: {
            data
        }
    }
}
