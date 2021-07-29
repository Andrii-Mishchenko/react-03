import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from '../components/SearchForm';
// import newsApi from '../services/news-api';

axios.defaults.headers.common['Authorization'] = 'Bearer 1165fa6bad834f1c94ea989cebfb1d30';

class ArticlesView extends Component {
    state = { 
        articles: [],
        currentPage: 1,
        searchQuery:'',
        isLoading: false,
        error: null,
    };

    componentDidUpdate(prevProps, prevState){
        if(prevState.searchQuery!== this.state.searchQuery){
            this.fetchArticles()
        }
    }

    onChangeQuery = query => {
        this.setState({
            searchQuery: query, 
            currentPage:1, 
            articles:[],
            error: null,
        })   
    }

    fetchArticles = () =>{
        const {currentPage, searchQuery} = this.state

        this.setState({isLoading: true});

        axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=5&page=${currentPage}`)
        .then(response => {
            console.log(response.data.articles);
            this.setState(prevState => ({
                articles: [...prevState.articles, ...response.data.articles],
                currentPage: prevState.currentPage+1,
            }))
        })
        .catch(error=> this.setState({error}))
        .finally(() => this.setState({isLoading:false}));
    }

    render() { 
        const {articles, isLoading, error} = this.state;

        return (
            <div>
                {error && <h1>Что-то пошло не так</h1>}
                <h1>Статьи</h1>

                <SearchForm onSubmit={this.onChangeQuery}/>               

                <ul>
                    {articles.map(({title, url}) => 
                    (<li key={title}>
                        <a href={url}>{title}</a>
                    </li>))}
                </ul>

                {isLoading && <h1>Загружаем...</h1>}
                
                {articles.length > 0 && !isLoading && (
                    <button type="button" onClick = {this.fetchArticles}>Загрузить еще</button>
                )}
            </div>
        )
    }
}
 
export default ArticlesView;

