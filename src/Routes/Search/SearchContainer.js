import { MoviesApi, TVApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: false,
        error: null
    }

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
        }
    };

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const {data: { result: movieResults} } = await MoviesApi.search(searchTerm);
            const {data: { result: tvResults} } = await TVApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            });

        } catch {
            this.setState({ error: "Can't find results "});

        } finally {
            this.setState( { loading: false });
        }
    };

    render() {
        const { movieResults, tvResults, searchTerm, loading, error } = this.state;
        return (
        <SearchPresenter 
            movieResults = {movieResults}
            tvResults = {tvResults}
            searchTerm = {searchTerm}
            loading = {loading}
            error = {error}
            handleSubmit = {this.handleSubmit}
        />
        );
    }
}