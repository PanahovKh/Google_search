import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../features/userSlice'
import axios  from 'axios'
import '../styling/blogs.css'

export default function Blogs() {
    const searchInput = useSelector(selectUserInput) 
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=e26643493c395533ffc1b21e986ab0cf`
    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(true)

useEffect(() =>  {
    axios.get(blog_url).
    then((response) => {
        dispatch(setBlogData(response.data))
        setBlogs(response.data)
        setLoading(false)
    })
    .catch((error) => {
        console.log(error);
    })
},[searchInput])

    // const fetchDrinks = async () => {
    //     try {
    //         const response = await fetch(blog_url)
    //         const data = await response.json()
    //         dispatch(setBlogData(data))
    //         setBlog(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(  () => {
    //     fetchDrinks()
    // }, [searchInput])

    return (
        <div className='blog__page'>
            <h1 className="blog__page__header">Blogs</h1>
            {loading? <h1 className='loading'>Loading...</h1>: ''}
            <div className="blogs">
                {blogs?.articles.map(blog => (
                    <a className="blog" target='_blank' rel="noreferrer" href={blog.url} >
                        <img src={blog.image} alt={blog.source.name}/>
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}
                {blogs?.totalArticles === 0 && (
                    <h1 className="no__blogs">
                        No blogs available 😞. Search something else to read blogs on the
                        greatest platform.
                    </h1>
                )}
            </div>
        </div>
    )
}
