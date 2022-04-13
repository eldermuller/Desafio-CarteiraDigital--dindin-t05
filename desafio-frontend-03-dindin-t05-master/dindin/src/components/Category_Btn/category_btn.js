import './styles.css'
import categoryBtnSelect from '../../assets/category_add_btn.svg'
import categoryBtnDeselect from '../../assets/category_close_btn.svg'
import { useEffect, useState } from 'react'

export default function CategoryBtn({ category, selectedCategories, setSelectedCategories, noSelection, setNoSelection }) {
    const [localSelectedCategory, setLocalSelectedCategory] = useState(false)
    const localSelectedCategories = [...selectedCategories]

    function handleSelectCategory(id) {
        setNoSelection(false)
        if (localSelectedCategory) {
            const categoryToRemove = localSelectedCategories.findIndex((cat) => {
                return cat === id
            })
            console.log(categoryToRemove);
            localSelectedCategories.splice(categoryToRemove, 1)
            console.log(localSelectedCategories);
        } else {
            localSelectedCategories.push(id)
            console.log(localSelectedCategories);
        }
        setSelectedCategories([...localSelectedCategories])
        setLocalSelectedCategory(!localSelectedCategory)
    }

    useEffect(() => {
        if (noSelection) {
            console.log(`useEffect no category_btn com ${category.descricao}`);
            setLocalSelectedCategory(false)
        }

        return () => {
            console.log(`desmontando ${category.descricao}`);
        }
    })

    return (
        <div>
            <button
                key={category.id}
                className='category-btn'
                onClick={() => handleSelectCategory(category.id)}
                style={localSelectedCategory
                    ? { backgroundColor: 'rgb(121, 120, 217)', color: 'white' }
                    : { backgroundColor: 'rgb(250, 250, 250)', color: 'black' }
                }
            >
                {category.descricao}
                <img
                    src={localSelectedCategory
                        ? categoryBtnDeselect
                        : categoryBtnSelect}
                />
            </button>
        </div >
    )
}