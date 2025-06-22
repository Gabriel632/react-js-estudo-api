import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../../services/api';

import './styles.css';
import logoImage from '../../../assets/logo.svg';

export default function NewBook(){
    const [id, setId] = useState(undefined);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [launchDate, setLaunchDate] = useState('');

    const { bookId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (bookId === undefined)
            return;
        else
            loadBook();
    // eslint-disable-next-line
    }, [bookId]);

    async function loadBook(){
        try {
            const response = await api.get(`/api/Book/v1/${bookId}`, authorization);
            
            let adjustedDate = response.data.launchDate.split("T", 10)[0];

            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setLaunchDate(adjustedDate);
        } catch (error) {
            alert(`Error recovering book information! Error: ${error}`);
            navigate('/books');
        }
    }

    async function saveOrUpdate(e){
        e.preventDefault();

        const data = {
            title,
            author,
            price,
            launchDate
        };        

        try {
            if (bookId === undefined){
                await api.post(`/api/Book/v1`, data, authorization);
            }
            else{
                data.id = id;
                await api.put(`/api/Book/v1`, data, authorization);
            }
            
            navigate('/books');
        } catch (error) {
            alert(`Error while recording book! Error: ${error}`);
        }
    }

    return (
        <div className="new-book-container">
            <div className="content">
                 <section className="form">
                    <img src={logoImage} alt="logoImage" />
                    <h1>{bookId === undefined ? 'Add New Book' : 'Update Book'}</h1>
                    <p>Enter the book information!</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251FC5"></FiArrowLeft>
                        Back to Books
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input placeholder="Author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <input type="date"
                        value={launchDate}
                        onChange={e => setLaunchDate(e.target.value)}
                    />

                    <button className="button" type="submit">{bookId === undefined ? 'Add' : 'Update'}</button>
                </form>
            </div>           
        </div>
    );
}